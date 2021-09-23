import axios, { AxiosResponse } from 'axios'
import { get as getLodash, pick } from 'lodash'
import defaultParams from './defaultPatams'
// import './before'
import './after'
import apiData from '@/api/store'
import { ElMessage } from 'element-plus'
import { apiSave } from './before'
import { fetchGetKey } from './url'
import { ObjectPathType } from 'typings/utils'

type Get<T, K extends string> = ObjectPathType<T, K>
// type Return = {
// 	data: {
// 		a: {
// 			b: number
// 		}
// 	}
// }

// type CC<T, K extends string> = Get<AxiosResponse<T>, K>

// declare function APIFetch1<T extends object, K extends string = string>(
// 	params: Fetch.all,
// 	path: K
// ): CC<T, K>

// const a = pick(
// 	{
// 		uin: 213321,
// 		number: 322222,
// 	},
// 	['uin']
// )

// type Val = CC<Return, 'data.data'>
// const test = APIFetch1<Return>(
// 	{
// 		url: '123',
// 		storePath: false,
// 	},
// 	'data'
// )
// type AA<T, Path extends string> = Get<AxiosResponse<T>, Path>
// type BB = AA<Return, 'data'>

/**
 * 发送请求
 *
 * @param {Fetch.all} params 参数
 * @returns {Observer} 返回数据
 */
export default function APIFetch<T = any>(
	params: Fetch.all,
	path = 'data'
): Promise<Get<AxiosResponse<T>, typeof path>> {
	const config = defaultParams(params)
	const get: (obj: AxiosResponse<T>, path: string) => Get<T, typeof config['dataPath']> = (
		obj,
		path
	) => getLodash(obj, path)

	const { dataPath, isCode } = config

	const app = axios(config)
		.then((response) => {
			if (!response) return
			const data = response.data

			if (typeof data !== 'object') return data

			if (data.code === 100000) {
				const result = get(response, dataPath)
				apiSaveResult(config, result)
				return result
			} else if (isCode) {
				if (data.msg) ElMessage.error(data.msg)
				throw new Error(data.msg || data)
			}
			return get(response, dataPath)
		})
		.then((data) => {
			// 请求成功
			if (config.storePath) saveStore(config.storePath, data)
			return data
		})
		.catch((err) => {
			throw new Error(err)
		})
	return app
}

// 保存 api 接口结果, 下次请求前会执行 cacheFn 回调
function apiSaveResult(config: Fetch.all, result: any) {
	if (typeof config.cacheCb === 'function') {
		const key = fetchGetKey(config)

		apiSave[key] = result
	}
}

// 存储请求的结果
function saveStore(path: Fetch.StorePath, data: any): void {
	// key: 将结果放到哪里
	// value: 结果
	const store: Data = {}

	if (typeof path === 'string') store[path] = data

	// 如果传入的是对象
	if (typeof data === 'object' && typeof path === 'object') {
		for (const key in path) {
			const value = path[key]

			// 是否是字符串
			if (typeof value === 'string') store[value] = data[key]
			else {
				// 有函数处理
				store[value.path] = value.handler(data[key])
			}
		}
	}

	for (const path in store) {
		const index = path.lastIndexOf('.')
		if (index === -1) throw new Error('数据存储失败, 没有找的要存储的路径')

		const apiDataKey = path.substr(index + 1)
		const prefixPath = path.substr(0, index)

		const apiStore = getLodash(apiData, prefixPath)
		if (typeof apiStore === 'object') {
			apiStore[apiDataKey] = store[path]
		}
	}
}
