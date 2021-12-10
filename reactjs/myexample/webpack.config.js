const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcDir = path.resolve(__dirname, './src');
const publicDir = path.resolve(__dirname, './public');

module.exports = {
	name: 'myexample',
	mode: 'development',
	entry: './src',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader'
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
	devServer: {
		contentBase: __dirname + '/public',
		host: '0.0.0.0',
		port: 8889,
		open: true,
		hot: true,
		disableHostCheck: true,
		historyApiFallback: true,
	},
	output: {
	    filename: 'index.js',
	    path: __dirname + '/public',
		publicPath: __dirname + '/public'
	}
};
