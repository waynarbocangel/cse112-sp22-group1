const path = require("path");
const html = require("html-webpack-plugin");
const common = require("./webpack.common");
const merge = require("webpack-merge").merge;
const miniCSS = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const chokidar = require("chokidar");

/* eslint-disable */
module.exports = merge(common, {
	entry: {
		"componentTesting": "./testers.js"
	},
	mode: "development",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.[name].js"
    },
    module: {
        rules: [
			{
				test: /\.css$/,
				use: [miniCSS.loader, "css-loader"]
			}
		]
    },
	plugins: [
        new html({
            template: "./index.html",
			chunks: ["index"]
        }), new html({
			filename: "login.html",
            template: "./login/login.html",
			chunks: ["login"]
        }), new html({
			filename: "testers.html",
            template: "./testers.html",
			chunks: ["componentTesting"]
        }), new miniCSS({filename: () => "[name].css"}), new CopyPlugin({
            patterns: [{ from: "./components/*.css", to: "[name].css", info: { minified: false } }]
        })
    ],
	devServer: {
		onBeforeSetupMiddleware (server) {
			chokidar.watch(["./components/*.css"]).on("all", () => {
				for (const ws of server.webSocketServer.clients) {
					ws.send("{\"type\": \"static-changed\"}")
				}
			});
		},
		historyApiFallback: {
			rewrites: [{from: /^\/login/, to: "/login.html"}, {from: /^\/testing/, to: "/testers.html"}]
		}
	}
});
/* eslint-enable */
