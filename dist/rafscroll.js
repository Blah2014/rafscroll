/*!
 * rafscroll 0.1
 *
 * Copyright 2015, Kevin Foley - http://github.com/foleyatwork
 * Released under the WTFPL license - http://www.wtfpl.net/txt/copying/
 */
!function(){function e(e,o,n){return e?"function"!=typeof e?void console.warn("rafScroll: Invalid callback type."):(r=e,s=o||window,u=n||[],void this.subscribe()):void console.warn("rafScroll: No callback supplied, not initiating.")}function o(e){i=e,c===!1&&(c=!0,n()),t&&clearTimeout(t),t=setTimeout(function(){c=!1},l)}function n(){u.unshift(i),r.apply(s,u),u.shift(),c===!0&&requestAnimationFrame(n)}if(!window.requestAnimationFrame)return void console.info("Your browser does not support requestAnimationFrame. There is a nice polyfill you can use here.","https://gist.github.com/paulirish/1579671");var i,t,r,s,u,l=100,c=!1;e.prototype={subscribe:function(){addEventListener("scroll",o,!1)},unsubscribe:function(){removeEventListener("scroll",o,!1)}},"function"==typeof define&&define.amd?define("rafscroll",e):"undefined"!=typeof module&&"undefined"!=typeof exports?module.exports={rafscroll:e}:window.rafscroll=e}();