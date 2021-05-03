import groupState, { State as GroupStateTypes } from './state'
import actions, { Actions as GroupActionsTypes } from './actions'
import getters, { Getters as GroupGettersTypes } from './getters'
import mutations, { Mutations as GroupMutationsTypes } from './mutations'
import { Module } from 'vuex'
import { RootState } from '@/store/utils'

const groupStore: Module<Group.state, RootState> = {
	namespaced: true,
	state: groupState,
	actions,
	getters,
	mutations,
}

export default groupStore

type State = GroupStateTypes
type Getters = GroupGettersTypes
type Actions = GroupActionsTypes
type Mutations = GroupMutationsTypes
export { State, Actions, Getters, Mutations }
