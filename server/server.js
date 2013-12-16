var express   = require('express'),
    fs        = require('fs'),
    _         = require('underscore'),
    app       = express(),
    staticDir = express['static'];

module.exports = function(opts) {

  'use strict';

  opts = _.extend({
    port :      4444,
    tests :     true,
    baseDir :   './'
  }, opts || {});


  var port = process.env.PORT || opts.port;

  app.configure(function() {
    [ 'app', 'bower_components', 'assets' ].forEach(function(dir) {
      app.use('/' + dir, staticDir(opts.baseDir + dir));
    });
    app.use(express.bodyParser());
  });

  app.get("/", function(req, res) {
    fs.createReadStream(opts.baseDir + 'app/index.html').pipe(res);
  });

  // Actually listen
  app.listen(port || null);

  console.log("Serving at http://localhost:" + (port || ''));
};
