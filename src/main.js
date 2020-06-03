"use strict";

class SoftRipple {
	constructor(el, props = {}) {
		this.el = el;
		this.props = props;

		this.init();
	}

	init() {
		this.elBox = this.el.getBoundingClientRect();
		this.ripples = [];
		this.rippleProps = {
			rippleColor:
				this.props.rippleColor ||
				window.getComputedStyle(this.el).getPropertyValue("background-color"),
			transitionDuration:
				this.clampValue(this.props.transitionDuration, 0.4, Infinity) || 0.8,
			rippleWidth: this.clampValue(this.props.rippleWidth, 2, 8) || 4,
			rippleMaxSize: this.clampValue(this.props.rippleMaxSize, 50, 200) || 100,
		};

		this.el.style.position = "relative";
		this.el.style.overflow = "hidden";

		this.addRippleStyles();
		this.addListeners();
	}

	addRipple(e) {
		const x = e.x - this.elBox.left;
		const y = e.y - this.elBox.top;
		const rippleEl = document.createElement("div");
		rippleEl.id = "ripple";
		rippleEl.style.left = `${x}px`;
		rippleEl.style.top = `${y}px`;

		rippleEl.innerHTML = this.returnCompleteSVG();

		this.el.appendChild(rippleEl);
		this.ripples.push(rippleEl);
		this.removeRipple(rippleEl, this.rippleProps.transitionDuration * 1000);
	}

	returnCompleteSVG() {
		return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" id="ripple-svg"> <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur in="SourceGraphic" stdDeviation="4" /></filter><filter id="shadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="7" dy="3" stdDeviation="2" flood-color="${this.lightenColor(
			this.rippleProps.rippleColor,
			-40
		)}" flood-opacity="0.2" /><feDropShadow dx="-2" dy="-4" stdDeviation="1" flood-color="${this.lightenColor(
			this.rippleProps.rippleColor,
			20
		)}" flood-opacity="0.2" /><feDropShadow dx="3" dy="3" stdDeviation=".6" flood-color="${this.lightenColor(
			this.rippleProps.rippleColor,
			-10
		)}" flood-opacity="0.2" /><feDropShadow dx="3" dy="3" stdDeviation=".6" flood-color="${this.lightenColor(
			this.rippleProps.rippleColor,
			-10
		)}" flood-opacity="0.2" /></filter><g filter="url(#shadow)"><circle cx="50" cy="50" r="30" fill="none" stroke="${
			this.rippleProps.rippleColor
		}" stroke-width="${this.rippleProps.rippleWidth}" filter="url(#blur)" /></g></svg>`;
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
			#ripple { --size: ${this.rippleProps.rippleMaxSize}px; position: absolute; transform: translate(-50%, -50%); width: var(--size); height: var(--size); border-radius: 50%; overflow: hidden; animation: scale-up ${this.rippleProps.transitionDuration}s ease forwards;}
		`);
		this.style.sheet.insertRule(`
			#ripple svg { width: var(--size);height: var(--size);}
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

	clampValue(val, min, max) {
		return val > max ? max : val < min ? min : val;
	}

	lightenColor(color, percent) {
		var num = parseInt(color.replace("#", ""), 16),
			amt = Math.round(2.55 * percent),
			R = (num >> 16) + amt,
			B = ((num >> 8) & 0x00ff) + amt,
			G = (num & 0x0000ff) + amt;
		return (
			"#" +
			(
				0x1000000 +
				(R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
				(B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
				(G < 255 ? (G < 1 ? 0 : G) : 255)
			)
				.toString(16)
				.slice(1)
		);
	}
}

module.exports = (el, props) => {
	return new SoftRipple(el, props);
};
