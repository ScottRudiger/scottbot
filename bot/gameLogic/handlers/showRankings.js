import flat from 'array.prototype.flat';

flat.shim();

/*
 * sends a msg showing the game's overall rankings; e.g.:
 *
 * Name                     Average Guesses
 * 🥇 @Tommy                 3.9
 * 🥈 @Lil                   4.5
 * 🥉 @Phil                  5.2
 * 4. @Chucky                5.3 // these will be aligned in Slack w/ unicode whitespace
 * 5. @Angelica              6.0
 */

const calcAvg = ([name, {totalGuesses, totalGames}]) => [
  name, (totalGuesses / totalGames).toFixed(2),
];

const /* sort */byAvg = ([, aAvgGuesses], [, bAvgGuesses]) => aAvgGuesses - bAvgGuesses;

const formatRank = ([name, avgGuesses], i) => [
  `${['🥇', '🥈', '🥉'][i] || `\u00A0\u2009${i + 1}. `} @${name}`,
  `\u00A0\u2009${avgGuesses}`,
];

const noRankingMsg = '💩 There\'s no ranking yet! Finish a game first and check again. 😎';

const handleShowRankings = dependencies => () => {
  const {
    storage,
    post,
    channel,
    handleStorageErr,
    handleSlackErr,
  } = dependencies;
  storage.get((err, {overallRankings = null} = {}) => {
    if (err) return handleStorageErr(err, handleShowRankings(dependencies));
    const rankings = !overallRankings ? [] : Object.entries(overallRankings)
      .map(calcAvg)
      .sort(byAvg)
      .map(formatRank)
      .flat()
      .map(value => ({value, short: true}));
    post({
      uri: 'chat.postMessage',
      body: {
        text: !rankings.length ? noRankingMsg : null,
        channel,
        link_names: 1,
        parse: 'full',
        attachments: !rankings.length ? null : [{
          fields: [
            {title: 'Name', short: true},
            {title: 'Average Guesses', short: true},
            ...rankings,
          ],
        }],
      },
    }).catch(handleSlackErr);
  });
};

export default handleShowRankings;
export {noRankingMsg};
