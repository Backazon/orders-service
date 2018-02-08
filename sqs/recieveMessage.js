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

const queueURL = 'QUEUE_URL';

const params = {
  AttributeNames: ['SentTimestamp'],
  MaxNumberOfMessages: 1,
  MessageAttributeNames: ['All'],
  QueueUrl: queueURL,
  VisibilityTimeout: 0,
  WaitTimeSeconds: 0,
};

sqs.receiveMessage(params, (err, data) => {
  if (err) {
    console.log('Receive Error', err);
  } else if (data.Messages) {
    const deleteParams = {
      QueueUrl: queueURL,
      ReceiptHandle: data.Messages[0].ReceiptHandle,
    };
    sqs.deleteMessage(deleteParams, (err, data) => {
      if (err) {
        console.log('Delete Error', err);
      } else {
        console.log('Message Deleted', data);
      }
    });
  }
});
