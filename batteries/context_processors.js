var settings = require('./settings');

var context_processor = function(name, action) {
  action.context_name = name;
  return action;
};

exports.media_url = context_processor('MEDIA_URL', function(callback) {
  return settings.MEDIA_URL;
});

