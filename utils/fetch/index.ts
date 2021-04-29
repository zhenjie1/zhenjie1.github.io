import axios from 'axios'
import defaultParams from './defaultPatams'
import './before'
import './after'

/**
 * 发送请求
 *
 * @param {Fetch.all} params 参数
 * @returns {Observer} 返回数据
 */
export default function APIFetch(params: Fetch.all) {
	const config = defaultParams(params)

	const { dataPath, isCode } = config

	const app = axios(config).then((response) => {
		if (!response) return
		const data = response.data

		if (typeof data !== 'object') return data

		if (data.code === 200) return getDeepResponse(dataPath, response)
		else if (isCode) {
			console.error('code 异常', response)
		}
		return getDeepResponse(dataPath, response)
	})
	return app
}

/**
 * 递归获取接口返回的参数
 *
 * @param { Array } arr 数据位置
 * @param {object} res 数据源
 * @returns {any} 返回的数据
 */
function getDeepResponse(arr: string[] | string, res: object): any {
	if (arr.length === 0 || typeof res !== 'object') return res

	arr = typeof arr === 'string' ? arr.split('.') : arr

	const key = arr.shift()
	if (!key) return res

	const response: { [key: string]: any } = res
	return getDeepResponse(arr, response[key])
}
