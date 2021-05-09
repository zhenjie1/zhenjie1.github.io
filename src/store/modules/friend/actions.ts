import { ActionTree } from 'vuex'
import { ActionContext, RootState } from '@/store/type'

type Context = ActionContext<'friend'>

export type Actions = {
	testActions(context: Context, p: string): Promise<any>
}

const friendActions: ActionTree<Friend.state, RootState> & Actions = {
	async testActions({ commit, state, getters, dispatch, rootGetters }, p) {
		commit('testMutations', '123')

		dispatch('group/testActions', '123', { root: true })
	},
}

export default friendActions
