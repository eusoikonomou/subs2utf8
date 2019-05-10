const legacy = require('legacy-encoding');
const Readable = require('stream').Readable;
const detectCharacterEncoding = require('detect-character-encoding');
const logger = require('log4js').getLogger();

module.exports.changeEncoding = (buffer, filename, res) => {
  const originalEncoding = detectCharacterEncoding(buffer);
  buffer = Buffer.from(legacy.decode(buffer, originalEncoding.encoding, { 'mode': 'fatal' }));
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  res.contentType('text/plain');
  logger.info(`Encoding successfully changed from ${originalEncoding.encoding} to ${detectCharacterEncoding(buffer).encoding}.`);
  res.download(stream);
};
