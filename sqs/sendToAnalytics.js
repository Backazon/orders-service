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

const sendToAnalytics = params =>
  new Promise((reject, resolve) => {
    sqs.sendMessage(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });

module.exports = sendToAnalytics;
