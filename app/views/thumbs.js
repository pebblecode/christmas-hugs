define([
  'marionette',
  'hbs!../templates/item'
],

function(Marionette, tmpl) {

  'use strict';

  var Row = Marionette.ItemView.extend({
    tagName: 'li',
    template: tmpl
  });

  var View = Marionette.CollectionView.extend({
    className: 'thumbnails border-top',
    tagName: 'ul',
    itemView: Row
  });

  return View;

});
