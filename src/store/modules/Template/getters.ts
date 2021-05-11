import { RootState, RootGettersReturn } from '../../type'
import { ObjReturnType } from 'typings/utils'
import { GetterTree } from 'vuex'
import { State } from './state'

type GroupGettersParam = ObjReturnType<Getters>

export type Getters = {
	test(
		state: State,
		getters: GroupGettersParam,
		rootState: RootState,
		rootGetters: RootGettersReturn
	): void
}

const getters: GetterTree<State, RootState> & Getters = {
	test: (state, g, R, RG) => 'state.badge',
}

export default getters
