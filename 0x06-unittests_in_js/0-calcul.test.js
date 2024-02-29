const assert = require('assert');
const calculateNumber = require('./0-calcul');

describe('calculateNumber', () => {
  it('for a', () => {
    assert.equal(calculateNumber(1.2, 2), 3);
    assert.equal(calculateNumber(1.5, 2), 4);
    assert.equal(calculateNumber(1.7, 2), 4);
    assert.equal(calculateNumber(1, 2), 3);
  });
  it('for b', () => {
    assert.equal(calculateNumber(1, 2.2), 3);
    assert.equal(calculateNumber(1, 2.5), 4);
    assert.equal(calculateNumber(1, 2.7), 4);
    assert.equal(calculateNumber(1, 2), 3);
  });
});
