// 监听消息
onmessage = function (evt) {
	// 工作线程收到主线程的消息
};
let msg = '工作线程向主线程发送消息'
postMessage(msg);
