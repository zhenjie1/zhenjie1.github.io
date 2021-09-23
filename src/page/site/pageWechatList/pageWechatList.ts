import { api } from '@/api'
import { WechatListFilter } from '@/api/pageWechatList'
import { reactive, onMounted, ref } from 'vue'
import { templateRef } from '@vueuse/core'

// 微信号列表数据处理
export default function usePageWechatList() {
	// 刷新微信分组
	api.wechatGroup.getGroups()

	let table: any = ref()
	onMounted(() => (table = templateRef('table')))

	const f = reactive<WechatListFilter>({
		uins: [],
		status: '',
		nickName: '',
		isChangeCipher: undefined,
		isBindingPhone: undefined,
		pageNum: 1,
		pageSize: 10,
	})

	const awaitFn = () => {
		return api.wechatList.list(f)((res) => {
			table.value?.initDataFn?.(undefined, res.list)
		})
	}

	return {
		filters: f,
		awaitFn,
	}
}
