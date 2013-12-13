define([
  'backbone'
],

function (Backbone) {

  'use strict';

  var api = {};

  api.Model = Backbone.Model.extend({
    defaults: {
      name: 'asdfaf'
    }
  });

  api.Collection = Backbone.Collection.extend({
    url: '/',
    model: api.Model
  });

  api.collection = new api.Collection();

  return api;

});
