const keypad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ['help'],
].map(nums => ({
  text: '',
  callback_id: 'keypad',
  actions: nums.map(num => ({
    name: num,
    text: num,
    type: 'button',
    value: num,
    style: num === 'help' ? 'danger' : null,
  })),
}));

/* eslint-disable indent, implicit-arrow-linebreak */
const getHelpMsg = (botname = '<botname>') =>
`Start a new game by typing \`@${botname} play guess-the-combo\`.
See the ranking by typing \`@${botname} show guess-the-combo rankings\`.

The objective of \`guess-the-combo\` (as you might have guessed) is to guess the correct combination.
Combinations are random three-digit numbers. Each digit is unique in the combination.

✅ indicates how many correct digits you guessed that are in the _right_ position.
⚠️ indicates how many correct digits you guessed that are in the _wrong_ position.

For example, if the solution is 821 you'll receive feedback for guessing like so:
123 ✅: 1 ⚠️: 1
456 ✅: 0 ⚠️: 0
182 ✅: 0 ⚠️: 3
821 ✅: 3 ⚠️: 0`; /* eslint-enable */

const alreadySolvedMsg = 'You already solved this one. :sunglasses:';

const triplePartyPopper = ':tada:'.repeat(3);
const congratulatoryMsg = `${triplePartyPopper} Nice job. You guessed the right combo! ${triplePartyPopper}`;

export {
  keypad,
  getHelpMsg,
  alreadySolvedMsg,
  congratulatoryMsg,
};
