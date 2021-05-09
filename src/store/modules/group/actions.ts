import { StoreType } from '@/store'
import { ActionsContext, RootState } from 'typings/newStore/index'
import { ActionTree } from 'vuex'
import { State } from './state'

type Context = ActionsContext<StoreType, 'badge'>

export type Actions = {
	testActions(context: Context, p: string): Promise<any>
}

const groupActions: ActionTree<State, RootState<StoreType>> & Actions = {
	async testActions({ commit, state, getters, dispatch }, p) {
		console.log('actions', p)
		dispatch('friend/testActions', '123', { root: true })
		commit('friend/testMutations', '123', { root: true })
	},
}

export default groupActions
