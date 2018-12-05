import {expect} from 'chai';
import {stub, restore, match} from 'sinon';
import AsyncAF from 'async-af';
import request from '../bot/node_modules/request-promise-native';

import {sendFakeAppMention} from './mocks/slack';
import {keypad} from '../bot/gameLogic/interactiveComponents';

describe('when user starts a game', () => {
  let postStub;
  before(() => {
    postStub = stub(request, 'post').resolves();
    sendFakeAppMention('play guess-the-combo');
  });
  after(() => { restore(); });

  it('app should send a POST request to "chat.postMessage" uri', () => {
    expect(postStub).to.have.been.calledWithMatch({
      uri: 'chat.postMessage',
    });
  });

  it('and include channel, text, and callback_id', () => {
    expect(postStub).to.have.been.calledWithMatch({
      body: ['channel', 'text', 'callback_id'].reduce((body, key) => ({
        ...body, [key]: match.string,
      }), {}),
    });
  });

  it('and include a keypad in the attachments', () => {
    expect(postStub).to.have.been.calledWithMatch({
      body: {attachments: keypad},
    });
  });

  it('s/b triggered by shorter commands when user forgets the exact wording', async () => {
    await AsyncAF(['play game', 'play', 'play a game please!']).io.forEach(async cmd => {
      postStub.resetHistory();
      await sendFakeAppMention(cmd);
      expect(postStub).to.have.been.calledWithMatch({uri: 'chat.postMessage'});
    });
  });
});
