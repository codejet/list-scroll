// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
!function(){"use strict";var n,i=0,e=["ms","moz","webkit","o"];for(n=0;n<e.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[e[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[n]+"CancelAnimationFrame"]||window[e[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(n){var e=(new Date).getTime(),a=Math.max(0,16-(e-i)),o=window.setTimeout(function(){n(e+a)},a);return i=e+a,o}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(n){window.clearTimeout(n)})}();
