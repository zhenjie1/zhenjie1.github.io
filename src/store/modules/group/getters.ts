import { RootGettersParams, RootState } from '@/store/utils'
import { ObjReturnType } from 'typings/utils'
import { GetterTree } from 'vuex'
import { State } from './state'

type GroupGettersParam = ObjReturnType<Getters>

export type Getters = {
	groupG1(
		state: State,
		getters: GroupGettersParam,
		rootState: RootState,
		rootGetters: RootGettersParams
	): void
}

const groupGetters: GetterTree<State, RootState> & Getters = {
	groupG1: (state, g, R, RG) => state.badge,
}

export default groupGetters
