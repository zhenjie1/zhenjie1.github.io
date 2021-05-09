import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import { Module } from 'vuex'
import { RootState } from 'typings/newStore'
import { StoreType } from '@/store'

export * from './state'
export * from './actions'
export * from './mutations'
export * from './getters'

const groupStore: Module<Group.state, RootState<StoreType>> = {
	namespaced: true,
	state,
	actions,
	getters,
	mutations,
}

export default groupStore
