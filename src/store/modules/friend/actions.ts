import { AugmentedModuleActionContext, RootState } from '@/store/utils'
import { ActionTree } from 'vuex'
import { Getters } from './getters'
import { Mutations } from './mutations'
import { State } from './state'

type Context = AugmentedModuleActionContext<State, Mutations, Actions, Getters>

export type Actions = {
	testActions(context: Context, p: string): Promise<any>
}

const friendActions: ActionTree<Friend.state, RootState> & Actions = {
	async testActions({ commit, state, getters, dispatch }, p) {
		console.log('actions', p)
		// commit('testMutations', '123')
		commit('testMutations', '123')
	},
}

export default friendActions
