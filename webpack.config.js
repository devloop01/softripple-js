const path = require("path");
const config = require("./package.json");

require("dotenv").config();

const MinifyPlugin = require("babel-minify-webpack-plugin");

const PROD = process.env.NODE_ENV === "production";

let plugins = [];

PROD ? [plugins.push(new MinifyPlugin())] : "";

module.exports = {
	entry: path.resolve(__dirname, config.main),
	devtool: "source-map",
	output: {
		library: process.env.NAME,
		libraryTarget: process.env.TARGET,
		path: __dirname,
		filename: PROD ? "dist/softripple.min.js" : "dist/softripple.js",
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
		],
	},
	plugins: plugins,
	mode: process.env.NODE_ENV,
};
