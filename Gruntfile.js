/*global module:false*/

module.exports = function (grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  // Project configuration.
  grunt.initConfig({

    watch: {
      files: ['app/index.js', 'Gruntfile.js'],
      tasks: ['browserify']
    },

    browserify: {
      build: {
        options: {
          shim: {
            jquery: {
              path: 'bower_components/jquery/jquery.js',
              exports: '$'
            },
            underscore: {
              path: 'bower_components/underscore/underscore.js',
              exports: '_'
            },
            handlebars: {
              path: 'bower_components/handlebars/handlebars.js',
              exports: 'Handlebars'
            },
            backbone: {
              path: 'bower_components/backbone/backbone.js',
              exports: 'Backbone',
              depends: {
                underscore: 'underscore'
              }
            },
            bootstrap: {
              path: 'bower_components/bootstrap/dist/js/bootstrap.js',
              exports: 'boostrap',
              depends: {
                jquery: '$'
              }
            },
            gif: {
              path: 'bower_components/gif.js/dist/gif.js',
              exports: 'GIF'
            }

          }
        },

        src: ['index.js'],
        dest: 'bundle.js'
      }
    }

  });

  // Default task.
  grunt.registerTask('default', ['browserify']);

};
