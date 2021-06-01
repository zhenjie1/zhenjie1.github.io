import { tokenKey } from '@/assets/js/keys'
import Cookie from 'js-cookie'
import { isObject } from 'lodash'
import ajaxUrl from './url'

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
		storePath = false,
		timeout = 1 * 60 * 1000,
		headers = {},
		file = false,
		token = true,
		isCode = true,
		baseURL = ajaxUrl('ajax') + '/product',
		codeErrorMessage = true,
		dataPath = 'data',
	} = options

	// get 处理
	if (method === 'get' && isObject(data)) options.params = data

	options.baseURL = baseURL
	options.method = method
	options.dataPath = dataPath
	options.token = token
	options.file = file
	options.storePath = storePath
	options.isCode = isCode
	options.codeErrorMessage = codeErrorMessage
	options.headers = headers
	options.timeout = timeout

	// 上传文件时, 修改 Content-Typ 值
	if (file) {
		options.headers['Content-Type'] =
			'application/x-www-form-urlencoded;charset=utf-8'
	}

	const accesstoken = Cookie.get(tokenKey.access)
	if (accesstoken) options.headers.accesstoken = accesstoken

	// 将 Fetch.config 设置为必填(已有值的状态)
	const op = options as FetchRequired<Fetch.all, keyof Fetch.config>

	return op
}
