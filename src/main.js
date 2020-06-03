"use strict";

import Ripple from "./Ripple.js";
import { convertToArray } from "./utils.js";

class SoftRipple {
	constructor(els, props = {}) {
		this.els = convertToArray(els);
		this.props = props;

		this.init();
	}

	init() {
		for (let i = 0; i < this.els.length; i++) {
			const el = this.els[i];
			new Ripple(el, this.props);
		}
	}
}

module.exports = (el, props) => {
	return new SoftRipple(el, props);
};
