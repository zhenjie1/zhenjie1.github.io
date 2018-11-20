'use strict'
const path = require('path')
const vuxLoader = require('vux-loader')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')
const manifest = require('../vender-manifest.json')

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

var webpackConfig = {
	context: path.resolve(__dirname, '../'),
	entry: {
		app: './src/main.js'
	},
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production' ?
			config.build.assetsPublicPath :
			config.dev.assetsPublicPath
	},
	resolve: {
		modules: [ // 优化模块查找路径
			path.resolve('src'),
			path.resolve('node_modules'), // 指定node_modules所在位置 当你import 第三方模块时 直接从这个路径下搜索寻找
		],
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
		}
	},
	module: {

		rules: [{
			test: /\.vue$/,
			loader: 'vue-loader',
			options: vueLoaderConfig
		},
		{
			test: /\.js$/,
			loader: 'babel-loader?cacheDirectory',
			include: [resolve('src')],
			exclude: /node_modules/,
			// include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
		},
		{
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: utils.assetsPath('img/[name].[hash:7].[ext]')
			}
		},
		{
			test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: utils.assetsPath('media/[name].[hash:7].[ext]')
			}
		},
		{
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
			}
		}
		]
	},
	node: {
		// prevent webpack from injecting useless setImmediate polyfill because Vue
		// source contains it (although only uses it if it's native).
		setImmediate: false,
		// prevent webpack from injecting mocks to Node native modules
		// that does not make sense for the client
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	},
	plugins:[
		new webpack.DllReferencePlugin({
			manifest
		})
	]
}
module.exports = vuxLoader.merge(webpackConfig, {
	plugins: ['vux-ui']
})
