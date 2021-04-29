// import { io } from 'socket.io-client'
// import * as parseuri from 'parseuri'

// console.log(parseuri('ws://192.168.3.43:9090?url=123'))

// const token =
// 	'qulv eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtemoxMjMiLCJqdGkiOiI3MzAiLCJpYXQiOjE2MTk1Nzc4MDMsImV4cCI6MTYxOTU3OTYwM30.OrowKsvMtI3es-q6GgD-0xo1_4K5_84zuqeYJcBPyCY'

// const socket = io('ws://192.168.3.184:2021', {
// 	transports: ['websocket'],
// 	path: '/',
// 	autoConnect: true,
// 	withCredentials: false,
// 	query: {
// 		// accessToken: token,
// 		// randomStr: '06889421488611358',
// 	},
// })

// socket.on('connect', () => {
// 	console.log('connect', socket.id)
// })

// socket.on('connect_error', () => {
// 	console.log('connect_error', socket.id)
// })

// // socket.on('message', (data) => {
// // 	console.log('message', data)
// // })

// // setTimeout(() => {
// // 	socket.emit('message', 123321)
// // }, 1000)

// // console.log(socket)
