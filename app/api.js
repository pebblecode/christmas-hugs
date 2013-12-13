define([
  'backbone'
],

function (Backbone) {

  'use strict';

  var api = {};

  api.Model = Backbone.Model.extend({
    url: 'http://christmas-hugs-api.herokuapp.com/hugs',
    defaults: {
      date: (new Date()).toString()
    }
  });

  api.Collection = Backbone.Collection.extend({
    initialize: function() {
      this.sort({
        silent: true
      });
    },
    url: 'http://christmas-hugs-api.herokuapp.com/hugs',
    model: api.Model,
    comparator: function (m) {
      return -m.get("_id");
    }
  });

  api.collection = new api.Collection();
  api.model = new api.Model();

  return api;

});
