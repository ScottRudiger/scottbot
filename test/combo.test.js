import {expect} from 'chai';

import {getRandomCombo, tryCombo} from '../bot/gameLogic/combo';

describe('getRandomCombo function', () => {
  it('should return a string', () => {
    expect(getRandomCombo()).to.be.a.string;
  });
  it('should return a combo with a length of 3', () => {
    expect(getRandomCombo()).to.have.a.lengthOf(3);
  });
  context('should return combos that', () => {
    const combos = Array.from({length: 10}, () => getRandomCombo());
    it('only include digits 1-9', () => {
      expect(combos.every(combo => /^[1-9]{3}$/.test(combo))).to.be.true;
    });
    it('do not repeat any digits', () => {
      const hasUniqueDigits = combo => new Set(combo).size === 3;
      expect(combos.every(hasUniqueDigits)).to.be.true;
    });
  });
});

describe('tryCombo function', () => {
  const solution = '812';
  it('should return an object', () => {
    expect(tryCombo('123', solution)).to.be.an('object');
  });
  it('should return appropriate feedback', () => {
    const tests = [
      ['456', {'✅': 0, '⚠️': 0}],
      ['156', {'✅': 0, '⚠️': 1}],
      ['123', {'✅': 0, '⚠️': 2}],
      ['281', {'✅': 0, '⚠️': 3}],
      ['415', {'✅': 1, '⚠️': 0}],
      ['216', {'✅': 1, '⚠️': 1}],
      ['821', {'✅': 1, '⚠️': 2}],
      ['912', {'✅': 2, '⚠️': 0}],
      ['812', {'✅': 3, '⚠️': 0}],
    ];

    tests.forEach(([guess, feedback]) => {
      expect(tryCombo(guess, solution)).to.eql(feedback);
    });
  });
  it('should ignore trailing digits (only the first 3 should count)', () => {
    expect(tryCombo('456821', solution)).to.eql({'✅': 0, '⚠️': 0});
    expect(tryCombo('812812', solution)).to.eql({'✅': 3, '⚠️': 0});
  });
});
