const { expect } = require('chai');
const { Client } = require('cassandra-driver');

describe('Cassandra Database', () => {
  describe('client connect', () => {
    it('should connect to the database', (done) => {
      const client = new Client({
        contactPoints: [process.env.CONTACT_POINT || '127.0.0.1'],
        keyspace: process.env.KEYSPACE_NAME || 'backazon_production',
      });
      client.connect(done);
    });
  }).timeout(1000);
});
