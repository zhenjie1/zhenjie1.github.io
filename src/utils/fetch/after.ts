import axios, { AxiosResponse } from 'axios'
import router from '@/router'
import { clearUserCache } from '@/assets/js/user'
import { api } from '@/api'
import store from '@/store'

axios.interceptors.response.use((config) => {
	if (typeof config.data !== 'object') return config

	// 如果无需验证token, 接口异常时不检查, 避免死循环请求
	const configs: any = config
	if (configs.config.token === false) return config

	return codeErrorDeal(config)
})

// code 异常时做的处理
function codeErrorDeal(config: AxiosResponse<any>) {
	const code = config.data.code

	if ([900018, 900010].includes(code)) {
		router.push('/login')
		clearUserCache()
	} else if (code === 900019) return ajaxTokenInvalid(config)

	return config
}

interface FetchState {
	resolve: Function
	reject: Function
	config: AxiosResponse
}

let fetchState: FetchState[] = []

// accessToken 失效时, 换取新的 token
export function ajaxTokenInvalid(config: AxiosResponse): Promise<any> | AxiosResponse {
	const p = new Promise((resolve, reject) =>
		fetchState.push({
			resolve,
			reject,
			config,
		})
	)

	if (fetchState.length !== 1) return p

	// 请求获取新的 token
	api.user
		.getNewToken()
		.then((data) => {
			const { data: newToken, code } = data
			if (code !== 100000) throw new Error('换取 token 异常')

			console.warn('换取新 accessToken', newToken)
			store.commit('user/changeAccessToken', newToken)
			fetchState.map((options) => {
				const config = options.config.config
				config.headers.accessToken = newToken

				axios(config)
					.then((res) => {
						options.resolve(res)
					})
					.catch((err) => {
						options.reject(err)
					})
			})

			fetchState = []
		})
		.catch((err) => {
			console.error('换取新的 token 时报错', err)
			router.push('/login')
			clearUserCache()
		})

	return p
}
