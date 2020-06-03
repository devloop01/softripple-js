export const clampValue = (val, min, max) => (val > max ? max : val < min ? min : val);

export const getRandomIntFromRange = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomHex = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export function convertToArray(input) {
	if (NodeList.prototype.isPrototypeOf(input)) return [...input];
	else if (Array.isArray(input)) return input;
	else return [input];
}

export function lightenColor(color, percent) {
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
