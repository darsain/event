/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element}  el
 * @param {String}   type
 * @param {Function} fn
 * @param {Boolean}  [capture]
 *
 * @return {Function} `fn`
 */
exports.bind = window.addEventListener ? function (el, type, fn, capture) {
	el.addEventListener(type, fn, capture || false);
	return fn;
} : function (el, type, fn) {
	var fnid = type + fn;

	el[fnid] = el[fnid] || function () {
		var event = window.event;
		event.target = event.srcElement;
		event.preventDefault = preventDefault;
		event.stopPropagation = stopPropagation;
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
 * @param {Boolean}  [capture]
 *
 * @return {Function} `fn`
 */
exports.unbind = window.removeEventListener ? function (el, type, fn, capture) {
	el.removeEventListener(type, fn, capture || false);
	return fn;
} : function (el, type, fn) {
	var fnid = type + fn;
	el.detachEvent('on' + type, el[fnid]);

	// clean up reference to handler function, but with a fallback
	// because we can't delete window object properties
	try {
		delete el[fnid];
	} catch (err) {
		el[fnid] = undefined;
	}

	return fn;
};

/**
 * Prevets default event action in IE8-.
 */
function preventDefault() {
	this.returnValue = false;
}

/**
 * Stops event propagation in IE8-.
 */
function stopPropagation() {
	this.cancelBubble = true;
}