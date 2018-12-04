import {expect} from 'chai';
import {stub, restore, match} from 'sinon';
import AsyncAF from 'async-af';
import request from '../bot/node_modules/request-promise-native/lib/rp';

import * as combo from '../bot/gameLogic/combo';
import * as helpers from '../bot/helpers';
import {sendFakeGame} from './mocks/slack';
import sendFakeClick, {username} from './mocks/slack/sendFakeClick';
import {
  congratulatoryMsg,
  getAlreadySolvedMsg,
  keypad,
} from '../bot/gameLogic/interactiveComponents';

import {
  solution,
  guessRight,
  createPlayer,
  extractLines,
  guess1x,
  guess2x,
  guess3x,
  guess4x,
} from './testHelpers';

import {fakeContext} from './mocks/webtaskMocks';

const {storage: fakeStorage} = fakeContext;

// tests game from the perspective of POSTs to slack; see gameStorage.test.js for more

describe('during a single game', () => {
  let postStub;
  let postEphemeralStub;
  beforeEach(() => {
    postStub = stub(request, 'post').resolves();
    postEphemeralStub = stub().resolves();
    stub(helpers, 'postToEphemeralUri').returns(postEphemeralStub);
    stub(combo, 'getRandomCombo').returns(solution.join``);
    sendFakeGame('testbot');
  });
  afterEach(() => {
    restore();
    fakeStorage.set(undefined);
  });

  it('after guessing, feedback should be sent', async () => {
    await AsyncAF([1, 2, 3]).io.forEach(sendFakeClick);
    // vague in case format of feedback msg changes
    expect(postEphemeralStub).to.have.been.calledWithMatch(/^123/);
  });

  it('upon solving, a congratulatory message s/b sent AFTER feedback', async () => {
    await guessRight();
    expect(postEphemeralStub.firstCall.args[0]).to.match(RegExp(solution.join``));
    expect(postEphemeralStub.secondCall.args).to.eql(congratulatoryMsg);
  });

  it('if user clicks keypad, but already solved that game, a msg s/b sent letting them know', async () => {
    await guessRight();
    await sendFakeClick(6);
    expect(postEphemeralStub).to.have.been.calledWith(...getAlreadySolvedMsg('testbot'));
  });

  it('once solved, the original msg s/b updated to show user on game rankings', async () => {
    await guessRight();
    expect(postStub).to.have.been.calledWithMatch({
      uri: 'chat.update',
      body: {
        // vague in case format of rankings changes
        text: match(RegExp(`${username}.+1`)),
      },
    });
  });

  it('when updating original msg, keypad should still be included', async () => {
    await guessRight();
    expect(postStub).to.have.been.calledWithMatch({
      body: {attachments: keypad},
    });
  });

  it('game ranking s/b sorted by # of guesses when multiple players solve', async () => {
    const [player1, player2, player3, player4] = [1, 2, 3, 4].map(createPlayer);
    postStub.resetHistory();

    await guess4x(player4);
    expect(extractLines(postStub.firstCall)).to.matchEql([
      /player4.+4/,
    ]);

    await guess3x(player3);
    expect(extractLines(postStub.secondCall)).to.matchEql([
      /player3.+3/,
      /player4.+4/,
    ]);

    await guess2x(player2);
    expect(extractLines(postStub.thirdCall)).to.matchEql([
      /player2.+2/,
      /player3.+3/,
      /player4.+4/,
    ]);

    await guess1x(player1);
    expect(extractLines(postStub.lastCall)).to.matchEql([
      /player1.+1/,
      /player2.+2/,
      /player3.+3/,
      /player4.+4/,
    ]);
  });
});
