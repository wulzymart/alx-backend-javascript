const assert = require('assert');
const calculateNumber = require('./1-calcul');

describe('#calculateNumber() with type SUM', () => {
  it('add 7 and 10', () => {
    assert.equal(calculateNumber('SUM', 7, 10), 17);
  });
  it('add 2 and 3.7', () => {
    assert.equal(calculateNumber('SUM', 2, 3.7), 6);
  });
  it('add 2.0 and 4.0', () => {
    assert.equal(calculateNumber('SUM', 2.0, 4.0), 6);
  });
});

describe('#calculateNumber() with type SUBTRACT', () => {
  it('subtract 2 and 3', () => {
    assert.equal(calculateNumber('SUBTRACT', 2, 3), -1);
  });
  it('subtract 2.4 and 4.5', () => {
    assert.equal(calculateNumber('SUBTRACT', 2.4, 4.5), -3);
  });
  it('subtract 0.9 and -0.4', () => {
    assert.equal(calculateNumber('SUBTRACT', 0.9, -0.4), 1);
  });
});

describe('#calculateNumber() with type DIVIDE', () => {
  it('divide 2 and 4', () => {
    assert.equal(calculateNumber('DIVIDE', 2, 4), 0.5);
  });
  it('divide 1.1 and 0.1', () => {
    assert.equal(calculateNumber('DIVIDE', 1.1, 0.1), 'Error');
  });
  it('divide -0.7 and 0.7', () => {
    assert.equal(calculateNumber('DIVIDE', -0.7, 0.7), -1);
  });
});
