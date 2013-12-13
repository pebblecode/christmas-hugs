define([
  'marionette',
  'hbs!../templates/item'
],

function(Marionette, tmpl) {

  'use strict';

  var Row = Marionette.ItemView.extend({
    tagName: 'li',
    className: 'pull-left',
    template: tmpl
  });

  var View = Marionette.CollectionView.extend({
    className: 'thumbnails list-unstyled',
    tagName: 'ul',
    itemView: Row
  });

  return View;

});
