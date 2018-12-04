import {keypad} from './interactiveComponents';

const updateOverallRankings = ({data, username, currentGame}) => {
  let overallRank = data.overallRankings[username];
  if (!overallRank)
    overallRank = data.overallRankings[username] = {totalGuesses: 0, totalGames: 0};
  overallRank.totalGames++;
  overallRank.totalGuesses += currentGame.guesses;
};

const updateRankings = ({
  data,
  username,
  currentGame,
  timestamp,
  post,
  channel,
  handleSlackErr,
}) => {
  updateOverallRankings({data, username, currentGame});
  const currGameRankings = data.games[timestamp].rankings;
  currGameRankings.push({username, guesses: currentGame.guesses});
  currGameRankings.sort((a, b) => a.guesses - b.guesses);
  return post({
    uri: 'chat.update',
    body: {
      channel,
      ts: timestamp,
      link_names: 1,
      text: currGameRankings.map(
        ({username, guesses}, i) => `${
          ['🥇', '🥈', '🥉'][i] || `\u00A0\u2009${i + 1}. ` // unicode whitespace to align
        } @${username} (${guesses} ${guesses === 1 ? 'guess' : 'guesses'})`,
      ).join`\n`,
      attachments: keypad,
    },
  }).catch(handleSlackErr);
};

export default updateRankings;
