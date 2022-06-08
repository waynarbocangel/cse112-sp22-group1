// Babel.config.js
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    browsers: ">2%"
                }
            }
        ]
    ],
    plugins: [
        [
            "@babel/plugin-transform-react-jsx"
        ]
    ]
};
