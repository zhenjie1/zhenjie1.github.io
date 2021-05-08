import { Store as StoreTs } from 'typings/newStore/index'

import { createStore, useStore as baseUseStore } from 'vuex'

import friendStore from './modules/friend/index'
import groupStore from './modules/group/index'
import wechatStore from './modules/wechat'

import * as friend from '@/store/modules/friend'
import * as group from '@/store/modules/group'

export const modules = {
	friend: friendStore,
	group: groupStore,
	wechat: wechatStore,
}

export type StoreType = {
	friend: {
		namespace: true
		state: friend.State
		actions: friend.Actions
		mutations: friend.Mutations
		getters: friend.Getters
	}
	group: {
		namespace: true
		state: group.State
		actions: group.Actions
		mutations: group.Mutations
		getters: group.Getters
	}
	// wechat: {
	// 	namespace: true
	// 	state: typeof wechatStore.state
	// 	actions: typeof wechatStore.actions
	// 	mutations: typeof wechatStore.mutations
	// 	getters: typeof wechatStore.getters
	// }
}

const store = createStore({
	modules,
	strict: true,
}) as StoreTs<StoreType>

export default store

export function useStore(): StoreTs<StoreType> {
	return baseUseStore()
}
