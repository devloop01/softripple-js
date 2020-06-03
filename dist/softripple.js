window["SoftRipple"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ./utils.js */ "./src/utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SoftRipple = function () {
	function SoftRipple(el) {
		var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, SoftRipple);

		this.el = el;
		this.props = props;

		this.init();
	}

	_createClass(SoftRipple, [{
		key: "init",
		value: function init() {
			this.elBox = this.el.getBoundingClientRect();
			this.ripples = [];

			this.rippleSizeMin = 50;
			this.rippleSizeMax = 200;
			this.rippleSizeDefault = 100;

			this.transitionDurationMin = 0.4;
			this.transitionDurationMax = 2;
			this.transitionDurationDefault = 0.8;

			this.rippleWidthMin = 2;
			this.rippleWidthMax = 10;
			this.rippleWidthDefault = 4;

			this.rippleProps = {
				rippleColor: this.props.rippleColor || window.getComputedStyle(this.el).getPropertyValue("background-color"),
				transitionDuration: (0, _utils.clampValue)(this.props.transitionDuration, this.transitionDurationMin, this.transitionDurationMax) || this.transitionDurationDefault,
				rippleWidth: (0, _utils.clampValue)(this.props.rippleWidth, this.rippleWidthMin, this.rippleWidthMax) || this.rippleWidthDefault,
				rippleMaxSize: (0, _utils.clampValue)(this.props.rippleMaxSize, this.rippleSizeMin, this.rippleSizeMax) || this.rippleSizeDefault,
				randomSize: this.props.randomSize || false,
				randomColor: this.props.randomColor || false
			};

			this.el.style.position = "relative";
			this.el.style.overflow = "hidden";

			this.addRippleStyles();
			this.addListeners();
		}
	}, {
		key: "addRipple",
		value: function addRipple(e) {
			var x = e.x - this.elBox.left;
			var y = e.y - this.elBox.top;
			var rippleSize = (0, _utils.getRandomIntFromRange)(this.rippleSizeMin, this.rippleProps.rippleMaxSize);
			var rippleEl = document.createElement("div");
			rippleEl.id = "ripple";
			rippleEl.style.left = x + "px";
			rippleEl.style.top = y + "px";
			rippleEl.style.width = rippleSize + "px";
			rippleEl.style.height = rippleSize + "px";

			rippleEl.innerHTML = this.returnCompleteSVG();

			this.el.appendChild(rippleEl);
			this.ripples.push(rippleEl);
			this.removeRipple(rippleEl, this.rippleProps.transitionDuration * 1000);
		}
	}, {
		key: "returnCompleteSVG",
		value: function returnCompleteSVG() {
			var rippleWidth = this.rippleProps.randomSize != true ? this.rippleProps.rippleWidth : (0, _utils.getRandomIntFromRange)(this.rippleWidthMin, this.rippleWidthMax);
			var rippleColor = this.rippleProps.randomColor != true ? this.rippleProps.rippleColor : (0, _utils.getRandomHex)();

			return "<svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\" id=\"ripple-svg\"> <filter id=\"blur\" x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\"><feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"4\" /></filter><filter id=\"shadow\" x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\"><feDropShadow dx=\"7\" dy=\"3\" stdDeviation=\"2\" flood-color=\"" + (0, _utils.lightenColor)(rippleColor, -40) + "\" flood-opacity=\"0.2\" /><feDropShadow dx=\"-2\" dy=\"-4\" stdDeviation=\"1\" flood-color=\"" + (0, _utils.lightenColor)(rippleColor, 20) + "\" flood-opacity=\"0.2\" /><feDropShadow dx=\"3\" dy=\"3\" stdDeviation=\".6\" flood-color=\"" + (0, _utils.lightenColor)(rippleColor, -10) + "\" flood-opacity=\"0.2\" /><feDropShadow dx=\"3\" dy=\"3\" stdDeviation=\".6\" flood-color=\"" + (0, _utils.lightenColor)(rippleColor, -10) + "\" flood-opacity=\"0.2\" /></filter><g filter=\"url(#shadow)\"><circle cx=\"50\" cy=\"50\" r=\"30\" fill=\"none\" stroke=\"" + rippleColor + "\" stroke-width=\"" + rippleWidth + "\" filter=\"url(#blur)\" /></g></svg>";
		}
	}, {
		key: "removeRipple",
		value: function removeRipple(ripple, delay) {
			var _this = this;

			var t = setTimeout(function () {
				_this.el.removeChild(ripple);
				_this.ripples.splice(_this.ripples.indexOf(ripple), 1);
				clearTimeout(t);
			}, delay);
		}
	}, {
		key: "addRippleStyles",
		value: function addRippleStyles() {
			this.style = document.createElement("style");
			document.head.appendChild(this.style);
			this.style.sheet.insertRule("\n\t\t\t#ripple {  position: absolute; transform: translate(-50%, -50%); width: 100%; height: 100%; border-radius: 50%; overflow: hidden; animation: scale-up " + this.rippleProps.transitionDuration + "s ease forwards;}\n\t\t");
			this.style.sheet.insertRule("\n\t\t\t#ripple svg { width: 100%; height: 100%;}\n\t\t");

			this.style.sheet.insertRule("\n\t\t\t@keyframes scale-up {\n\t\t\t\tfrom {\n\t\t\t\t\topacity: 1;\n\t\t\t\t\ttransform: translate(-50%, -50%) scale(0);\n\t\t\t\t}\n\t\t\t\tto {\n\t\t\t\t\topacity: 0;\n\t\t\t\t\ttransform: translate(-50%, -50%) scale(1);\n\t\t\t\t}\n\t\t\t}\t\t\n\t\t\t");
		}
	}, {
		key: "addListeners",
		value: function addListeners() {
			var _this2 = this;

			this.el.addEventListener("pointerdown", this.addRipple.bind(this));
			window.addEventListener("resize", function () {
				_this2.elBox = _this2.el.getBoundingClientRect();
			});
		}
	}]);

	return SoftRipple;
}();

module.exports = function (el, props) {
	return new SoftRipple(el, props);
};

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.lightenColor = lightenColor;
var clampValue = exports.clampValue = function clampValue(val, min, max) {
	return val > max ? max : val < min ? min : val;
};

var getRandomIntFromRange = exports.getRandomIntFromRange = function getRandomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomHex = exports.getRandomHex = function getRandomHex() {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

function lightenColor(color, percent) {
	var num = parseInt(color.replace("#", ""), 16),
	    amt = Math.round(2.55 * percent),
	    R = (num >> 16) + amt,
	    B = (num >> 8 & 0x00ff) + amt,
	    G = (num & 0x0000ff) + amt;
	return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
}

/***/ })

/******/ });
//# sourceMappingURL=softripple.js.map