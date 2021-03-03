// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const rootPath = path.resolve(__dirname, '..')

module.exports = {
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			mynode: path.resolve(__dirname, '../electron/crypto.node'),
		},
	},
	devtool: 'source-map',
	entry: path.resolve(rootPath, 'electron', 'main.ts'),
	target: 'electron-main',
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
				},
			},
			{
				test: /\.node$/,
				use: 'node-loader',
			},
		],
	},
	node: {
		__dirname: false,
	},
	output: {
		path: path.resolve(rootPath, 'dist'),
		filename: '[name].js',
	},
}
