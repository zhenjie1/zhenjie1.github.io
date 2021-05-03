import { RootGettersParams, RootState } from '@/store/utils'
import { ObjReturnType } from 'typings/utils'
import { $PropertyType } from 'utility-types'
import { GetterTree } from 'vuex'

type FriendGettersParam = ObjReturnType<Getters>

export type Getters = {
	testGetter(
		state: Friend.state,
		getters: FriendGettersParam,
		rootState: RootState,
		rootGetters: RootGettersParams
	): $PropertyType<Friend.state, 'badge'>
	testGetter1(state: Friend.state): string
}

const friendGetters: GetterTree<Friend.state, RootState> & Getters = {
	testGetter: (state, g, R, RG) => state.badge,
	testGetter1: (state) => '2222',
}

export default friendGetters
