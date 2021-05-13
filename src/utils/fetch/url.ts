import { isDev } from 'utils/index'

export default function ajaxUrl(type: 'ws' | 'ajax'): string {
	const { host, protocol } = location
	const onlineUrl = `${protocol}//${host}`

	const urlKey = getQueryString('url')

	const urls: { [key: string]: [string, string] | undefined } = {
		ww: ['http://192.168.3.110:9811', 'guitang.com'],
		gt: ['http://192.168.3.3:9811', 'guitang.com'],
		ysx: ['https://sg2.nztos.com', 'https://sg2.nztos.com'],
	}

	if (urlKey) {
		const index: 0 | 1 = type === 'ajax' ? 0 : 1

		if (urls[urlKey]) {
			return urls[urlKey]![index]
		}
	}

	return onlineUrl
}

/**
 * 获取地址栏的参数
 *
 * @param {string} key 参数名
 * @returns {string|undefined} 返回 null 或 获取的参数
 */
export function getQueryString(key: string): string {
	let search = location.search

	if (search) search = search.replace('?', '')

	const param = search.match(new RegExp(`${key}=([^&]*)`))

	if (param) return param[1]

	return ''
}
