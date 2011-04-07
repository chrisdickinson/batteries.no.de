var render_to_response = require('./templates').render_to_response,
    paperboy = require('paperboy'),
    WEBROOT = require('path').join(__dirname, 'media');

exports.home = function(request, response) {
  render_to_response('homepage.html').
   bind(request, response); 
};

exports.serve_paperboy = function(request, response) {
  var mock_request = {
    'url':request.url.replace(/\/media\//g, ''),
    'headers':request.headers,
    'method':request.method
  };
  paperboy.deliver(WEBROOT, mock_request, response);
};
