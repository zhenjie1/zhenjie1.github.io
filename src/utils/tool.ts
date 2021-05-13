/**
 * 判断是不是开发环境
 *
 * @returns {boolean} 返回是不是开发环境
 */
export const isDev = process.env.NODE_ENV === 'development'

// 是否是对象类型
export const isObject = (val: any): val is Record<string, any> =>
	val !== null && typeof val === 'object'

// 是否是 FormData 类型
export const isFormData = (val: any): val is FormData => val instanceof FormData

// 是不是不存在的值
export const isEmpty = (val: any) => [null, undefined].includes(val)

// json 转换
export function JSONToStr(obj: object) {
	return JSON.parse(JSON.stringify(obj))
}

// string 转 json 对象
export function strToJson(str: any): Record<string, any> {
	if (typeof str !== 'string') return str

	try {
		return JSON.parse(str)
	} catch {
		return str as any as Record<string, any>
	}
}

// string | object 深度转为 object 对象
export function strToJsonDeep(val: Record<string, any> | string): any {
	if (!isObject(val)) return strToJson(val)

	for (const i in val) {
		const item = val[i]
		if (i === 'uin') val[i] = parseInt(item)
		else if (isObject(item)) strToJsonDeep(item)
		else if (typeof item === 'string') val[i] = strToJson(item)
	}
	return val
}

/**
 * 创建一个 script 脚本
 * 会自动检查是否已经注入过相同的脚本了
 *
 * @param {string} url 要添加的脚本地址
 * @returns {Promise} 返回是否注入脚本成功
 */
export function addScript(url: string) {
	return new Promise((resolve, reject) => {
		const script = Array.from(document.getElementsByTagName('script'))
		const targetScript = script.find((el) => {
			const src = el.getAttribute('src')
			if (src === url) return true
			return false
		})

		// 已经引入过了
		if (targetScript) return resolve('')

		const scriptEl = document.createElement('script')
		scriptEl.src = url

		scriptEl.onload = function () {
			resolve('')
		}

		scriptEl.onerror = function (e) {
			console.error(e)
			debugger
			reject(e)
		}

		document.head.appendChild(scriptEl)
	})
}
