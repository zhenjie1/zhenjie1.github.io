import friendState from './state'
import * as actions from './actions'
import mutations from './mutations'
import { Module } from 'vuex'

const friendStore: Module<Friend.state, {}> = {
	namespaced: true,
	state: friendState,
	actions,
	mutations,
}
export default friendStore
