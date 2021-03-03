// import { app, BrowserWindow } from 'electron'
// import { isDev } from '../utils/index'

const { app, BrowserWindow } = require('electron')
// const { isDev } = require('../utils/index.ts')

app.whenReady().then(() => {
	const win = new BrowserWindow({
		width: 1000,
		height: 800,
		minWidth: 960,
		minHeight: 500,
		frame: false,
		titleBarStyle: 'hidden',
		transparent: true,
		vibrancy: 'dark',
		webPreferences: {
			enableRemoteModule: true, // 设置为 true, 渲染进程才能使用 remote
			nodeIntegration: true,
			experimentalFeatures: true,
		},
	})

	// const child = new BrowserWindow({
	// 	width: 300,
	// 	height: 300,
	// 	parent: win,
	// })
	// child.show()
	// win.show()
	// win.setBrowserView(child)
	// child.setBounds({
	// 	x: 0,
	// 	y: -100,
	// 	width: 500,
	// 	height: 400,
	// })
	// child.webContents.loadURL('https://electronjs.org')

	win.loadURL('http://localhost:3000')
	// if (isDev) {
	// } else {
	// 	console.warn('生产环境!!!!')
	// }
})
