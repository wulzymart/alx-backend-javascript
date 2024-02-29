const request = require('request');
const { expect } = require('chai');

describe('API test', () => {
  const API_URL = 'http://localhost:7865';

  it('index page', (done) => {
    request.get(`${API_URL}/`, (_err, res, body) => {
      expect(res.statusCode).to.be.equal(200);
      expect(body).to.be.equal('Welcome to the payment system');
      done();
    });
  });

  it('cart valid id', (done) => {
    request.get(`${API_URL}/cart/47`, (_err, res, body) => {
      expect(res.statusCode).to.be.equal(200);
      expect(body).to.be.equal('Payment methods for cart 47');
      done();
    });
  });

  it('cart non numeric -', (done) => {
    request.get(`${API_URL}/cart/-2`, (_err, res, _body) => {
      expect(res.statusCode).to.be.equal(404);
      done();
    });
  });

  it('cart non numeric', (done) => {
    request.get(`${API_URL}/cart/zdfg4`, (_err, res, _body) => {
      expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
});
