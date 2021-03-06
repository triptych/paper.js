/*
 * Paper.js
 * 
 * This file is part of Paper.js, a JavaScript Vector Graphics Library,
 * based on Scriptographer.org and designed to be largely API compatible.
 * http://paperjs.org/
 * http://scriptographer.org/
 * 
 * Distributed under the MIT license. See LICENSE file for details.
 * 
 * Copyright (c) 2011, Juerg Lehni & Jonathan Puckey
 * http://lehni.org/ & http://jonathanpuckey.com/
 * 
 * All rights reserved.
 */

var DomElement = new function() {
	function cumulate(el, name, parent, positioned) {
		var left = name + 'Left',
			top = name + 'Top',
			x = 0,
			y = 0;
			// If we're asked to calculate positioned offset, stop at any
			// parent element that has relative or absolute position.
			while (el && (!positioned
					|| !/^(relative|absolute)$/.test(el.style.position))) {
			x += el[left] || 0;
			y += el[top] || 0;
			el = el[parent];
		}
		return Point.create(x, y);
	}

	return {
		getOffset: function(el, positioned, scroll) {
			var point = cumulate(el, 'offset', 'offsetParent', positioned);
			return scroll
				? point.subtract(cumulate(el, 'scroll', 'parentNode'))
				: point;
		},

		getSize: function(el) {
			return Size.create(el.offsetWidth, el.offsetHeight);
		},

		getBounds: function(el, positioned, scroll) {
			return new Rectangle(DomElement.getOffset(el, positioned, scroll),
					DomElement.getSize(el));
		},

		getWindowSize: function() {
			var doc = document.getElementsByTagName(
					document.compatMode === 'CSS1Compat' ? 'html' : 'body')[0];
			return Size.create(
				window.innerWidth || doc.clientWidth,
				window.innerHeight || doc.clientHeight
			);
		},

		/**
		 * Checks if element is invisibile (display: none, ...)
		 */
		isInvisible: function(el) {
			return DomElement.getSize(el).equals([0, 0]);
		},

		/**
		 * Checks if element is visibile in current viewport
		 */
		isVisible: function(el) {
			// See if the scrolled bounds intersect with the windows rectangle
			// which always starts at 0, 0
			return !DomElement.isInvisible(el)
					&& new Rectangle([0, 0], DomElement.getWindowSize())
						.intersects(DomElement.getBounds(el, false, true));
		}
	};
};
