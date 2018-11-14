import { setStore, loginReturnVal } from '../config/mUtils'

export default {
	setUserInfo:({commit},info) => {
		info = loginReturnVal(info)
		commit('userInfo',info)
		setStore('userInfo',info)
	}
}
