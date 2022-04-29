const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
		"index.js": "./index.js",
		"login.js": "./login/login.js"
	},
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(otf|svg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "resources"
                    }
                }
            }
        ]
    },
	plugins: [
		new CopyPlugin({
            patterns: [
              { from: "./localStorage/pouchdb-7.2.1.min.js" },

            ],
          }),
	]
}