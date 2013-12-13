//
// ## app/config
//

require.config({
  deps:            ['main'],
  paths: {
    jquery:        '/bower_components/jquery/jquery',
    handlebars:    '/bower_components/handlebars/handlebars',
    underscore:    '/bower_components/underscore/underscore',
    backbone:      '/bower_components/backbone/backbone',
    gif:           '/bower_components/gif.js/dist/gif',
    gifworker:     '/bower_components/gif.js/dist/gif.worker',
    letitsnow:     '/bower_components/letitsnow.js/index'
  },

  shim: {

    'underscore': {
     exports: '_'
    },

    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },

    'handlebars': {
      exports: 'Handlebars'
    },

    'gif': {
      exports: 'GIF'
    },

    'letitsnow': {
      deps: ['jquery'],
      exports: 'jQuery.fn.letItSnow'
    }
  }

});

//
// requirejs error reporting
//
window.requirejs.onError = function (err) {
  "use strict";

  console.warn('require error: ', err.requireType);
  if (err.requireType === 'timeout') {
    console.warn('modules: ' + err.requireModules);
  }

  throw err;
};

if (!window.mocha) {
  require(['main']);
}
