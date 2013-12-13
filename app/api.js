define([
  'backbone'
],

function (Backbone) {

  'use strict';

  var api = {};

  api.Model = Backbone.Model.extend({
    url: 'http://christmas-hugs-api.herokuapp.com/hugs',
    defaults: {
      name: (new Date()).toString()
    }
  });

  api.Collection = Backbone.Collection.extend({
    url: 'http://christmas-hugs-api.herokuapp.com/hugs',
    model: api.Model
  });

  api.collection = new api.Collection();
  api.model = new api.Model();

  return api;

});
