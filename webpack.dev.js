const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { commonPlugins, commonConfig } = require('./webpack.common');

module.exports = merge(commonConfig, {
	mode: 'development',
	entry: {
		app: ['./src/index.tsx'],
	},
	devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true,
		port: 3000,
		hot: true,
		open: true,
		compress: true,
	},
	plugins: [
		...commonPlugins(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.SourceMapDevToolPlugin({}),
	],   
});