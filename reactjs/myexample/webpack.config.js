const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcDir = path.resolve(__dirname, './src');
const ENTRY_FILE = path.resolve(__dirname, "src", "index.js");
const publicDir = path.resolve(__dirname, './public');

module.exports = {
	name: 'blogApp',
	mode: 'development',
	entry: ENTRY_FILE,
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
		    {
				test: /\.(css|scss)$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
		    },
		    {
				test: /\.sass$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
		    },
			{
				test: /\.(png|jpe?g|gif|svg|ttf|eot|woff|woff2)$/i,
				exclude: /node_modules/,
				use: 'file-loader',
			}
		]
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
	    },
		extensions: ['.js', '.jsx', '.css', 'scss']
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: publicDir + '/index.html',
			filename: './index.html'
		})
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		host: "0.0.0.0",
		port: 8889
	},
	output: {
		path: path.join(__dirname, 'dist'),
	    filename: 'index.js'
	}
};
