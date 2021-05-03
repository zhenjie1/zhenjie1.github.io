import friendState, { State as FriendStateTypes } from './state'
import actions, { Actions as FriendActionsTypes } from './actions'
import getters, { Getters as FriendGettersTypes } from './getters'
import mutations, { Mutations as FriendMutationsTypes } from './mutations'
import { Module } from 'vuex'
import { RootState } from '@/store/utils'

const friendStore: Module<Friend.state, RootState> = {
	namespaced: true,
	state: friendState,
	getters,
	actions,
	mutations,
}

export default friendStore

type State = FriendStateTypes
type Getters = FriendGettersTypes
type Actions = FriendActionsTypes
type Mutations = FriendMutationsTypes
export { State, Actions, Getters, Mutations }
