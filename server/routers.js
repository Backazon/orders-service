const express = require('express');

const db = require('../database');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('connected!');
});

router.get('/api/ordersByUser', async (req, res) => {
  let { userid } = req.body;
  try {
    if (typeof userid !== 'number') throw new Error('invalid userid type');
    // FIXME: after testing change
    const result = await db.ordersByUser((userid = 1));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.stack);
  }
});

router.get('/api/ordersByDate', async (req, res) => {
  const { date = '2017-01-01' } = req.body;
  try {
    if (typeof date !== 'string' || !isNaN(date) || isNaN(Date.parse(date))) {
      throw new Error('invalid date');
    }
    const result = await db.ordersByDate();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.stack);
  }
});

router.post('/api/placeOrder', async (req, res) => {
  const {
    userid,
    date,
    itemid,
    orderid,
    purchasemethod,
    qty,
    rating,
    timestamp,
    totalprice,
  } = req.body;
  const params = [
    userid,
    date,
    itemid,
    orderid,
    purchasemethod,
    qty,
    rating,
    timestamp,
    totalprice,
  ];
  try {
    if (!req.body.userid || !req.body.orderid || Object.keys(req.body).length !== 9) {
      throw new Error('not a valid order');
    }
    const result = await db.placeOrder(params);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.stack);
  }
});

// function to update inventory (interval)
// function to update user analytics (interval)

module.exports = router;
