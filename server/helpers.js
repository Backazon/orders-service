const axios = require('axios');

// takes in an array of objects
// out puts an array of objects with userid and items
// returns [{userid: #, itemid: #, qty: #, rating: #}...]
const formatOrders = (userid, itemid, qty, rating) => ({
  DelaySeconds: 10,
  MessageAttributes: {
    userid: {
      DataType: 'Number',
      StringValue: `${userid}`,
    },
    itemid: {
      DataType: 'Number',
      StringValue: `${itemid}`,
    },
    qty: {
      DataType: 'Number',
      StringValue: `${qty}`,
    },
    rating: {
      DataType: 'Number',
      StringValue: `${rating}`,
    },
  },
  MessageBody: `Orders from ${new Date()}`,
  QueueUrl: 'https://sqs.us-west-1.amazonaws.com/798879754898/Analytics',
});

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
