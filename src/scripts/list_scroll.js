if (!('app' in window)) {
  window.app = {};
}

window.app.listScroll = (function(window, document) {
  'use strict';

  var DEFAULT_DATA_PATH = 'scripts/data.json';
  var ITEM_HEIGHT = 96;
  var ITEM_BASE_CLASS = 'user';

  var utils = app.utils;
  var $container, initialBottomPadding, items, itemsLength, numberOfVisibleItems;

  var createItem = function(item) {
    var user = utils.createDomElement('div', { id: item.id, className: ITEM_BASE_CLASS});
    var image = utils.createDomElement('img', { src: item.image, className: ITEM_BASE_CLASS + '__image'});
    var info = utils.createDomElement('div', { className: ITEM_BASE_CLASS + '__info'});
    var name = utils.createDomElement('div', { className: ITEM_BASE_CLASS + '__name'}, item.name);
    var city = utils.createDomElement('div', { className: ITEM_BASE_CLASS + '__city'}, item.city);

    info.appendChild(name);
    info.appendChild(city);

    user.appendChild(image);
    user.appendChild(info);

    return user;
  };

  var setPaddings = function(offsetItems) {
    var paddingTop = offsetItems * ITEM_HEIGHT;
    var paddingBottom = initialBottomPadding - paddingTop;

    $container.style.padding = paddingTop + 'px 0 ' + paddingBottom + 'px 0';
  };

  var handleScroll = function() {
    var offsetItemsCount = Math.floor(window.pageYOffset / ITEM_HEIGHT);
    // prevents errors in Safari
    var isWithinRange = (offsetItemsCount >= 0 && offsetItemsCount <= itemsLength - numberOfVisibleItems);

    if (isWithinRange) {
      $container.style.display = 'none';

      createVisibleItems(offsetItemsCount);
      setPaddings(offsetItemsCount);

      $container.style.display = '';
    }
  };

  var handleResize = function() {
    numberOfVisibleItems = calculateNumberOfVisibleItems();

    createVisibleItems();
    setInitialBottomPadding();
  };

  var bindEvents = function() {
    window.addEventListener('scroll', utils.throttle(handleScroll), false);
    window.addEventListener('resize', utils.throttle(handleResize), false);
  };

  var setInitialBottomPadding = function() {
    var itemsTotalHeight = itemsLength  * ITEM_HEIGHT;
    initialBottomPadding = itemsTotalHeight - (numberOfVisibleItems * ITEM_HEIGHT);

    $container.style.paddingBottom = initialBottomPadding + 'px';
  };

  var createVisibleItems = function(startIndex) {
    startIndex = startIndex || 0;
    var fragment = document.createDocumentFragment();

    for (var i = startIndex, j = startIndex + numberOfVisibleItems; i < j; i++) {
      fragment.appendChild(createItem(items[i]));
    }

    $container.innerHTML = '';
    $container.appendChild(fragment);
  };

  var calculateNumberOfVisibleItems = function() {
    var viewPortHeight = window.innerHeight;
    var visibleItems = Math.ceil(viewPortHeight / ITEM_HEIGHT);

    return visibleItems;
  };

  var hideLoadingMessage = function() {
    $container.innerHTML = '';
  };

  var startListScroll = function(data) {
    numberOfVisibleItems = calculateNumberOfVisibleItems();
    items = data;
    itemsLength = data.length;

    hideLoadingMessage();
    createVisibleItems();
    setInitialBottomPadding();
    bindEvents();
  };

  var setContainer = function(id) {
    id = id || 'main';
    $container = utils.$(id);
  };

  var init = function(options) {
    options = options || {};

    setContainer(options.containerId);

    if (!options.data) {
      utils.load(DEFAULT_DATA_PATH, startListScroll);
    } else {
      startListScroll(options.data);
    }
  };

  return Object.freeze({
    init: init
  });
})(window, document);
