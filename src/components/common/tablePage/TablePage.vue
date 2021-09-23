<!-- 这是一个表格分页组件 -->
<template>
	<div class="tablePageTemplate">
		<el-table
			ref="tableEl"
			:data="list"
			:max-height="page.total > list.length ? height - 48 : height"
			highlight-current-row
			:row-key="getRowKey"
			:reserve-selection="false"
			@selection-change="selectionChange"
		>
			<slot></slot>
		</el-table>

		<el-pagination
			class="pagination"
			:current-page="page.index"
			:page-sizes="[10, 20, 30]"
			:page-size="page.size"
			layout="total, sizes, prev, pager, next, jumper"
			:total="page.total"
			@size-change="pageSizeEv"
			@current-change="pageIndexEv"
		>
		</el-pagination>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import useTablePage, { AwaitFetch, TablePage } from './tablePageLogic'

export default defineComponent({
	name: 'TablePage',
	props: {
		selectData: {
			type: Array,
			default: () => [],
		},
		// 记录选中时的值时使用的 key
		onekey: {
			type: String,
			default: 'id',
		},
		// 接口返回的 Promise,获取数据时将执行
		awaitFetch: {
			type: Function as PropType<(page: TablePage) => Promise<AwaitFetch>>,
			required: true,
		},
		// 过滤条件, 更改后会自动刷新列表
		filters: {
			type: Object as PropType<Record<string, any>>,
			default: () => ({}),
		},
		// 表格的最大高度
		height: {
			type: Number,
			default: innerHeight,
		},
	},
	// emits: ['selectData'],
	setup(props, ctx) {
		if (!props.awaitFetch) throw new Error('awaFetch 不能为空!')

		if (typeof props.awaitFetch !== 'function') {
			throw new TypeError('awaFetch 只允许 Function 类型')
		}

		const tableEl = ref()

		const { page, list, pageSizeEv, pageIndexEv, initDataFn, select } = useTablePage(props, ctx)

		return {
			select,
			page,
			list,
			tableEl,
			pageSizeEv,
			pageIndexEv,
			// 刷新 - 可增加延迟时间
			refreshFn: (time = 0, ...args: any[]) => {
				setTimeout(() => {
					initDataFn.call(null, ...args)
				}, time)
			},
			initDataFn,
			selectionChange(row: any) {
				select.value = row
			},
			getRowKey: (row: any) => row[props.onekey],
		}
	},
})
</script>

<style lang="scss" scoped>
.tablePageTemplate {
	width: 100%;
	.pagination {
		text-align: center;
		padding: 10px 0;
	}
}
</style>
