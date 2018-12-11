import Vue from 'vue'
import { isIos, isGeographicLocation, isHome } from '../../config/mUtils'

export default function (enterStr) {
	if( isIos() ) return Promise.resolve({});	//如果是 ios，为了不让 ios 设备上显示 获取地理位置失败

	//如果是 Android 传进来的经纬度，直接返回，无需调用原生 api
	var position = isGeographicLocation.call(this)
	if(position){
		return Promise.resolve(position)
	}

	if( enterStr == 'rescue') return Promise.resolve({});
	if( !isHome() && enterStr !== 'rescue' ) return Promise.resolve({}); //如果不是首页，没必要获取位置

	console.log('原生定位开始')
	return new Promise((resolve, reject) => {
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

			console.log("经度为:" + x + "纬度为:" + y)
			resolve({ x, y })
		}

		function error(err) {
			var errorTypes = {
				1: "用户拒绝定位服务",
				2: "获取不到定位信息",
				3: "获取定位信息超时"
			}
			if (err.code == 2) {
				Vue.$vux.toast.text('请打开您浏览器的位置权限')
			}

			Vue.$vux.toast.text(errorTypes[err.code])
			reject(false)
		}

	}).catch(function (e) {
		// if(!e) Vue.$vux.toast.text(e)
		return e
	})
}
