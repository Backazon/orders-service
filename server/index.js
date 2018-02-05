const express = require('express');
const bodyParser = require('body-parser');
// const compression = require('compression');
const router = require('./routers.js');

const app = express();

const PORT = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  // .use(compression())
  .use(router)
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
  });

module.exports = app;
