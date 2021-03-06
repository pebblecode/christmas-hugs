require([
  'marionette',
  'gif',
  './api',
  './views/thumbs'
],

function(Marionette, GIF, api, Thumbs) {

  'use strict';

  window.api = api;

  $('button').hide();
  $('#spinner').hide();

  navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

  var constraints = { audio: false, video: true };
  var video = document.querySelector('video');
  var canvas = document.querySelector('canvas');
  var button = document.querySelector('button');
  var target = document.getElementById('target');
  var canvasToImage = document.getElementById('canvas-to-image');

  var ctx = canvas.getContext('2d');
  var localMediaStream = null;



  var app =  new Marionette.Application();
  window.app = app;


  api.collection.fetch({
    reset: true
  });

  api.collection.on('reset', function(data) {
    var thumbsView = new Thumbs({
      collection: api.collection,
      model: api.model
    });

    $('.thumbs-container').append(thumbsView.el);

    thumbsView.render();
  });

  function successCallback(stream) {
    if (window.URL) {
      $('button').show();
      video.src = window.URL.createObjectURL(stream);
      localMediaStream = stream;
    } else {
      video.src = stream;
    }
    video.play();
  }

  function pipeVideoToImage () {
    setInterval(snapshot, 1000);
  }

  function errorCallback(error) {
    console.log("navigator.getUserMedia error: ", error);
  }

  function makeHug () {

    $('#spinner').show();
    $('button').hide();

    var gif = new GIF({
      workers: 2,
      quality: 1,
      width: 160,
      height: 120,
      workerScript: 'bower_components/gif.js/dist/gif.worker.js'
    });

    gif.on('finished', function(blob) {
      $('#spinner').hide();
      $('button').show();
      target.src = window.URL.createObjectURL(blob);

      var reader = new FileReader();
      reader.onload = function(e){
        api.model.save({
          dataUri: reader.result
        });
      };
      reader.readAsDataURL(blob);

    });

    var takePictures = setInterval (function () {
      gif.addFrame(ctx, {
        copy: true,
        delay: 100
      });
    }, 100);

    setTimeout(function() {
      clearTimeout(takePictures);
      gif.render();
    }, 2000);

  }

  function snapshot () {

    setInterval(function () {

      if (localMediaStream) {
        ctx.drawImage(video, 0, 0, 160, 120);
        // "image/webp" works in Chrome.
        // Other browsers will fall back to image/png.
      }

    }, 100);

  }


  navigator.getUserMedia(constraints, successCallback, errorCallback);

  button.addEventListener('click', snapshot, false);
  button.addEventListener('click', makeHug, false);

});
