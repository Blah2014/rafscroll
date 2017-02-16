/*!
 * @license
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

  // How long to wait before we know scrolling is over.
  var SCROLL_TIMEOUT_VALUE = 100;

  /**
   * @class rafscroll
   * @param {Function} callback
   * @param {Array}    args
   */
  function rafscroll(callback, el) {
    if (!callback) {
      console.warn('rafScroll: No callback supplied, not initiating.');
      return;
    }

    if (typeof callback != 'function') {
      console.warn('rafScroll: Invalid callback type.');
      return;
    }

    this._boundHandleRAF = this._handleRAF.bind(this);
    this._boundHandleScroll = this._handleScroll.bind(this);
    this._boundHandleScrollEnd = this._handleScrollEnd.bind(this);
    this._callback = callback;
    this._el = el;
    this._scrolling = false;

    this.subscribe();
  }

  rafscroll.prototype = {
    subscribe: function() {
      if (this._isBareEventListener) {
        addEventListener('scroll', this._boundHandleScroll, false);
      } else {
        this._el.addEventListener('scroll', this._boundHandleScroll, false);
      }
    },

    unsubscribe: function() {
      if (this._isBareEventListener) {
        removeEventListener('scroll', this._boundHandleScroll, false);
      } else {
        this._el.removeEventListener('scroll', this._boundHandleScroll, false);
      }
    },

    _isBareEventListener: function() {
      if (!this._el || this._el === window) {
        return true;
      }

      var isGecko = this._isGecko();
      var isGeckoDefault = isGecko && this._el === document.body;
      var isNonGeckoDefault = !isGecko && this._el === document.documentElement;

      return isGeckoDefault || isNonGeckoDefault;
    },

    _handleScroll: function(e) {
      this._mostRecentScrollEvent = e;

      if (this._scrolling === false) {
        this._scrolling = true;
        this._boundHandleRAF();
      }

      if (this._scrollTimeout) {
        clearTimeout(this._scrollTimeout);
      }

      this._scrollTimeout = setTimeout(this._boundHandleScrollEnd, SCROLL_TIMEOUT_VALUE);
    },

    _handleRAF: function() {
      // Invoke the callback.
      this._callback();

      // Invoke the function again if we're still scrolling.
      if (this._scrolling === true) {
        requestAnimationFrame(this._boundHandleRAF);
      }
    },

    _handleScrollEnd: function() {
      this._scrolling = false;
    },

    _isGecko: function() {
      return navigator.userAgent.indexOf('Gecko') > -1 &&
        navigator.userAgent.indexOf('AppleWebkit') === -1;
    }
  };

  // Export an amd module, commonJS module, or create a namespace.
  if (typeof define === 'function' && define.amd) {
    define('rafscroll', rafscroll);
  } else if (typeof module !== 'undefined' && typeof exports !== 'undefined') {
    module.exports = { rafscroll: rafscroll };
  } else {
    window.rafscroll = rafscroll;
  }
}());
