const path = require('path');
const webpackc = require('webpack')

module.exports = {
	entry:{
		vender:['vue','vuex','vue-router','axios']
	},
	output:{
		path: path.join(__dirname, '../static'),
		filename: 'dll.[name].js',
		library: '[name]'
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, '../', '[name]-manifest.json'),
			name: '[name]'
		})
	]
}
//主分支
//分支
