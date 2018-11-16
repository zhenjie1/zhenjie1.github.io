import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import vuexI18n from 'vuex-i18n'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
	userInfo: null, //用户信息
	geographicLocation: null,//用户经纬度
	homeUrl:''	//首页url
}
var store;
export default store = new Vuex.Store({
	modules: {
		i18n: vuexI18n.store
	},
	state,
	getters,
	actions,
	mutations,
	plugins:[createPersistedState()]
})
