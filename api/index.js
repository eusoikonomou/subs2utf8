const fs = require('fs');
const legacy = require('legacy-encoding');
const detectCharacterEncoding = require('detect-character-encoding');
const logger = require('log4js').getLogger();

logger.level = 'debug';

let buffer = fs.readFileSync('./test.srt');
const originalEncoding = detectCharacterEncoding(buffer);

buffer = Buffer.from(legacy.decode(buffer, originalEncoding.encoding, { 'mode': 'fatal' }));
logger.info(`Encoding successfully changed from ${originalEncoding.encoding} to ${detectCharacterEncoding(buffer).encoding}.`);
