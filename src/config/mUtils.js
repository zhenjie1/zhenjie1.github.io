import Vue from 'vue'
// console.log(Vue)
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
	for(let i in data){
		if(i == 'user'){
			for(let j in data[i]){
				obj[j] = data[i][j]
			}
		}else{
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
