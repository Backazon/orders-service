const siege = require('siege');

siege()
  .on(3000)
  .for(200000)
  .times.get('/api/ordersByUser', { userid: 1 })
  .get('/api/ordersByDate')
  .post('/api/placeOrder', {
    userid: 123456789,
    date: '2017-03-30T16:00:00.000Z',
    itemid: 4476,
    orderid: 1614238,
    purchasemethod: 'collaborative',
    qty: 5,
    rating: 1,
    timestamp: '1517972552868',
    totalprice: 12345,
  })
  .attack();
