import { socketUrl } from '../../config/url'
import { uploadOrderStatus } from './orders'

var wsUrl = 'ws://' + socketUrl + '/a/tjSocket'

// window.ws = undefined;
export default function connectionSocket(cb) {
	window.socket = new WebSocket(wsUrl)

	socket.onopen = function (data) {
		console.log("连接成功");
	};

	socket.onmessage = function (data) {
		var data = typeof data.data == 'string' ? JSON.parse(data.data) : data.data;

		if(data.type == '120') uploadOrderStatus(data)

		cb && cb(data)
	};

	// socket.onclose = function (data) {
	// 	console.log("断开连接");
	// };

	socket.onerror = function (err) {
		setTimeout(connectionSocket, 2000)//设置延迟时间，防止死循环
	}
}

