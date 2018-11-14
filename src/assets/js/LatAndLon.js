import Vue from 'vue'
export default new Promise( (resolve, reject) => {
	if (!navigator.geolocation) {
		alert("你的浏览器不支持定位，无法获取到您的位置！");
	} else {
		getCurrentPosition();
	}

	function getCurrentPosition() {
		var options = {
			enableHighAccuracy: true,
			timeout: 60000,
			maximumAge: 60000
		}
		navigator.geolocation.getCurrentPosition(success, error, options)
	}

	function success(position) {
		var x = position.coords.longitude;
		var y = position.coords.latitude;
		// alert("经度为:" + x + "纬度为:" + y);
		resolve({x,y})
	}

	function error(err) {
		var errorTypes = {
			1: "用户拒绝定位服务",
			2: "获取不到定位信息",
			3: "获取定位信息超时"
		}
		if(err.code == 2) {
			// alert('请打开您浏览器的位置权限')
		}
		reject(errorTypes[err.code])
	}

}).catch(function(e){
	Vue.$vux.toast.text(e)
	return e
})
