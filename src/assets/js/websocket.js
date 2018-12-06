import { socketUrl } from '../../config/url'
var wsUrl = 'ws://' + socketUrl + '/a/tjSocket'

// window.ws = undefined;
export default function connectionSocket(cb) {
	window.socket = new WebSocket(wsUrl)

	socket.onopen = function (evt) {
		console.log("连接成功");
	};

	socket.onmessage = function (evt) {
		var data = typeof evt.data == 'string' ? JSON.parse(evt.data) : evt.data;

		cb && cb(data)
	};


	// socket.onclose = function (evt) {
	// 	console.log("断开连接");
	// 	setTimeout(connectionSocket, 2000)//设置延迟时间，防止死循环
	// };

	socket.onerror = function (err) {
		setTimeout(connectionSocket, 2000)//设置延迟时间，防止死循环
		// socket.onclose()
	}
}

// export socket;
