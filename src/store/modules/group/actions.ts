import { AugmentedModuleActionContext, RootState } from '@/store/utils'
import { ActionTree } from 'vuex'
import { Getters } from './getters'
import { Mutations } from './mutations'
import { State } from './state'

type Context = AugmentedModuleActionContext<State, Mutations, Actions, Getters>

export type Actions = {
	testActions(context: Context, p: string): Promise<any>
}

const groupActions: ActionTree<State, RootState> & Actions = {
	async testActions({ commit, state, getters, dispatch }, p) {
		console.log('actions', p)
		dispatch('friend/testActions', '123', { root: true })
		commit('friend/testMutations', '123', { root: true })
	},
}

export default groupActions
