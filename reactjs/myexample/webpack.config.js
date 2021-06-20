const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcDir = path.resolve(__dirname, './src');
const publicDir = path.resolve(__dirname, './public');

module.exports = {
	name: 'myexample',
	mode: 'development',
	entry: './src/index.js',
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
				test: /\.(png|jpe?g|gif|ico|svg|ttf|eot|woff|woff2)$/i,
				exclude: /node_modules/,
				use: 'file-loader?name=[name].[ext]',
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
			template: 'public/index.html',
		})
	],
	devServer: {
		host: '172.16.0.14',
		port: 8889,
		open: true,
		disableHostCheck: true
	},
	output: {
	    filename: 'bundle.[hash].js'
	}
};
