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