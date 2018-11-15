import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import vuexI18n from 'vuex-i18n'

Vue.use(Vuex)

var userInfo = localStorage.userInfo == undefined ? {} : JSON.parse(localStorage.userInfo)


const state = {
	userInfo, //用户信息
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
	mutations
})
