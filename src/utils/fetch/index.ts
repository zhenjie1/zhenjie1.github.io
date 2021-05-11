import axios from 'axios'
import defaultParams from './defaultPatams'
import './before'
import './after'
import apiData from '@/api/store'
import { ElMessage } from 'element-plus'

/**
 * 发送请求
 *
 * @param {Fetch.all} params 参数
 * @returns {Observer} 返回数据
 */
export default function APIFetch<T = any>(params: Fetch.all): Promise<T> {
	const config = defaultParams(params)

	const { dataPath, isCode } = config

	const app = axios(config)
		.then((response) => {
			if (!response) return
			const data = response.data

			if (typeof data !== 'object') return data

			if (data.code === 100000) return getDeepResponse(dataPath, response)
			else if (isCode) {
				if (data.msg) ElMessage.error(data.msg)
				throw new Error(data.msg || data)
			}
			return getDeepResponse(dataPath, response)
		})
		.then((data) => {
			// 请求成功
			if (config.storePath) saveStore(config.storePath, data)
			// else throw new Error('请设置数据存储的路径 storePath!')
			return data
		})
		.catch((err) => {
			throw new Error(err)
		})
	return app
}

// 存储请求的结果
function saveStore(path: Fetch.StorePath, data: any): void {
	// key: 将结果放到哪里
	// value: 结果
	const store: { [key: string]: string } = {}

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
		const val = store[path]

		const apiStore = getDeepResponse(prefixPath, apiData)
		if (typeof apiStore === 'object') {
			console.log(apiStore, apiDataKey, val)
			apiStore[apiDataKey] = val
		}
	}
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
