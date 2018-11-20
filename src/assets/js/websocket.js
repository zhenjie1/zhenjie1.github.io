import { socketUrl } from '../../config/url'
var wsUrl = 'ws://' + socketUrl + '/a/tjSocket'

export default function (cb) {
	var ws = new WebSocket(wsUrl)

	ws.onopen = function (evt) {
		console.log("连接成功");
		ws.send("Hello WebSockets!");
	};

	ws.onmessage = function (evt) {
		var data = typeof evt.data == 'string' ? JSON.parse(evt.data) : evt.data;

		cb(data)
	};


	ws.onclose = function (evt) {
		console.log("断开连接");
	};
}