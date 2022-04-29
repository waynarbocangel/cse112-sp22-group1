const path = require("path");
const html = require("html-webpack-plugin");
const cleanWebpack = require("clean-webpack-plugin");
const common = require("./webpack.common");
const merge = require("webpack-merge").merge;
const miniCSS = require("mini-css-extract-plugin");
const cssMinimizer = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
	mode: "production",
    output: {
        path: path.join(__dirname, "/prod/dist"),
        filename: "bundle.[name].[hash].js"
    },
	module: {
        rules: [
{
            test: /\.css$/,
            use: [miniCSS.loader, "css-loader"]
        }
]
    },
	optimization: {
		minimize: true,
		minimizer: ["...", new cssMinimizer()]
	},
	plugins: [
        new html({
            template: "./index.html",
			minify: {
				removeAttributeQuotes: true,
				collapseWhitespace: true,
				removeComments: true
			},
			chunks: ["index"]
        }), new html({
			filename: "login.html",
            template: "./login/login.html",
			minify: {
				removeAttributeQuotes: true,
				collapseWhitespace: true,
				removeComments: true
			},
			chunks: ["login"]
        }), new miniCSS({filename: () => "[name].[hash].css"}), new cleanWebpack.CleanWebpackPlugin()
    ]
});
