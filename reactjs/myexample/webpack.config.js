const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcDir = path.resolve(__dirname, './src');
const publicDir = path.resolve(__dirname, './public');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	name: 'myexample',
	entry: './src/index.js',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env',"@babel/preset-react"],
						plugins: ['react-refresh/babel']
					}
				}
			},
			{
				test: /\.(css|scss)$/,
//				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.sass$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|ico|svg|ttf|eot|woff|woff2)$/i,
				exclude: /node_modules/,
				use: 'file-loader',
//				use: 'file-loader?name=[name].[ext]',
			}
		]
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		},
		extensions: ['.js', '.jsx', '.css', 'scss']
	},
	/*
	plugins: [
		// public/index.html write contents for laoding index.js 
		new HtmlWebpackPlugin()
	],
	*/
	plugins : [
		new webpack.HotModuleReplacementPlugin(),
		new RefreshWebpackPlugin()
	],
	devServer: {
		contentBase: __dirname + '/public/',
		host: '0.0.0.0',
		port: '8080',
		open: true,
		hot: true,
		inline: true,
		disableHostCheck: true,
		historyApiFallback: true,
	},
	output: {
		filename: 'index.js',
		path: __dirname + '/public/',
		//publicPath: __dirname + '/public/'
	}
};
