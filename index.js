const fs = require('fs');
const legacy = require('legacy-encoding');
const detectCharacterEncoding = require('detect-character-encoding');

const arguments = process.argv.slice(2);
let filenames;

if (arguments.length === 0) {
  // Search for all srt files
  filenames = fs.readdirSync('./').filter(filename => filename.endsWith('.srt'));
} else {
  filenames = arguments.filter(argument => argument.endsWith('.srt'));
}

filenames.forEach((filename) => {
  var buffer = fs.readFileSync(filename);
  var originalEncoding = detectCharacterEncoding(buffer);
  if (originalEncoding.encoding.includes('ISO')) {
    buffer = legacy.decode(buffer, originalEncoding.encoding, { 'mode': 'fatal' });
    fs.writeFileSync(filename, buffer, 'UTF-8');
  } else {
    var file = fs.readFileSync(filename, originalEncoding.encoding);
    fs.writeFileSync(filename, file, 'UTF-8');
  }
  console.log(`Encoding successfully changed from ${originalEncoding.encoding} to UTF-8 for ${filename}.`);
});
