const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');

exports.commonPlugins = () => ([
    new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
	new MiniCss({
		filename: "[name].css",
		chunkFilename: "[id].css"
	}),
]);

exports.commonConfig = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
		assetModuleFilename: 'assets/[name][ext]',
        publicPath: '/'
    },
    resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		alias: {
			'@src': path.resolve(__dirname, 'src'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@styles': path.resolve(__dirname, 'src/styles'),
			'@context': path.resolve(__dirname, 'src/context'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@assets': path.resolve(__dirname, 'src/assets'),
		},
	},
    module: {
        rules: [
			{
				test: /\.(png|jpe?g|gif)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test:/\.(s*)css$/,
				exclude: /node_modules/,
				use: [
					process.env.NODE_ENV === 'development' ? 'style-loader' : { loader: MiniCss.loader },
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							modules: {
								localIdentName: "[name]_[local]",
							},
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						}
					}
				]
			},
        ]
    }
};