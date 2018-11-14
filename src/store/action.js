import { setStore } from '../config/mUtils'

export default {
	setUserInfo:({commit},info) => {
		commit('userInfo',info)
		setStore('userInfo',info)
	}
}
