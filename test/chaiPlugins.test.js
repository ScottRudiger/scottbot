import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
chai.use(({Assertion}, {flag, objDisplay}) => {
  Assertion.addMethod('matchEql', function fn(expectedMatch) {
    const subject = flag(this, 'object');
    const stub = sinon.stub();
    stub(subject);
    const type = Array.isArray(expectedMatch) ? [] : {};
    const entries = Object.entries(expectedMatch);
    try {
      sinon.assert.calledWithMatch(
        stub,
        Object.assign(type, expectedMatch, entries.reduce((obj, [key, val]) => ({
          ...obj,
          [key]: sinon.match(val),
        }), {})),
      );
    } catch (error) {
      error.name = 'MatchAssertionError';
      error.message = `expected ${objDisplay(subject)} to match ${objDisplay(expectedMatch)}`;
      throw error;
    }
  });
});
