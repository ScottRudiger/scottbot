import {expect} from 'chai';
import {stub, restore} from 'sinon';
import AsyncAF from 'async-af';

import {fakeContext} from './mocks/webtaskMocks';
import {
  solution,
  guessRight,
  guessWrong,
} from './testHelpers';
import sendFakeGame, {timestamp} from './mocks/slack/sendFakeGame';
import sendFakeClick, {username} from './mocks/slack/sendFakeClick';
import * as combo from '../bot/gameLogic/combo';
import * as helpers from '../bot/helpers';

const {storage: fakeStorage} = fakeContext;

// tests game from the perspective of webtask storage; see gameSlack.test.js for more

describe('during a single game', () => {
  let fakeData;
  let currentGame;
  beforeEach(() => {
    stub(combo, 'getRandomCombo').returns(solution.join``);
    stub(helpers, 'postToEphemeralUri').returns(stub().resolves());
    sendFakeGame('testbot');
    fakeStorage.get((_, data) => {
      fakeData = data;
      currentGame = data.games[timestamp];
    });
  });
  afterEach(() => {
    restore();
    fakeStorage.set(undefined);
  });

  it('1st keypad click from a user should initialize that user\'s game record', async () => {
    await sendFakeClick(1);
    expect(currentGame[username]).to.eql({
      guess: '1',
      guesses: 0,
      solved: false,
    });
  });

  it('when a guess is complete, recorded "guess" s/b reset to prepare for the next guess', async () => {
    await AsyncAF([1, 2, 3]).io.forEach(sendFakeClick);
    expect(currentGame[username].guess).to.equal('');
  });

  it('subsequent clicks on the same num should not be registered in a guess', async () => {
    await AsyncAF([1, 1, 2, 2, 2]).io.forEach(sendFakeClick);
    expect(currentGame[username].guess).to.equal('12');
    await sendFakeClick(3); // just to complete previous guess
    await AsyncAF([4, 5, 4, 5, 4, 5, 4, 5]).io.forEach(sendFakeClick);
    expect(currentGame[username].guess).to.equal('45');
  });

  it('each guess should increment user\'s "guesses" count in the current game', async () => {
    await AsyncAF([1, 2, 3]).io.forEach(async n => {
      await guessWrong();
      expect(currentGame[username].guesses).to.equal(n);
    });
    await guessRight();
    expect(currentGame[username].guesses).to.equal(4);
  });

  it('when user guesses the correct combination, "solved" s/b set to true', async () => {
    await guessWrong();
    expect(currentGame[username].solved).to.be.false;
    await guessRight();
    expect(currentGame[username].solved).to.be.true;
  });

  it('after solving, user should be added to the current game\'s rankings', async () => {
    await guessRight();
    expect(currentGame.ranking[0]).to.eql({username, guesses: 1});
  });

  it('after solving, user should be added to the overall rankings', async () => {
    await guessRight();
    expect(fakeData.overallRanking[username]).to.eql({
      totalGuesses: 1,
      totalGames: 1,
    });
  });

  it('if user has already solved a game, subsequent clicks should not count', async () => {
    await guessRight();
    expect(currentGame[username]).to.eql({guess: '', guesses: 1, solved: true});
    await sendFakeClick(1);
    expect(currentGame[username]).to.still.eql({guess: '', guesses: 1, solved: true});
    await AsyncAF([2, 3]).io.forEach(sendFakeClick);
    expect(currentGame[username]).to.still.eql({guess: '', guesses: 1, solved: true});
  });
});
