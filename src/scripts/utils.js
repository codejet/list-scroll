if (!('app' in window)) {
  window.app = {};
}

window.app.utils = (function(document) {
  'use strict';

  var $ = function(id) {
    return document.getElementById(id);
  };

  var createDomElement = function(type, properties, textContent) {
    var element = document.createElement(type);

    if (properties) {
      Object.keys(properties).forEach(function(property) {
        element[property] = properties[property];
      });
    }

    if (textContent) {
      element.appendChild(document.createTextNode(textContent));
    }

    return element;
  };

  var throttle = function(callback) {
    var running = false;

    return function() {
      if (running) { return; }
      running = true;
      window.requestAnimationFrame(function() {
        callback();
        running = false;
      });
    };
  };

  var load = function(path, callback) {
    var req = new XMLHttpRequest();

    req.open('GET', path, true);
    req.setRequestHeader('Content-type', 'application/json');
    req.onreadystatechange = function() {
      if (req.readyState == 4 && req.status == 200) {
        var data = JSON.parse(req.responseText);
        callback(data);
      }
    };
    req.send();
  };

  return Object.freeze({
    $: $,
    createDomElement: createDomElement,
    load: load,
    throttle: throttle
  });
})(document);
