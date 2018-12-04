import {expect} from 'chai';
import {stub, restore, match} from 'sinon';
import request from '../bot/node_modules/request-promise-native';

import {sendFakeSlackMsg} from './mocks/slack';

describe(':pineapple: reaction feature', () => {
  let postStub;
  beforeEach(() => { postStub = stub(request, 'post'); });
  afterEach(() => { restore(); });

  context('messages containing "pineapple"', () => {
    it('should trigger a POST request to "reactions.add"', async () => {
      await sendFakeSlackMsg('asdfpineapplejkl;');
      expect(postStub).to.have.been.calledWith(match({
        baseUrl: 'https://slack.com/api/',
        uri: 'reactions.add',
        headers: {
          Authorization: match(/^Bearer\sxoxb-.+/),
        },
      }));
    });

    it('should include a body with channel, name, and timestamp', async () => {
      await sendFakeSlackMsg('asdfpineapplejkl;');
      expect(postStub).to.have.been.calledWith(match({
        body: {
          channel: match.string,
          name: 'pineapple',
          timestamp: match(/^\d+\.\d+$/),
        },
      }));
    });
  });

  const pineappleReaction = match({
    body: {
      name: 'pineapple',
    },
  });

  context('messages containing "Pineapple" (case-insensitive)', () => {
    it('should also add a :pineapple: reaction', async () => {
      await sendFakeSlackMsg('Pineapples are delicious');
      expect(postStub).to.have.been.calledWith(pineappleReaction);
    });
  });

  context('messages containing ":pineapple:"', () => {
    it('should also add a :pineapple: reaction', async () => {
      await sendFakeSlackMsg(':pineapple:');
      expect(postStub).to.have.been.calledWith(pineappleReaction);
    });
  });

  context('messages containing "🍍"', () => {
    it('should also add a :pineapple: reaction', async () => {
      await sendFakeSlackMsg('🍍');
      expect(postStub).to.have.been.calledWith(pineappleReaction);
    });
  });
});
