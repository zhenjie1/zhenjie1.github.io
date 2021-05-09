import { createStore, useStore as baseUseStore } from 'vuex'
import { UseStore } from './type'
import friendStore from './modules/friend/index'
import groupStore from './modules/group/index'
import wechatStore from './modules/wechat'
export const modules = {
	friend: friendStore,
	group: groupStore,
	wechat: wechatStore,
}

const store = createStore({
	modules,
	strict: true,
}) as UseStore

export default store

export function useStore(): UseStore {
	return baseUseStore()
}
