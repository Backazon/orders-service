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

const queueURL = 'https://sqs.us-west-1.amazonaws.com/886783916104/orders';

const params = {
  AttributeNames: ['SentTimestamp'],
  MaxNumberOfMessages: 1,
  MessageAttributeNames: ['All'],
  QueueUrl: queueURL,
  WaitTimeSeconds: 10,
};

sqs.receiveMessage(
  params,
  (err, data) =>
    new Promise((reject, resolve) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    }),
);

exports.default = sqs;
