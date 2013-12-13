require([
  'gif',
  './api',
  'letitsnow'
],

function(GIF, api) {

  'use strict';

  window.api = api;

  $('body').letItSnow();


  navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

  var constraints = { audio: false, video: true };
  var video = document.querySelector('video');
  var canvas = document.querySelector('canvas');
  var button = document.querySelector('button');
  var target = document.getElementById('target');
  var ctx = canvas.getContext('2d');
  var localMediaStream = null;


  button.addEventListener('click', snapshot, false);
  button.addEventListener('click', makeHug, false);


  function successCallback(stream) {
    if (window.URL) {
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

    var gif = new GIF({
      workers: 2,
      quality: 1,
      width: 160,
      height: 120,
      workerScript: 'bower_components/gif.js/dist/gif.worker.js'
    });

    gif.on('finished', function(blob) {
      target.src = window.URL.createObjectURL(blob);
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
        document.querySelector('img').src = canvas.toDataURL('image/webp');
      }
    }, 100);

  }

  api.collection.add({
    dataUri: canvas.toDataURL('image/webp')
  });

  navigator.getUserMedia(constraints, successCallback, errorCallback);

});