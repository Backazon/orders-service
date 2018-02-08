const { expect } = require('chai');
const db = require('../database');
const { Client } = require('cassandra-driver');

describe('Cassandra Database', () => {
  describe('Client connect', () => {
    it('should connect to the database', (done) => {
      const client = new Client({
        contactPoints: [process.env.CONTACT_POINT || '127.0.0.1'],
        keyspace: process.env.KEYSPACE_NAME || 'backazon_production',
      });
      client.connect(done);
    });
  }).timeout(1000);
  describe('Get Orders By User', () => {
    it('should return a list of orders by userid', async () => {
      const result = await db.ordersByUser(1);
      expect(result[0]).to.have.property('userid');
    });
  });
});
