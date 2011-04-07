var escaperoute = require('escaperoute'),
    url = escaperoute.surl,
    routes = escaperoute.routes;

exports.routes = routes('batteries/views',
  url('^/media/', 'serve_paperboy', 'media'),
  url('^/$', 'home', 'home')
);
