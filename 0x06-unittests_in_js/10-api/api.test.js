const request = require('request');
const { expect } = require('chai');

describe('API test', () => {
  const URL = 'http://localhost:7865';

  it('index page', (done) => {
    request.get(`${URL}/`, (_err, res, body) => {
      expect(res.statusCode).to.be.equal(200);
      expect(body).to.be.equal('Welcome to the payment system');
      done();
    });
  });

  it('cart valid id', (done) => {
    request.get(`${URL}/cart/47`, (_err, res, body) => {
      expect(res.statusCode).to.be.equal(200);
      expect(body).to.be.equal('Payment methods for cart 47');
      done();
    });
  });

  it('cart non numeric -', (done) => {
    request.get(`${URL}/cart/-2`, (_err, res, _body) => {
      expect(res.statusCode).to.be.equal(404);
      done();
    });
  });

  it('cart non numeric', (done) => {
    request.get(`${URL}/cart/zdfg4`, (_err, res, _body) => {
      expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
  it('login valid', (done) => {
    request.post(`${URL}/login`, { json: { username: 'mart' } }, (_err, res, body) => {
      expect(res.statusCode).to.be.equal(200);
      expect(body).to.be.equal('Welcome mart');
      done();
    });
  });

  it('available payments', (done) => {
    request.get(`${URL}/available_payments`, (_err, res, body) => {
      expect(res.statusCode).to.be.equal(200);
      expect(JSON.parse(body))
        .to.be.deep.equal({ payment_methods: { credit_cards: true, paypal: false } });
      done();
    });
  });
});
