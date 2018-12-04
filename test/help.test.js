import {expect} from 'chai';
import {stub, restore, match} from 'sinon';
import request from '../bot/node_modules/request-promise-native';

import {getHelpMsg} from '../bot/gameLogic/interactiveComponents';
import * as helpers from '../bot/helpers';
import {
  sendFakeAppMention,
  sendFakeClick,
  sendFakeGame,
  sendFakeHideHelp,
} from './mocks/slack';

describe('help message', () => {
  let postStub;
  let postEphemeralStub;
  beforeEach(() => {
    postStub = stub(request, 'post').resolves();
    postEphemeralStub = stub().resolves();
    stub(helpers, 'postToEphemeralUri').returns(postEphemeralStub);
  });
  afterEach(() => { restore(); });

  it('should be sent when a mention contains "help" e.g., "@<botname> help"', async () => {
    await sendFakeAppMention('help');
    // placeholder "<botname>" before a game is started:
    expect(postEphemeralStub).to.have.been.calledWith(...getHelpMsg('<botname>'));
    // actual botname after a game is started:
    await sendFakeGame('testbot');
    await sendFakeAppMention('help');
    expect(postEphemeralStub).to.have.been.calledWith(...getHelpMsg('testbot'));
  });

  it('should be sent when user clicks "help" on the keypad', async () => {
    await sendFakeGame('testbot');
    await sendFakeClick('help');
    expect(postEphemeralStub).to.have.been.calledWith(...getHelpMsg('testbot'));
  });

  it('should be deleted when user clicks "Hide This" button', async () => {
    await sendFakeAppMention('help');
    await sendFakeHideHelp();
    expect(postStub).to.have.been.calledWithMatch({
      url: match.string,
      body: {delete_original: true},
    });
  });
});
