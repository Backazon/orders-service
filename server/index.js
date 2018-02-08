// const nr = require('newrelic');
const cluster = require('cluster');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const router = require('./routers.js');

// ==========================================================
// ============ NODE CLUSTERS FOR PROUDCTION ================
// ==========================================================
if (cluster.isMaster) {
  const numWorkers = require('os').cpus().length;

  console.log(`Master cluster setting up ${numWorkers} workers...`);

  for (let i = 0; i < numWorkers; i += 1) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  const app = express();

  const PORT = process.env.PORT || 3000;

  app
    .use(compression())
    .use(bodyParser.json())
    .use(router)
    .listen(PORT, () => {
      console.log(`Process ${process.pid} is listening to all incoming requests!`);
    });
  app.all('/*', (req, res) => {
    res.send(`process ${process.pid} says hello!`).end();
  });
  module.exports = app;
}

// ==========================================================
// ================== NODE FOR TESTING ======================
// ==========================================================
// const app = express();

// const PORT = process.env.PORT || 3000;

// app
//   .use(compression())
//   .use(bodyParser.json())
//   .use(router)
//   .listen(PORT, () => {
//     console.log(`Process ${process.pid} is listening to all incoming requests!`);
//   });
// module.exports = app;
