module.exports = async () => ({
    "verbose": true,
    "rootDir": "./__tests__",
    "transform": {
		"\\.[jt]sx?$": "babel-jest"
	},
	"globals": {
		"window": {
			"location": {
				"hostname": "localhost:8080"
			}
		}
	}
});