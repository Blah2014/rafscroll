/*!
 * rafscroll 0.1
 *
 * Copyright 2015, Kevin Foley - http://github.com/foleyatwork
 * Released under the WTFPL license - http://www.wtfpl.net/txt/copying/
 */
 (function() {
  if (!window.requestAnimationFrame) {
    console.info(
      'Your browser does not support requestAnimationFrame. There is a nice polyfill you can use here.',
      'https://gist.github.com/paulirish/1579671'
    );
    return;
  }

  /** @constant {Number} */
  var SCROLL_TIMEOUT_VALUE = 100;

  /** @var {Boolean} */
  var scrolling = false;

  /** @var {Object} */
  var scrollEventSubscription;

  /** @var {Object} */
  var mostRecentScrollEvent;

  /** @var {Function} */
  var scrollTimeout;

  /**
   * @param callback
   * @type {Function}
   * @callback
   */
  var callback;

  /**
   * @param args
   * @type {Array}
   */
  var args;

  /**
   * @class rafscroll
   * @access public
   */
  function rafscroll(fn, cxt, params) {
    if (!fn) {
      console.warn('rafScroll: No callback supplied, not initiating.');
      return;
    }

    if (typeof fn != 'function') {
      console.warn('rafScroll: Invalid callback type.');
      return;
    }

    callback = fn;
    args = params || [];

    this.subscribe();
  }

  /** @lends rafscroll */
  rafscroll.prototype = {
    /**
     * @method subscribe
     * @access public
     * @memberof rafscroll
     */
    subscribe: function() {
      addEventListener('scroll', scrollCallback, false);
    },

    /**
     * @access public
     * @memberof rafscroll
     * @example
     */
    unsubscribe: function() {
      removeEventListener('scroll', scrollCallback, false);
    }
  };

  /**
   * @callback scrollCallback
   * @access private
   */
  function scrollCallback(e) {
    mostRecentScrollEvent = e;

    if (scrolling === false) {
      scrolling = true;
      rafscrollCallback();
    }

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(function() {
      scrolling = false;
    }, SCROLL_TIMEOUT_VALUE);
  }

  /**
   * @method rafscrollCallback
   * @access private
   */
  function rafscrollCallback(e) {
    // Add the event to the arguments array.
    args.unshift(mostRecentScrollEvent);

    // Invoke the callback.
    callback.apply(window || {}, args);

    // Remove the event from the arguments array so it doesn't get passed in the
    // next callback instance.
    args.shift();

    // Invoke the function again if we're still scrolling.
    if (scrolling === true) {
      requestAnimationFrame(rafscrollCallback);
    }
  }

  // Export an amd module, commonJS module, or create a namespace.
  if (typeof define === 'function' && define.amd) {
    define('rafscroll', rafscroll);
  } else if (typeof module !== 'undefined' && typeof exports !== 'undefined') {
    module.exports = { rafscroll: rafscroll };
  } else {
    window.rafscroll = rafscroll;
  }
}());