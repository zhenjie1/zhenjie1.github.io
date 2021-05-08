import friendState from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import { Module } from 'vuex'
import { RootState } from '@/store/utils'

export * from './state'
export * from './actions'
export * from './mutations'
export * from './getters'

const friendStore: Module<Friend.state, RootState> = {
	namespaced: true,
	state: friendState,
	getters,
	actions,
	mutations,
}

export default friendStore
