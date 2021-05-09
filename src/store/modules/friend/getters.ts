import { RootState } from 'typings/newStore'
import { ObjReturnType } from 'typings/utils'
import { GetterTree } from 'vuex'

type FriendGettersParam = ObjReturnType<Getters>

export type Getters = {
	testGetter(
		state: Friend.state,
		getters: FriendGettersParam,
		rootState: RootState,
		rootGetters: RootGettersParams
	): string
	testGetter1(state: Friend.state): string
}

const friendGetters: GetterTree<Friend.state, RootState> & Getters = {
	testGetter: (state, g, R, RG) => 'state.badge',
	testGetter1: (state) => '2222',
}

export default friendGetters
