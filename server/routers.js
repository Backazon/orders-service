const express = require('express');

const db = require('../database');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('connected!');
});

router.get('/api/ordersByUser', async (req, res) => {
  try {
    const result = await db.ordersByUser(req.body.userid);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.stack);
  }
});

router.get('/api/ordersByDate', async (req, res) => {
  try {
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
    const result = await db.placeOrder(params);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.stack);
  }
});

// function to update inventory (interval)
// function to update user analytics (interval)

module.exports = router;
