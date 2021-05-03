import { InjectionKey } from 'vue'
import {
	createStore,
	useStore as baseUseStore,
	Store as VuexStore,
	CommitOptions,
	DispatchOptions,
} from 'vuex'

import friendStore from './modules/friend/index'
import groupStore from './modules/group/index'
import wechatStore from './modules/wechat'

import {
	PayloadAndOptionsTuple,
	RootActions,
	RootGettersParams,
	RootMutations,
	RootState,
} from './utils'

export const modules = {
	friend: friendStore,
	group: groupStore,
	wechat: wechatStore,
}

const store = createStore<RootState>({
	modules,
	strict: true,
})

export default store

export type Store = Omit<VuexStore<RootState>, 'getters' | 'commit' | 'dispatch'> & {
	commit<K extends keyof RootMutations, P extends Parameters<RootMutations[K]>[1]>(
		key: K,
		...params: PayloadAndOptionsTuple<P, CommitOptions>
	): ReturnType<RootMutations[K]>
	dispatch<K extends keyof RootActions, P extends Parameters<RootActions[K]>[1]>(
		key: K,
		...params: PayloadAndOptionsTuple<P, DispatchOptions>
	): ReturnType<RootActions[K]>
	getters: RootGettersParams
}

export const key: InjectionKey<Store> = Symbol('store')
export function useStore(): Store {
	// console.log(baseUseStore(key))
	return baseUseStore()
}
