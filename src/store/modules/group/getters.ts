import { StoreType } from '@/store'
import { RootState, RootGetters } from 'typings/newStore'
import { ObjReturnType } from 'typings/utils'
import { GetterTree } from 'vuex'
import { State } from './state'

type GroupGettersParam = ObjReturnType<Getters>

export type Getters = {
	groupG1(
		state: State,
		getters: GroupGettersParam,
		rootState: RootState<StoreType>,
		rootGetters: ObjReturnType<RootGetters<StoreType>>
	): void
}

const groupGetters: GetterTree<State, RootState<StoreType>> & Getters = {
	groupG1: (state, g, R, RG) => state.badge,
}

export default groupGetters
