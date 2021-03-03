import { fromFetch } from 'rxjs/fetch'

import { Fetch } from 'typings/fetchType'

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
	const fetch = fromFetch('http://localhost:3000', config)
	// fetch.pipe(
	// 	switchMap((response) => {
	// 		if (response.ok) {
	// 			return response.json()
	// 		} else {
	// 			return of({ error: true, message: `Error ${response.status}` })
	// 		}
	// 	})
	// 	// catchError((err) => {
	// 	// 	console.error(err)
	// 	// 	return of({ error: true, message: err.message })
	// 	// })
	// )
	fetch.subscribe(async (v) => {
		console.log(await v.text())
	})
	return fetch
	// if (options.store) getApiCache(params)
	// /**
	//  * 发送请求
	//  *
	//  * @param {Fetch.params} params 参数
	//  * @param {Fetch.options} options 其他配置
	//  * @returns {Promise<any>} 返回数据
	//  */
	// export default function APIFetch<T = object>(
	// 	params: Fetch.params,
	// 	options: Fetch.options = defaultOptions
	// ): Observable<T> {
	// 	if (options.store) getApiCache(params)
	// 	// 默认处理
	// 	const config = defaultParams(params)
	// 	const { dataPath = '' } = params
	// 	const app = axios(config).then((response) => {
	// 		const data = response.data
	// 		if (typeof data !== 'object') return getDeepResponse(dataPath, response)
	// 		if (data.code === 200) return getDeepResponse(dataPath, response)
	// 		else if (params.isCode) {
	// 			console.error('code 异常', response)
	// 		}
	// 		return getDeepResponse(dataPath, response)
	// 	})
	// 	return app
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
