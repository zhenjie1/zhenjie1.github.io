import store from '../store/index';
// console.log(ss)
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	try {
		return JSON.parse(window.localStorage.getItem(name));
	} catch (e) {
		return window.localStorage.getItem(name)
	}
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

/*
*身份证掩码
*/
export const plusXing = (str, frontLen, endLen) => {
	var len = str.length - frontLen - endLen;
	var xing = '';
	for (var i = 0; i < len; i++) {
		xing += '*';
	}
	return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}

/*
*登录后-处理返回的值
*/
export const loginReturnVal = (data) => {
	var obj = {}
	for (let i in data) {
		if (i == 'user') {
			for (let j in data[i]) {
				obj[j] = data[i][j]
			}
		} else {
			obj[i] = data[i]
		}
	}
	return obj
}


/*
* 判断设备
*/
export const isIos = () => {
	var u = navigator.userAgent;
	// u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //Android
	return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);//ios
}

/*
* 判断是否登录
*/
export const isLogin = function () { //此方法不能使用箭头函数，因为调用的地方使用了 call(this)
	return this.userInfo && JSON.stringify(this.userInfo) !== '{}'
}

/*
* 判断首页是否有经纬度参数，有则保存到vuex中
*/
export const isGeographicLocation = function () { //此方法不能使用箭头函数，因为调用的地方使用了 call(this)
	var query = this.$route.query;
	var isRetuen = JSON.stringify(query) === '{}' || query.Latitude == undefined || query.Longitude == undefined;
	if (isRetuen) return false;

	this.$store.dispatch('setGeographicLocation', query)	//保存位置
	return query
}

/*
* 判断是不是首页
*/
export const isHome = () => {
	var url = window.location.href.split('#')[1].split('?')[0];
	return /home$/.test(url)
}


// 数据合并
export const mergeObj = (newObj, oldObj) => {
	return Object.assign(newObj, oldObj)
}

export const titleConfig = (to) => {
	console.log(to)
	const path = to.path

	const reloadHide = []
	const returnHide = ['/user/personal', '/user/home']
	const titleHide = ['/user/login', '/user/agree.?']

	const simpleTheme = ['/rescue/map','/user/insuranceList/insuranceDet']

	let title = {
		text: to.meta.title,		//标题文字
		reloadIsShow: true,	//是否显示刷新按钮
		returnIsShow: true,	//是否显示返回按钮
		isShow: true,	//是否显示标题
		theme: ''
	}
	reloadHide.map(v => {
		var reg = new RegExp('^' + v + '$')
		if (reg.test(path)) title.reloadIsShow = false
	})
	returnHide.map(v => {
		var reg = new RegExp('^' + v + '$')
		if (reg.test(path)) title.returnIsShow = false
	})
	titleHide.map(v => {
		var reg = new RegExp('^' + v + '$')
		if (reg.test(path)) title.isShow = false
	})
	simpleTheme.map(v => {
		var reg = new RegExp('^' + v)
		if (reg.test(path)) title.theme = 'simple'
	})
	return title
}

//定时器开启，把救援端的经纬度传给后台，后台上传到百度
//this 环境是 Vue 实例
var setInterUploadFn, setInterSendPointFn;
export const setInterUploadLatitudeLongitude = function (id) {
	var rescusPositioonPoint_list = [];
	var [collection, upload] = [5000, 30000];// 5秒采集一次， 30秒上传一次

	uploadLatitudeLongitude(id, rescusPositioonPoint_list)
	setInterUploadFn = setInterval(() => uploadLatitudeLongitude(id, rescusPositioonPoint_list), collection);

	setInterSendPointFn = setInterval(() => {
		socket.send(JSON.stringify(rescusPositioonPoint_list))
		rescusPositioonPoint_list = [];
	}, upload);
}

export const clearUploadPointInter = function(){
	clearInterval(setInterUploadFn);
	clearInterval(setInterSendPointFn);
}
//websocket 推送 给服务器
function uploadLatitudeLongitude(id, pointSaveArr) {
	let latLon = store.state.geographicLocation;
	pointSaveArr.push({
		latitude: latLon.Latitude,
		longitude: latLon.Longitude,
		entity_name: id,
		loc_time: parseInt(new Date().getTime() / 1000),
		coord_type_input: 'wgs84'
	})

	// try {
	// 	socket.send(JSON.stringify(pointSaveArr))
	// } catch (err) {

	// }
}

export const sendJsonp = function (url, data, cbFunName) {
	let script = document.createElement("script");
	var query = '?';
	for (let i in data) {
		query += i + '=' + data[i] + '&'
	}
	query += 'callback=' + cbFunName
	// console.log(query)
	script.src = url + query;
	document.body.appendChild(script);
}
