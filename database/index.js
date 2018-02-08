const { Client } = require('cassandra-driver');

const client = new Client({
  contactPoints: [process.env.CONTACT_POINT || '127.0.0.1'],
  keyspace: process.env.KEYSPACE_NAME || 'backazon_production',
});

client.connect(() => console.log('cassandra driver connected'));

const table = process.env.TABLE_NAME || 'orders';

// returns all the historical orders from a specific user id as an array of objects
// TODO: Fix userid = 1
const ordersByUser = userid =>
  client
    .execute(`SELECT * FROM ${table} WHERE userid=${userid} limit 10`)
    .then(result => result.rows);

// TODO: figure out what parameters
// returns order items in an array for a specific date range
const ordersByDate = () =>
  client
    .execute(`SELECT userid, itemid, qty, rating, totalprice FROM ${table} WHERE date < '2017-01-07' limit 50 ALLOW FILTERING`)
    .then(result => result.rows);

// inserts an order into the cassandra database & takes in a formatted array as a parameter
// [userid(int), date (new Date()), items(string), orderid(int), purchasemethod(string),
// timestamp(bigint), totalprice(int)]
const placeOrder = params =>
  client
    .execute(
      `INSERT INTO ${table} (userid, date, itemid, orderid, purchasemethod, qty, rating, timestamp, totalprice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      params,
      { prepare: true },
    )
    .then(result => result);

module.exports = {
  client,
  ordersByUser,
  ordersByDate,
  placeOrder,
};
