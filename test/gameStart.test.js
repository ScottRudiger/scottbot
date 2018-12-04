import {expect} from 'chai';

import {fakeContext} from './mocks/webtaskMocks';
import sendFakeGame, {timestamp} from './mocks/slack/sendFakeGame';

const {storage: fakeStorage} = fakeContext;

/* to summarize, after a game is started for the first time, storage data should look like:
{
  botname: 'testbot',
  games: {
    [timestamp]: {
      solution: '812',
      ranking: [],
    }
  },
  overallRanking: {},
}
*/

describe('after a game is started for the first time', () => {
  let data;
  before(() => {
    sendFakeGame('testbot');
    data = fakeStorage.get((_, data) => data);
  });
  after(() => { fakeStorage.set(undefined); });

  it('storage should be initialized to hold game data', () => {
    expect(data.games).to.be.an('object');
    expect(data.games[timestamp]).to.be.an('object');
  });

  it('the solution to the current game should be saved', () => {
    expect(data.games[timestamp].solution).to.match(/^[1-9]{3}$/);
  });

  it('the botname should be saved for future use', () => {
    expect(data.botname).to.equal('testbot');
  });

  it('overall rankings should be initialized', () => {
    expect(data.overallRanking).to.eql({});
  });

  it('current game ranking should be initialized', () => {
    expect(data.games[timestamp].ranking).to.eql([]);
  });
});
