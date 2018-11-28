import { setStore, loginReturnVal, mergeObj } from '../config/mUtils'

export default {
	setUserInfo: ({ commit, state }, info) => {
		if (info !== undefined) info = loginReturnVal(info)
		if (info != undefined && state.userInfo) info = mergeObj(state.userInfo, info)	//数据合并
		commit('userInfo', info)
		setStore('userInfo', info)
	},
	setGeographicLocation: ({ commit }, info) => {
		if (JSON.stringify(info) === "{}") return;
		commit('saveGeographicLocation', info)
	},
	setHomeUrl({ commit }, url) {
		if (url === '') return;
		commit('saveHomeUrl', url)
	},
	setDistrict({ commit }, district) {
		if (district == '') return;
		commit('saveDistrict', district)
	},
	setTitle({ commit }, title) {
		if (!title) return;
		commit('saveTitle', title)
	}
}
