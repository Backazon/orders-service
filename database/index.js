const { Client } = require('cassandra-driver');

const client = new Client({
  contactPoints: [process.env.CONTACT_POINT || '127.0.0.1'],
  keyspace: process.env.KEYSPACE_NAME || 'backazon',
});

module.exports = client;
