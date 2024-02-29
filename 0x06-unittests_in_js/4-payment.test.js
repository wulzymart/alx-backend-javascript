const sinon = require('sinon');
const { expect } = require('chai');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', () => {
  it('sendPaymentRequestToApi uses the calculateNumber method of Utils', () => {
    const logger = sinon.spy(console);
    const stubedCalculate = sinon.stub(Utils, 'calculateNumber');

    stubedCalculate.returns(10);
    sendPaymentRequestToApi(100, 20);
    expect(stubedCalculate.calledWith('SUM', 100, 20)).to.equal(true);
    expect(stubedCalculate.callCount).to.be.equal(1);
    expect(logger.log.calledWith('The total is: 10')).to.be.true;
    expect(logger.log.callCount).to.be.equal(1);
    stubedCalculate.restore();
    logger.log.restore();
  });
});
