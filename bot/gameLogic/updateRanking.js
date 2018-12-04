import {keypad} from './interactiveComponents';

const updateOverallRanking = ({data, username, currentGame}) => {
  let overallRank = data.overallRanking[username];
  if (!overallRank)
    overallRank = data.overallRanking[username] = {totalGuesses: 0, totalGames: 0};
  overallRank.totalGames++;
  overallRank.totalGuesses += currentGame.guesses;
};

const updateRanking = ({
  data,
  username,
  currentGame,
  timestamp,
  post,
  channel,
  handleSlackErr,
}) => {
  updateOverallRanking({data, username, currentGame});
  const currGameRanking = data.games[timestamp].ranking;
  currGameRanking.push({username, guesses: currentGame.guesses});
  currGameRanking.sort((a, b) => a.guesses - b.guesses);
  return post({
    uri: 'chat.update',
    body: {
      channel,
      ts: timestamp,
      link_names: 1,
      text: currGameRanking.map(
        ({username, guesses}, i) => `${
          ['🥇', '🥈', '🥉'][i] || `\u00A0\u2009${i + 1}. ` // unicode whitespace to align
        } @${username} (${guesses} ${guesses === 1 ? 'guess' : 'guesses'})`,
      ).join`\n`,
      attachments: keypad,
    },
  }).catch(handleSlackErr);
};

export default updateRanking;
