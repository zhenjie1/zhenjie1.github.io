import { isDev } from "utils/index"

export default function ajaxUrl(key: string): string {
	const urlKey = getQueryString(key)
	const suffix = '/product'

	const { host, protocol } = location

	if (!urlKey) return isDev ? `https://nztos.com${suffix}` : `${protocol}//${host}${suffix}`

	const urls: { [key: string]: string | undefined } = {
		ww: 'http://192.168.3.110:9811',
		gt: 'http://192.168.3.3:9811',
		ysx: 'https://sg2.nztos.com',
	}

	return urls[urlKey] ? urls[urlKey] + suffix : suffix
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
