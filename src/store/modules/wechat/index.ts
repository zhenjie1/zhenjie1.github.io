import wechatState from './state'
import * as actions from './actions'
import mutations from './mutations'
import { Module } from 'vuex'
import { RootState } from '@/store/utils'

const wechatStore: Module<Wechat.state, RootState> = {
	namespaced: true,
	state: wechatState,
	actions,
	mutations,
}
export default wechatStore
