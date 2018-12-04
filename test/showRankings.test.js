import {expect} from 'chai';
import {stub, restore, match} from 'sinon';
import request from '../bot/node_modules/request-promise-native';

import {noRankingMsg} from '../bot/gameLogic/handlers/showRankings';
import {sendFakeAppMention, sendFakeGame} from './mocks/slack';
import * as combo from '../bot/gameLogic/combo';
import {
  solution,
  createPlayer,
  guess4x,
  guess3x,
  guess2x,
  guess1x,
} from './testHelpers';

describe('showRankings', () => {
  let postStub;
  beforeEach(() => {
    postStub = stub(request, 'post').resolves();
    stub(combo, 'getRandomCombo').returns(solution.join``);
    sendFakeGame('testbot');
    sendFakeAppMention('show guess-the-combo rankings');
  });
  afterEach(() => { restore(); });

  it('should POST to "chat.postMessage" w/ channel & should link names', () => {
    expect(postStub).to.have.been.calledWithMatch({
      uri: 'chat.postMessage',
      body: {
        channel: match.string,
        link_names: 1,
        parse: 'full',
      },
    });
  });

  it('should show placeholder text before any games have been completed', () => {
    expect(postStub).to.have.been.calledWithMatch({
      body: {text: noRankingMsg},
    });
  });

  it('should send the sorted rankings as an attachment', async () => {
    const [player1, player2, player3, player4] = [1, 2, 3, 4].map(createPlayer);
    await guess4x(player4);
    await guess3x(player3);
    await guess2x(player2);
    await guess1x(player1);
    await sendFakeAppMention('show guess-the-combo rankings');
    expect(postStub.lastCall.args[0].body.attachments[0].fields).to.matchEql([
      {title: 'Name'},
      {title: 'Average Guesses'},
      {value: /@player1/},
      {value: /1\.00/},
      {value: /@player2/},
      {value: /2\.00/},
      {value: /@player3/},
      {value: /3\.00/},
      {value: /@player4/},
      {value: /4\.00/},
    ].map(field => ({...field, value: match(field.value)})));
  });
});
