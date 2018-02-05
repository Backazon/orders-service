const express = require('express');
const client = require('../database/index.js');

const router = express.Router();

client.connect(() => console.log('cassandra driver connected'));

router.get('/', (req, res) => {
  res.send('connected!');
});

router.get('/api/ordersByUser', async (req, res) => {
  const query = 'SELECT * FROM orders WHERE userid=62693';
  try {
    const result = await client.execute(query);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json(error.stack);
  }
});

router.get('/api/ordersByDate', async (req, res) => {
  const query = "SELECT * FROM orders WHERE date > '2017-01-07' ALLOW FILTERING";
  try {
    const result = await client.execute(query);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json(error.stack);
  }
});

// router.post('/api/placeOrder')
// router.post('/api/updateInventory')
// router.post('/api/updateAnalytics)

module.exports = router;
