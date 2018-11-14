import { socketUrl } from '../../config/url'

// var wsUrl = 'ws://118.25.40.163:8088'
var wsUrl = 'ws://'+ socketUrl +'/a/tjSocket'

export default function (cb) {
	var ws = new WebSocket(wsUrl)

	ws.onopen = function (evt) {
		console.log("连接成功");
		ws.send("Hello WebSockets!");
	};

	ws.onmessage = function (evt) {
		try{
			var data = typeof evt.data == 'string' ? JSON.parse(evt.data) : evt.data;
			console.log("接受的数据是: " + evt.data);
			cb(data)
		}catch(e){
			console.log('webSocket 返回的不是 JSON 格式')
		}

		// ws.close();
	};


	ws.onclose = function (evt) {
		console.log("断开连接");
	};
}
