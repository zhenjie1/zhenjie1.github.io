import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import vuexI18n from 'vuex-i18n'

   Vue.use(Vuex)


var userInfo = localStorage.userInfo == undefined ? {} :  JSON.parse( localStorage.userInfo ) 


const state = {
	userInfo, //用户信息
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
//Vue.use(vuexI18n.plugin, store)
//const translationsEn = {
//	"content": "This is some {type} content"
//};
//Vue.i18n.add('en', translationsEn);
//// set the start locale to use
//Vue.i18n.set('en');
