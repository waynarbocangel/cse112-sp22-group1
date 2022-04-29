const path = require("path");
const html = require("html-webpack-plugin");
const common = require("./webpack.common");
const merge = require("webpack-merge").merge;
const miniCSS = require("mini-css-extract-plugin");

module.exports = merge(common, {
	mode: "development",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.[name].js"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [miniCSS.loader, "css-loader"]
        }]
    },
	plugins: [
        new html({
            template: "./index.html"
        }),
		new html({
			filename: "login.html",
            template: "./login/login.html"
        }),
		new miniCSS({filename: "main.css"})
    ]
});