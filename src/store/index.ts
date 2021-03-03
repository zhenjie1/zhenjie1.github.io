import { createStore } from 'vuex'

import friendStore from './friend/index'
import groupStore from './group/index'
import wechatStore from './wechat'

const store = createStore<IState>({
	modules: {
		friend: friendStore,
		group: groupStore,
		wechat: wechatStore,
	},
	strict: true,
})

export default store
