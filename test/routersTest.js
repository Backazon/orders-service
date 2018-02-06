const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');

chai.use(chaiHttp);

describe('Server', () => {
  describe('GET /', () => {
    it('should return hello-world', (done) => {
      chai
        .request(server)
        .get('/')
        .end((error, res) => {
          expect(res).to.have.status(200);
          done();
        });
    }).timeout(1000);
  });
  describe('GET /api/ordersByUser', () => {
    // TODO: add more specific testing for req object is expected
    it("should return user's orders", (done) => {
      chai
        .request(server)
        .get('/api/ordersByUser')
        .send()
        .end((error, res) => {
          expect(res).to.have.status(200);
          done();
        });
    }).timeout(1000);
  });
});
