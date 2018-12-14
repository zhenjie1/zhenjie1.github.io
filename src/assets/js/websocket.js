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

		if(data.type == '120') uploadOrderStatus(data)	//type：120 更新订单状态
		if(data.type == '130') {
			var retData = JSON.parse(data.message)
			if(retData.status != 0){
				console.log('上传未成功，', retData)
			}
		}	//type：130 救援人员通过socket推送经纬度，百度返回的数据

		cb && cb(data)
	};

	socket.onclose = function (data) {
		console.log("断开连接");
	};

	socket.onerror = function (err) {
		setTimeout(connectionSocket, 2000)//设置延迟时间，防止死循环
	}
}

