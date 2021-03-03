import { useStore } from 'vuex'

/**
 * 导出 vuex 数据
 *
 * @param {string} key 要倒入的 vuex 数据
 * @returns {T} 返回 state 数据
 */
export function useState(key?: keyof IState) {
	const state = useStore<IState>().state

	// if (key) {
	// 	const keys = key.split('.')
	// 	let i = 0
	// 	while (i <= keys.length) {
	// 		i++
	// 		state = state[keys.shift() as string]
	// 	}
	// }
	return key ? state[key] : state
}
