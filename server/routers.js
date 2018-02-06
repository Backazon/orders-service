const express = require('express');
const client = require('../database/index.js');

const router = express.Router();

client.connect(() => console.log('cassandra driver connected'));
const table = process.env.TABLE_NAME || 'orders';

router.get('/', (req, res) => {
  res.send('connected!');
});

router.get('/api/ordersByUser', async (req, res) => {
  const query = `SELECT * FROM ${table} WHERE userid=62693`;
  try {
    const result = await client.execute(query);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json(error.stack);
  }
});

router.get('/api/ordersByDate', async (req, res) => {
  const query = `SELECT userid, items, totalprice FROM ${table} WHERE date < '2017-01-07' AND userid > 1 AND userid < 100 ALLOW FILTERING`;
  try {
    const result = await client.execute(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json(error.stack);
  }
});

router.post('/api/placeOrder', async (req, res) => {
  const {
    userid, date, items, orderid, purchasemethod, timestamp, totalprice,
  } = req.body;
  const query = `INSERT INTO ${table} (userid, date, items, orderid, purchasemethod, timestamp, totalprice) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const params = [userid, date, items, orderid, purchasemethod, timestamp, totalprice];
  try {
    const result = await client.execute(query, params, { prepare: true });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.stack);
  }
});

// router.post('/api/updateInventory')
// router.post('/api/updateAnalytics)

module.exports = router;
