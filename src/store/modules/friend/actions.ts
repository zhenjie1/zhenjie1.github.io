import { StoreType } from '@/store'
import { ActionTree } from 'vuex'
// import { ActionsContext, RootState } from 'vuex-next-ts'
import { RootState, ActionsContext } from 'typings/store/index'

type Context = ActionsContext<StoreType, 'friend'>

export type Actions = {
	testActions(context: Context, p: string): Promise<any>
}

const friendActions: ActionTree<Friend.state, RootState<StoreType>> & Actions = {
	async testActions({ commit, state, getters, dispatch, rootGetters }, p) {
		// const a = rootGetters['friend/testGetter']
		commit('friend/testMutations', '123', { root: true })
	},
}

export default friendActions
