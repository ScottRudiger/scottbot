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

const hideHelpBtn = [{
  text: '',
  color: '#3AA3E3',
  callback_id: 'hide_help',
  actions: [{
    text: 'Hide This',
    id: 1,
    value: 'hide_help',
    name: 'hide_help',
    type: 'button',
    style: 'danger',
  }],
}];

const getHelpMsg = (botname = '<botname>') => [ // eslint-disable-next-line indent
`Start a new game by typing \`@${botname} play guess-the-combo\`.
See the rankings by typing \`@${botname} show guess-the-combo rankings\`.

The objective of \`guess-the-combo\` (as you might have guessed) is to guess the correct combination.
Combinations are random three-digit numbers. Each digit is unique in the combination.

✅ indicates how many correct digits you guessed that are in the _right_ position.
⚠️ indicates how many correct digits you guessed that are in the _wrong_ position.

For example, if the solution is 821 you'll receive feedback for guessing like so:
123 ✅: 1 ⚠️: 1
456 ✅: 0 ⚠️: 0
182 ✅: 0 ⚠️: 3
821 ✅: 3 ⚠️: 0`,
  hideHelpBtn,
];

const getNewGameBtn = (text = '') => [{
  text,
  color: '#3AA3E3',
  callback_id: 'play_again',
  actions: [{
    text: 'Start a new game?',
    id: 1,
    value: 'play_again',
    name: 'play_again',
    type: 'button',
    style: 'primary',
  }],
}];

const getAlreadySolvedMsg = botname => [
  'You already solved this one. :sunglasses:',
  getNewGameBtn(
    `Start a new game by typing \`@${botname} play guess-the-combo\`or click below.`,
  ),
];

const triplePartyPopper = ':tada:'.repeat(3);
const congratulatoryMsg = [
  `${triplePartyPopper} Nice job. You guessed the right combo! ${triplePartyPopper}`,
  getNewGameBtn(),
];

export {
  keypad,
  getHelpMsg,
  getAlreadySolvedMsg,
  congratulatoryMsg,
};
