import {expect} from 'chai';
import {stub, restore, match} from 'sinon';
import request from '../bot/node_modules/request-promise-native';

import {sendFakeSlackMsg} from './mocks/slack';

describe('auto-reaction feature', () => {
  let postStub;
  beforeEach(() => { postStub = stub(request, 'post'); });
  afterEach(() => { restore(); });

  context('messages containing a word that is also a reaction', () => {
    it('should trigger a POST request to "reactions.add"', async () => {
      await sendFakeSlackMsg('nice sunglasses');
      expect(postStub).to.have.been.calledWithMatch({
        baseUrl: 'https://slack.com/api/',
        uri: 'reactions.add',
        headers: {
          Authorization: match(/^Bearer\sxoxb-.+/),
        },
      });
    });

    it('and include a body with channel, name, and timestamp', async () => {
      await sendFakeSlackMsg('nice sunglasses');
      expect(postStub).to.have.been.calledWithMatch({
        body: {
          channel: match.string,
          name: 'sunglasses',
          timestamp: match(/^\d+\.\d+$/),
        },
      });
    });

    it('and be case-insensitive', async () => {
      await sendFakeSlackMsg('Pinky and the Brain');
      expect(postStub).to.have.been.calledWithMatch({
        body: {name: 'brain'},
      });
    });

    it('and handle reactions with an underscore', async () => {
      await sendFakeSlackMsg('I was rolling_on_the_floor_laughing');
      expect(postStub).to.have.been.calledWithMatch({
        body: {name: 'rolling_on_the_floor_laughing'},
      });
    });

    it('and add a reaction for any emojis that are also a reaction', async () => {
      await sendFakeSlackMsg('I :blue_heart: JS');
      expect(postStub).to.have.been.calledWithMatch({
        body: {name: 'blue_heart'},
      });
    });

    it('and add multiple reactions from one message', async () => {
      await sendFakeSlackMsg('I\'m typing this on an Apple computer');
      expect(postStub)
        .to.have.been.calledWithMatch({body: {name: 'on'}})
        .and.to.have.been.calledWithMatch({body: {name: 'apple'}})
        .and.to.have.been.calledWithMatch({body: {name: 'computer'}});
    });
    it('and handle punctuation', async () => {
      await sendFakeSlackMsg(
        'At first I was confused, but then I figured it out and relaxed.',
      );
      expect(postStub)
        .to.have.been.calledWithMatch({body: {name: 'confused'}})
        .and.have.been.calledWithMatch({body: {name: 'relaxed'}});
    });
  });
});
