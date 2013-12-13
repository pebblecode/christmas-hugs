//
// ## app/config
//

require.config({
  deps:            ['main'],
  paths: {
    jquery:        '/bower_components/jquery/jquery',
    handlebars:    '/bower_components/handlebars/handlebars',
    lodash:        '/bower_components/lodash/dist/lodash',
    underscore:    '/bower_components/lodash/dist/lodash.underscore',
    backbone:      '/bower_components/backbone/backbone',
    gif:           '/bower_components/gif.js/dist/gif',
    gifworker:     '/bower_components/gif.js/dist/gif.worker'
  },

  shim: {
    'backbone': {
      deps: ['lodash', 'jquery'],
      exports: 'Backbone'
    },

    'handlebars': {
      exports: 'Handlebars'
    },

    'gif': {
      exports: 'GIF'
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
