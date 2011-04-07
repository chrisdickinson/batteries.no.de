var path = require('path'),
    fs = require('fs'),
    settings_path = path.join(__dirname, 'local_settings.json'),
    local_settings = path.existsSync(settings_path) ?
      JSON.parse(fs.readFileSync(settings_path).toString('utf8')) :
      {};

console.log(local_settings);
module.exports = local_settings;
local_settings.MEDIA_URL ||
  (module.exports.MEDIA_URL = 'http://batteries.no.de/media/');

module.exports.PORT = process.env.PORT || 8001;
