/*这段代码是固定的，必须要放到js中*/
function setupWebViewJavascriptBridge(callback) {
	// console.log(!!window.WebViewJavascriptBridge)
	// console.log(!!window.WVJBCallbacks)

	if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
	if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'https://__bridge_loaded__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
}


export default function ( url ) {
	console.log(bridge)
	bridge.shareInAndroid( title, content, icon, url );
	// console.log(android)
	// setupWebViewJavascriptBridge(function (bridge) {
	// 	bridge.registerHandler('registerAction', function(data, responseCallback) {
	// 		var responseData = { 'result': 'handle success' }
	// 		responseCallback(responseData)
	// 	});
	// 	console.log('调用成功')
	// })
}
