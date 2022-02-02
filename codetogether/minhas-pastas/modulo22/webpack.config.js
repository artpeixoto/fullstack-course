const path = require('path')
const HtmlWebpack = requre('html-webpack-plugin');
const HtmlWebpack = require('html-webpakc-plugin');
module.exports = {
		  entry: './src/index.js'
		  , output: {
					 filename: 'main.js',
					 path: path.resolve(__dirname, "./dist/");
		  }
		  , plugins: [
					 new HtmlWebpack ({
								filename: 'index.html'
								, template: './src/index.html'
					 })
		  ]
}

