import { debouncedWatch } from '@vueuse/core'
import { ApiTablePage } from 'typings/components/tablepage'
import { reactive, Ref, ref } from 'vue'

// 请求返回的结构
export type AwaitFetch = ApiTablePage<any>

// 分页数据
export interface TablePage {
	size: number
	index: number
	total: number
	lock: boolean
}

// 过滤条件
export type TableFilter = Record<string, any>

// 表格分页加过滤条件
export type TableApiParams = TablePage & TableFilter

// 方法最终返回的结果
export type TablePageReturn<P, F> = {
	page: P
	filters: F
	list: Ref<{ [x: string]: any }[]>
	pageSizeEv: Function
	pageIndexEv: Function
	initDataFn: Function
}

type UseTablePage = {
	(awaitFetch: (params: TableApiParams) => Promise<AwaitFetch>, filters: Data): TablePageReturn<
		TablePage,
		typeof filters
	>
}

const useTablePage: UseTablePage = (awaitFetch, filters = {}) => {
	const page = reactive<TablePage>({
		size: 10,
		index: 1,
		total: 100,
		lock: false, // 锁
	})

	// 请求成功后, 此处存放数据结果
	const list = ref<Record<string, any>[]>([])

	// 每页个数发生变化
	const pageSizeEv = (size: number) => {
		page.size = size
		loadData(awaitFetch, page, list)
	}
	// 切换页数
	const pageIndexEv = (index: number) => {
		page.index = index
		loadData(awaitFetch, page, list)
	}

	/**
	 * 重新请求列表
	 * @param {boolean} pageInit 是否初始化当前页数为 1
	 * @param {any[]} listData 要优先显示的数据
	 * @returns {void}
	 */
	const initDataFn = (pageInit = false, listData?: any[]) => {
		// 优先显示缓存数据
		if (listData && Array.isArray(listData)) return (list.value = listData)

		if (pageInit) page.index = 1
		loadData(awaitFetch, page, list)
	}

	// 过滤条件变化后刷新表格
	debouncedWatch(
		() => filters,
		() => initDataFn(true),
		{ deep: true, debounce: 300 }
	)

	initDataFn()

	return {
		page,
		filters,
		list,
		initDataFn,
		pageSizeEv,
		pageIndexEv,
	}
}

export default useTablePage

// 根据 page 数据, 请求数据
function loadData(
	awaitFetch: (page: TablePage) => Promise<AwaitFetch>,
	params: TablePage,
	list: Ref<{ [x: string]: any }[]>
): Promise<any> {
	// 正在请求期间
	if (params.lock) return Promise.reject('在请求期间重复请求, 已终止')

	params.lock = true

	return awaitFetch(params)
		.then((res) => {
			if (!res) {
				list.value = []
				throw new Error('接口没有返回任何东西')
			}

			params.total = res.total || 0

			list.value = res.list || []
		})
		.finally(() => {
			params.lock = false
		})
		.catch(() => {
			list.value = []
		})
}
