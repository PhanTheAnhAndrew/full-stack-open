/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');

const personsRouter = require('./controllers/persons');

const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger)

app.use('/api/persons', personsRouter);

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;