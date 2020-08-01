const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = (exp) => (isProd ? `bundle.[hash].${exp}` : `bundle.${exp}`);
const jsLoaders = () => {
	const loaders = [
		{
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
				plugins: [
					['@babel/plugin-proposal-class-properties', {loose: true}],
				],
				// plugins: ['@babel/plugin-proposal-class-properties'],
			},
		},
	];

	if (isDev) {
		loaders.push('eslint-loader');
	}

	return loaders;
};

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: ['@babel/polyfill', './js/main.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: filename('js'),
	},
	resolve: {
		extensions: ['.js'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@core': path.resolve(__dirname, 'src/core'),
		},
	},
	devtool: isDev ? 'source-map' : false,
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		port: 3000,
		hot: isDev,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.html',
			minify: {
				collapseWhitespace: isProd,
				removeComments: isProd,
			},
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/favicon.ico'),
					to: path.resolve(__dirname, 'dist'),
				},
			],
		}),
		new MiniCssExtractPlugin({
			filename: filename('css'),
		}),
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: isDev,
							reloadAll: true,
						},
					},
					'css-loader', // translates CSS into CommonJS
					'sass-loader', // compiles Sass to CSS
				],
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: jsLoaders(),
			},
		],
	},
};
