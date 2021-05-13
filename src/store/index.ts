import { createStore, useStore as baseUseStore } from 'vuex'
import { UseStore } from './type'
import friendStore from './modules/friend/index'
import groupStore from './modules/group/index'
import wechatStore from './modules/wechat/index'
import userStore from './modules/user/index'
import FGstore from './modules/FGstore/index'
import storeIndexDB from './storeDB'

export const modules = {
	friend: friendStore,
	group: groupStore,
	wechat: wechatStore,
	user: userStore,
	fg: FGstore,
}

const store = createStore({
	modules,
	strict: true,
	plugins: [storeIndexDB()],
}) as UseStore

window.store = store

export default store

export function useStore(): UseStore {
	return baseUseStore()
}
