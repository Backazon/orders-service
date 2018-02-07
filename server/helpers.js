const axios = require('axios');

// takes in an array of objects
// out puts an array of objects with userid and items
// returns [{userid: #, itemid: #, qty: #, rating: #}...]
const formatOrders = orders =>
  orders.map(order => ({
    userid: order.userid,
    itemid: order.itemid,
    qty: order.qty,
    rating: order.rating,
  }));

const updateInventory = (items) => {
  axios
    .post('/kayleighQ', {
      items,
    })
    .then(() => console.log('successfully sent to kayleighs Q!'))
    .catch(console.error);
};

const updateAnalytics = (items) => {
  axios
    .post('/bensQ', {
      items,
    })
    .then(() => console.log('successfully sent to bens Q!'))
    .catch(console.error);
};

module.exports = {
  formatOrders,
  updateInventory,
  updateAnalytics,
};
