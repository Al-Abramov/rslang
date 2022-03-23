const { merge } = require('webpack-merge');
const { commonPlugins, commonConfig } = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: 'production',
    output: {
        publicPath: './'
    },
    entry: {
        app: ['./src/index.tsx'],
    },
    plugins: [
        ...commonPlugins(),
    ],
});