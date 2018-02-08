// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

// Set the config for proper access
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'us-west-1',
});

// Create SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

// const params = {
//   DelaySeconds: 10,
//   MessageAttributes: {
//     Title: {
//       DataType: 'String',
//       StringValue: 'The Whistler',
//     },
//     Author: {
//       DataType: 'String',
//       StringValue: 'John Grisham',
//     },
//     WeeksOn: {
//       DataType: 'Number',
//       StringValue: '6',
//     },
//   },
//   MessageBody: 'Information about current NY Times fiction bestseller for week of 12/11/2016.',
//   QueueUrl: 'https://sqs.us-west-1.amazonaws.com/886783916104/orders',
// };

const params = {
  DelaySeconds: 10,
  MessageAttributes: {
    userid: {
      DataType: 'Number',
      StringValue: '1',
    },
    itemid: {
      DataType: 'Number',
      StringValue: '4476',
    },
    qty: {
      DataType: 'Number',
      StringValue: '5',
    },
    rating: {
      DataType: 'Number',
      StringValue: '1',
    },
  },
  MessageBody: `Orders from ${new Date()}`,
  QueueUrl: 'https://sqs.us-west-1.amazonaws.com/886783916104/orders',
};

sqs.sendMessage(params, (err, data) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data.MessageId);
  }
});

module.exports = sqs;
