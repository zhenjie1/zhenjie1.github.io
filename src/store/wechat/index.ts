import wechatState from './state'
import * as actions from './actions'
import mutations from './mutations'
import { Module } from 'vuex'

const wechatStore: Module<Wechat.state, {}> = {
	namespaced: true,
	state: wechatState,
	actions,
	mutations,
}
export default wechatStore
