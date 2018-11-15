import { setStore, loginReturnVal } from '../config/mUtils'

export default {
	setUserInfo:({commit},info) => {
		info = loginReturnVal(info)
		console.log(info)
		commit('userInfo',info)
		setStore('userInfo',info)
	},
	setGeographicLocation: ( { commit }, info ) => {
		if( JSON.stringify(info) === "{}") return;
		commit('saveGeographicLocation', info)
	},
	setHomeUrl({ commit }, url){
		if(url === '') return;
		commit('saveHomeUrl', url)
	}
}
