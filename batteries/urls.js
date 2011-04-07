var escaperoute = require('escaperoute'),
    url = escaperoute.surl,
    routes = escaperoute.routes;

exports.routes = routes('batteries/views',
  url('^/media/', 'media', 'serve_paperboy'),
  url('^/$', 'home', 'home')
);
