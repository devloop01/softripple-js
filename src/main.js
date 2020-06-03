"use strict";

import { clampValue, lightenColor, getRandomIntFromRange, getRandomHex } from "./utils.js";

class SoftRipple {
	constructor(el, props = {}) {
		this.el = el;
		this.props = props;

		this.init();
	}

	init() {
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
			rippleColor:
				this.props.rippleColor ||
				window.getComputedStyle(this.el).getPropertyValue("background-color"),
			transitionDuration:
				clampValue(
					this.props.transitionDuration,
					this.transitionDurationMin,
					this.transitionDurationMax
				) || this.transitionDurationDefault,
			rippleWidth:
				clampValue(this.props.rippleWidth, this.rippleWidthMin, this.rippleWidthMax) ||
				this.rippleWidthDefault,
			rippleMaxSize:
				clampValue(this.props.rippleMaxSize, this.rippleSizeMin, this.rippleSizeMax) ||
				this.rippleSizeDefault,
			randomSize: this.props.randomSize || false,
			randomColor: this.props.randomColor || false,
		};

		this.el.style.position = "relative";
		this.el.style.overflow = "hidden";

		this.addRippleStyles();
		this.addListeners();
	}

	addRipple(e) {
		const x = e.x - this.elBox.left;
		const y = e.y - this.elBox.top;
		const rippleSize =
			this.rippleProps.randomSize != true
				? this.rippleProps.rippleMaxSize
				: getRandomIntFromRange(this.rippleSizeMin, this.rippleProps.rippleMaxSize);
		const rippleEl = document.createElement("div");
		rippleEl.id = "ripple";
		rippleEl.style.left = `${x}px`;
		rippleEl.style.top = `${y}px`;
		rippleEl.style.width = `${rippleSize}px`;
		rippleEl.style.height = `${rippleSize}px`;

		rippleEl.innerHTML = this.returnCompleteSVG();

		this.el.appendChild(rippleEl);
		this.ripples.push(rippleEl);
		this.removeRipple(rippleEl, this.rippleProps.transitionDuration * 1000);
	}

	returnCompleteSVG() {
		const rippleWidth =
			this.rippleProps.randomSize != true
				? this.rippleProps.rippleWidth
				: getRandomIntFromRange(this.rippleWidthMin, this.rippleWidthMax);
		const rippleColor =
			this.rippleProps.randomColor != true ? this.rippleProps.rippleColor : getRandomHex();

		return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" id="ripple-svg"> <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur in="SourceGraphic" stdDeviation="4" /></filter><filter id="shadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="7" dy="3" stdDeviation="2" flood-color="${lightenColor(
			rippleColor,
			-40
		)}" flood-opacity="0.2" /><feDropShadow dx="-2" dy="-4" stdDeviation="1" flood-color="${lightenColor(
			rippleColor,
			20
		)}" flood-opacity="0.2" /><feDropShadow dx="3" dy="3" stdDeviation=".6" flood-color="${lightenColor(
			rippleColor,
			-10
		)}" flood-opacity="0.2" /><feDropShadow dx="3" dy="3" stdDeviation=".6" flood-color="${lightenColor(
			rippleColor,
			-10
		)}" flood-opacity="0.2" /></filter><g filter="url(#shadow)"><circle cx="50" cy="50" r="30" fill="none" stroke="${rippleColor}" stroke-width="${rippleWidth}" filter="url(#blur)" /></g></svg>`;
	}

	removeRipple(ripple, delay) {
		let t = setTimeout(() => {
			this.el.removeChild(ripple);
			this.ripples.splice(this.ripples.indexOf(ripple), 1);
			clearTimeout(t);
		}, delay);
	}

	addRippleStyles() {
		this.style = document.createElement("style");
		document.head.appendChild(this.style);
		this.style.sheet.insertRule(`
			#ripple {  position: absolute; transform: translate(-50%, -50%); width: 100%; height: 100%; border-radius: 50%; overflow: hidden; animation: scale-up ${this.rippleProps.transitionDuration}s ease forwards;}
		`);
		this.style.sheet.insertRule(`
			#ripple svg { width: 100%; height: 100%;}
		`);

		this.style.sheet.insertRule(
			`
			@keyframes scale-up {
				from {
					opacity: 1;
					transform: translate(-50%, -50%) scale(0);
				}
				to {
					opacity: 0;
					transform: translate(-50%, -50%) scale(1);
				}
			}		
			`
		);
	}

	addListeners() {
		this.el.addEventListener("pointerdown", this.addRipple.bind(this));
		window.addEventListener("resize", () => {
			this.elBox = this.el.getBoundingClientRect();
		});
	}
}

module.exports = (el, props) => {
	return new SoftRipple(el, props);
};
