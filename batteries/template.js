var plate = require('plate'),
    Loader = require('plate/plugins/loaders/filesystem').Loader,
    libs = require('plate/libraries'),
    Library = libs.Library,
    FilterLibrary = libs.DefaultFilterLibrary,
    path = require('path'),
    EE = require('events').EventEmitter;

var SERVER_TEMPLATES = path.join(__dirname, 'templates'),
    library = new Library(),
    loader = new Loader([SERVER_TEMPLATES]);

var Template = function(raw, libraries, parser) {
  libraries = libraries || {};
  libraries.plugin_library = library;
  libraries.filter_library = new FilterLibrary();
  return new plate.Template(raw, libraries, parser);
};

loader.setTemplateCreation(function(raw) {
  return new Template(raw);
});

library.register('loader', loader.getPlugin());

var load = loader.getPlugin();
var render = function(templates, context) {
  templates = Array.isArray(templates) ? templates.slice() : [templates];
  context = context || {};
  var searching = templates.slice(),
      ee = new EE();

  load(templates.shift(), function(err, template) {
    if(err) {
      if(templates.length) {
        load(templates.shift(), arguments.callee);
      } else {
        ee.emit('error', new Error('Could not find '+searching.join(', ')));
      }
    } else {
      setTimeout(function() {
        template.render(context, function(err, data) {
          if(err) {
            ee.emit('error', new Error('Error: '+err+' '+err.stack));
          } else {
            ee.emit('data', data);
          }
        });
      }, 0);
    }
  });

  return ee; 
};

var render_to_response = function() {
  var renderer = render.apply(this, arguments);
  return {
    'bind':function(request, response) {
      renderer.on('error', function(err) {
        response.writeHead(500, {'content-type':'text/plain'});
        response.end('Server had a boo-boo: \n'+err);
      });
      renderer.on('data', function(data) {
        response.writeHead(200, {'content-type':'text/html'});
        response.end(data);
      });
    }
  };
};

exports.Template = Template;
exports.load = load;
exports.render = render;
exports.render_to_response = render_to_response;
