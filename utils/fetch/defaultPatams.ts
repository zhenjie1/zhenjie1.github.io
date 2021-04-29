import as from 'utility-types'

import { isObject } from 'utils/tool'

// 将 T 中的 U 改为必填
type FetchRequired<
	T extends object,
	U extends keyof T,
	I = Required<Pick<T, U>>,
	O = Omit<T, U>
> = I & O

/**
 * 默认参数处理
 *
 * @param {Fetch.all} options fetch 传入的参数
 * @returns {FetchRequired<Fetch.all, keyof Fetch.config>} 返回 axios 可用参数
 */
export default function defaultParams(
	options: Fetch.all
): FetchRequired<Fetch.all, keyof Fetch.config> {
	const {
		method = 'post',
		data = {},
		store = true,
		file = false,
		isCode = true,
		codeErrorMessage = true,
		dataPath = 'data',
	} = options

	// get 处理
	if (method === 'get' && isObject(data)) options.params = data

	options.method = method
	options.dataPath = dataPath
	options.file = file
	options.store = store
	options.isCode = isCode
	options.codeErrorMessage = codeErrorMessage
	// 上传文件时, 修改 Content-Typ 值
	if (file) {
		options.headers['Content-Type'] =
			'application/x-www-form-urlencoded;charset=utf-8'
	}

	// 将 Fetch.config 设置为必填(已有值的状态)
	const op = options as FetchRequired<Fetch.all, keyof Fetch.config>

	return op
}
