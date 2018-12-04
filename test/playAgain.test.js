import {expect} from 'chai';
import {stub, restore, match} from 'sinon';
import request from '../bot/node_modules/request-promise-native';

import {solution, guessRight} from './testHelpers';
import {
  sendFakePlayAgain,
  sendFakeAppMention,
} from './mocks/slack';
import * as combo from '../bot/gameLogic/combo';

describe('clicking "Start a New Game?" button', () => {
  let getStub;
  let postStub;
  const fakeProfilePic = 'fakeProfilePic.jpeg';
  beforeEach(async () => {
    getStub = stub(request, 'get').resolves(JSON.stringify({
      user: {profile: {image_24: fakeProfilePic}},
    }));
    postStub = stub(request, 'post').resolves();
    stub(combo, 'getRandomCombo').returns(solution.join``);
    await sendFakeAppMention('play guess-the-combo'); // start a game
    await guessRight(); // solve it
    await sendFakePlayAgain(); // click "Start a New Game?" button
  });
  afterEach(() => { restore(); });

  it('should send a GET request to retrieve the user\'s profile pic', () => {
    expect(getStub).to.have.been.calledWithMatch({
      method: 'GET',
      uri: match(/^https:\/\/slack\.com\/api\/users\.info\?user=\w+$/),
    });
  });

  it('should send a POST request to chat.postMessage', () => {
    expect(postStub).to.have.been.calledWithMatch({
      uri: 'chat.postMessage',
    });
  });

  it('POST request should have an appropriate body to fake starting a game as user', () => {
    expect(postStub).to.have.been.calledWithMatch({
      body: {
        channel: match.string,
        text: match(/^@\w+ play guess-the-combo$/),
        link_names: 1,
        username: match.string,
        icon_url: fakeProfilePic,
      },
    });
  });
});
