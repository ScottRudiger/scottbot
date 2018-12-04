/**
 * picks a random 3-digit (1..9) combination without duplicate numbers; e.g., '819' but not '662'
 *
 * @returns {String} random combo for users to guess
 */
const getRandomCombo = () => {
  const nums = Array.from({length: 9}, (_, i) => i + 1); // [1..9]
  const pluckRandomNum = () => nums.splice(~~(Math.random() * nums.length), 1)[0];
  return Array.from({length: 3}, pluckRandomNum).join``;
};

/**
 * compares user's guess with a game's combo/solution
 *
 * @param {String} guess user's 3-digit guess
 * @param {String} combo the correct 3-digit combination
 * @returns {{'✅': Number, '⚠️': Number}} feedback object showing # of correct digits
 * @property {Number} ✅ # of correct digits in the correct place
 * @property {Number} ⚠️ # of correct digits in the wrong place
 */
const tryCombo = (guess, combo) => [...combo].reduce((feedback, digit, i) => {
  if (digit === guess[i])
    feedback['✅']++;
  else if (combo.includes(guess[i]))
    feedback['⚠️']++;
  return feedback;
}, {'✅': 0, '⚠️': 0});

export {getRandomCombo, tryCombo};
