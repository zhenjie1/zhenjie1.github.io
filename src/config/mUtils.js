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
export const isGeographicLocation = function() { //此方法不能使用箭头函数，因为调用的地方使用了 call(this)
	var posQquery = window.location.href.split('#')[1];
	if (posQquery.indexOf("?") === -1) return false;

	var position = {};
	var q = posQquery.split('?')[1].split('&')

	q.forEach(v => position[v.split('=')[0]] = v.split('=')[1])

	if( !position.Longitude || !position.Latitude  ) return false

	this.$store.dispatch('setGeographicLocation', position)	//保存位置
	return position

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
	return Object.assign(newObj,oldObj)
}

export const titleConfig = ( to ) => {
	// console.log(to)
	const path = to.path

	const reloadHide = []
	const returnHide = ['/user/personal','/user/home']
	const titleHide = ['/user/login','/user/agree.?']

	let title = {
		text: to.meta.title,		//标题文字
		reloadIsShow: true,	//是否显示刷新按钮
		returnIsShow: true,	//是否显示返回按钮
		isShow: true,	//是否显示标题
	}
	reloadHide.map( v => {
		var reg = new RegExp('^' + v + '$')
		if( reg.test(path) ) title.reloadIsShow = false
	})
	returnHide.map( v => {
		var reg = new RegExp('^' + v + '$')
		if( reg.test(path) ) title.returnIsShow = false
	})
	titleHide.map( v => {
		var reg = new RegExp('^' + v + '$')
		if( reg.test(path) ) title.isShow = false
	})
	return title
}
