import { RootState } from './type'
import { Plugin } from 'vuex'
import { debounce, cloneDeep, merge } from 'lodash'
import { get, set } from 'idb-keyval'

function storeIndexDB() {
	const save: Plugin<RootState> = async (store) => {
		const dbName = 'vuexData'

		// 订阅 mutations 事件, 修改时同步到数据库
		store.subscribe(
			debounce((mutations, state: RootState) => {
				try {
					state = cloneDeep(state)
					set(dbName, state)
				} catch (err) {
					console.error(err)
				}
			}, 300)
		)

		// 将原来的数据恢复
		const state = await get<RootState>(dbName)
		if (state) {
			store.replaceState(merge(cloneDeep(store.state), state))
		}
	}

	return save
}

export default storeIndexDB
