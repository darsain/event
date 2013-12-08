'use strict';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element}  el
 * @param {String}   type
 * @param {Function} fn
 * @param {Boolean}  capture
 *
 * @return {Function}
 */
exports.bind = window.addEventListener ? function (el, type, fn, capture) {
	el.addEventListener(type, fn, capture || false);
	return fn;
} : function (el, type, fn) {
	var fnid = type + fn;
	el[fnid] = el[fnid] || function () {
		var event = window.event;
		event.target = event.srcElement;
		event.preventDefault = function () {
			event.returnValue = false;
		};
		event.stopPropagation = function () {
			event.cancelBubble = true;
		};
		fn.call(el, event);
	};
	el.attachEvent('on' + type, el[fnid]);
	return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element}  el
 * @param {String}   type
 * @param {Function} fn
 * @param {Boolean}  capture
 *
 * @return {Function}
 */
exports.unbind = window.removeEventListener ? function (el, type, fn, capture) {
	el.removeEventListener(type, fn, capture || false);
	return fn;
} : function (el, type, fn) {
	var fnid = type + fn;
	el.detachEvent('on' + type, el[fnid]);
	try {
		delete el[fnid];
	} catch (err) {
		// can't delete window object properties
		el[fnid] = undefined;
	}
	return fn;
};