const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const logger = require('log4js').getLogger();
const encodingUtils = require('./encodingUtils');

logger.level = 'debug';

const server = express();

dotenv.config();

const PORT = process.env.PORT;

process.on('uncaughtException', (e) => {
  logger.error("Exception not caught: ", e);
});

server.use(cors());
server.use(bodyParser.json());
server.use(helmet());

server.post('/change-encoding', (req, res) => {
  logger.debug(req.body);
  const { buffer, encoding, filename } = req.body;
  encodingUtils.changeEncoding(buffer, encoding, filename, res);
});

server.listen(PORT, () => logger.info(`Server listening to port ${PORT}`));
