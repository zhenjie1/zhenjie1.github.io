import { stringify } from 'qs'

import { Fetch } from 'typings/fetchType'
/**
 * 默认参数处理
 *
 * @param {FetchParams} options fetch 传入的参数
 * @returns {AxiosRequestConfig} 返回 axios 可用参数
 */
export default function defaultParams(options: Fetch.all) {
	let { url } = options
	const {
		method = 'post',
		body = JSON.stringify(options.body),
		headers = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
		},

		file = false,
		isCode = true,
		dataPath = 'data',
		credentials = 'same-origin',
	} = options
	if (method === 'get') url = `${url}?${stringify(body)}`

	if (file) headers['Content-Type'] = 'application/json;charset=UTF-8'

	// 默认值, 用这种方式是为了把初始值在 options 上修改
	// if (!options.data) options.data = {}
	// if (!method) options.method = 'post'
	// if (isEmpty(dataPath)) options.dataPath = 'data'
	// if (responseType) options.responseType = 'json'
	// if (isEmpty(file)) options.file = false
	// if (typeof onUploadProgress !== 'function') options.onUploadProgress = () => {}
	// if (isEmpty(isCode)) options.isCode = true

	// get 请求方式,参数处理
	// if (method === 'get' && Object.keys(data).length > 0) {
	// 	url = options.url = `${options.url}?${Qs.stringify(data)}`
	// }

	// 上传文件时, 修改 Content-Typ 值
	// if (file) {
	// 	const fileContentType = 'application/x-www-form-urlencoded;charset=utf-8'
	// 	headers['Content-Type'] = fileContentType
	// }

	// 传给 axios 的

	const config: Fetch.all = {
		url,
		method,
		body: body as any,
		headers,

		file,
		isCode,
		dataPath,
		credentials,
	}

	return config
}
