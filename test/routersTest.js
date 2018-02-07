const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');

chai.use(chaiHttp);

describe('Server', () => {
  describe('GET /', () => {
    it('should connect to the home page successfully', (done) => {
      chai
        .request(server)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    }).timeout(1000);
  });
  describe('GET /api/ordersByUser', () => {
    it("should return user's orders", (done) => {
      chai
        .request(server)
        .get('/api/ordersByUser')
        .send({ userid: 1 })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    }).timeout(1000);
    it('should return the proper order by user object with correct key values', (done) => {
      chai
        .request(server)
        .get('/api/ordersByUser')
        .send({ userid: 1 })
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.have.property('userid');
          expect(res.body[0]).to.have.property('date');
          expect(res.body[0]).to.have.property('itemid');
          expect(res.body[0]).to.have.property('orderid');
          expect(res.body[0]).to.have.property('purchasemethod');
          expect(res.body[0]).to.have.property('qty');
          expect(res.body[0]).to.have.property('rating');
          expect(res.body[0]).to.have.property('timestamp');
          expect(res.body[0]).to.have.property('totalprice');
          done();
        });
    }).timeout(1000);
    it('should properly throw an error if userid is wrong type/format', (done) => {
      chai
        .request(server)
        .get('/api/ordersByUser')
        .send({ userid: 'MALICIOUSSSSSS MUHAHAHH' })
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res).to.have.status(500);
          done();
        });
    }).timeout(1000);
  });
  describe('GET /api/ordersByDate', () => {
    it("should return user's orders by date", (done) => {
      chai
        .request(server)
        .get('/api/ordersByDate')
        .send()
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res).to.be.json;
          done();
        });
    }).timeout(1000);
    it('should return the proper order by date object with correct key values', (done) => {
      chai
        .request(server)
        .get('/api/ordersByDate')
        .send()
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.have.property('userid');
          expect(res.body[0]).to.have.property('itemid');
          expect(res.body[0]).to.have.property('qty');
          expect(res.body[0]).to.have.property('rating');
          expect(res.body[0]).to.have.property('totalprice');
          done();
        });
    }).timeout(1000);
    it('should properly throw an error if date is wrong type/format', (done) => {
      chai
        .request(server)
        .get('/api/ordersByDate')
        .send({ date: 'asdfasdf' })
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res).to.have.status(500);
          done();
        });
    }).timeout(1000);
  });
  describe('POST /api/placeOrder', () => {
    // TODO: add more specific testing for req object is expected
    it("should return user's orders by date", (done) => {
      chai
        .request(server)
        .post('/api/placeOrder')
        .send({
          userid: 1,
          date: '2017-03-30T16:00:00.000Z',
          itemid: 4476,
          orderid: 1614238,
          purchasemethod: 'collaborative',
          qty: 5,
          rating: 1,
          timestamp: '1517972552868',
          totalprice: 226,
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          done();
        });
    }).timeout(1000);
    it('should properly throw an error if order placed is wrong type/format', (done) => {
      chai
        .request(server)
        .post('/api/placeOrder')
        .send({ orderid: 'MALICIOUSSSSSS MUHAHAHH' })
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res).to.have.status(500);
          done();
        });
    }).timeout(1000);
  });
});
