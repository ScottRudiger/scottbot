import AsyncAF from 'async-af';

import {sendFakeClickAsUser} from './mocks/slack/sendFakeClick';

const solution = [8, 1, 2];

const guessWrong = player => AsyncAF([1, 2, 3]).io.forEach(num => (
  sendFakeClickAsUser(num, player)
));

const guessRight = (player = 'scottrudiger') => AsyncAF(solution).io.forEach(num => (
  sendFakeClickAsUser(num, player)
));

const createPlayer = rank => ({user: `UXXXXXXX${rank}`, name: `player${rank}`});

const extractLines = call => call.args[0].body.text.split`\n`;

const [guess1x, guess2x, guess3x, guess4x] = Array(4).fill().map((_, n) => async player => {
  // an in-order async forEach
  await AsyncAF(Array.from({length: n})).io.forEach(() => guessWrong(player));
  return guessRight(player);
});

export {
  solution,
  guessWrong,
  guessRight,
  createPlayer,
  extractLines,
  guess1x,
  guess2x,
  guess3x,
  guess4x,
};
