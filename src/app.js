const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./utils/errorHandler');
const path = require('path');
const welcome = require('./utils/welcome');
require('dotenv').config();

// API
const app = express();

// Middlewares
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1', router);
app.get('/', (req, res) => {
  return res.send(welcome());
});

// Errors Middlewares
app.use(errorHandler);

module.exports = app;
