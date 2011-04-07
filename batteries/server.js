var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    routes = require('./urls').routes,
    template = require('./template');

var server = http.createServer();
server.on('request', routes.root(template.render.bind(template, ['404.html'], {})));
server.listen(process.env.PORT || 8001);

