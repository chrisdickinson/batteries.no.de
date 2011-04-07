var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    routes = require('./urls').routes,
    template = require('./template'),
    settings = require('./settings');

var server = http.createServer();
server.on('request', routes.root(function(req, response) {
    template.render_to_response('404.html').
      bind(req, response);
}));

server.listen(settings.PORT);
