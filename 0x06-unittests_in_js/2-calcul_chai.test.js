const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai');

describe('#calculateNumber() with type SUM', () => {
  it('add 7 and 10', () => {
    expect(calculateNumber('SUM', 7, 10)).to.equal(17);
  });
  it('add 2 and 3.7', () => {
    expect(calculateNumber('SUM', 2, 3.7)).to.equal(6);
  });
  it('add 2.0 and 4.0', () => {
    expect(calculateNumber('SUM', 2.0, 4.0)).to.equal(6);
  });
});

describe('#calculateNumber() with type SUBTRACT', () => {
  it('subtract 2 and 3', () => {
    expect(calculateNumber('SUBTRACT', 2, 3)).to.equal(-1);
  });
  it('subtract 2.4 and 4.5', () => {
    expect(calculateNumber('SUBTRACT', 2.4, 4.5)).to.equal(-3);
  });
  it('subtract 0.9 and -0.4', () => {
    expect(calculateNumber('SUBTRACT', 0.9, -0.4)).to.equal(1);
  });
});

describe('#calculateNumber() with type DIVIDE', () => {
  it('divide 2 and 4', () => {
    expect(calculateNumber('DIVIDE', 2, 4)).to.equal(0.5);
  });
  it('divide 1.1 and 0.1', () => {
    expect(calculateNumber('DIVIDE', 1.1, 0.1)).to.equal('Error');
  });
  it('divide -0.7 and 0.7', () => {
    expect(calculateNumber('DIVIDE', -0.7, 0.7)).to.equal(-1);
  });
});
