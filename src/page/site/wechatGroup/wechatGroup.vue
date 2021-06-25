<template>
	<pageTemplateVue>
		<template #function>
			<TopFunction class="pt-xs mx-xs" :checkes="select"></TopFunction>
		</template>
		<template #table="{ maxHeight }">
			<table-page
				ref="table"
				v-model:select-data="select"
				:await-fetch="awaitFn"
				onekey="groupId"
				:height="maxHeight"
			>
				<el-table-column
					v-if="hide('selection')"
					type="selection"
					width="54px"
				></el-table-column>
				<el-table-column type="index" width="80px" label="序号"></el-table-column>
				<el-table-column
					label="分组名"
					prop="groupName"
					min-width="130px"
				></el-table-column>
				<el-table-column
					v-if="hide('customer')"
					label="负责客服"
					prop="groupName"
					align="center"
					min-width="130px"
				>
					<template #default="{ row }">
						<my-select
							v-model="row.customerServiceName"
							:loadmore="loadmore"
							one-key="id"
							label="label"
							@change="(select) => handlerChangeCustomer(row, select)"
						/>
					</template>
				</el-table-column>
				<el-table-column
					label="微信数"
					prop="weChatSum"
					align="center"
					min-width="80px"
				></el-table-column>
				<el-table-column
					v-if="hide('hello')"
					label="欢迎语"
					align="center"
					min-width="100px"
				>
					<template #default="{ row }">
						{{ row.templateName ? row.templateName : '关闭' }}
					</template>
				</el-table-column>
				<el-table-column
					v-if="hide('keyword')"
					label="关键字回复"
					align="center"
					min-width="100px"
				>
					<template #default="{ row }">
						{{ row.keyWord ? row.keyWord : '关闭' }}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="180px">
					<template #default="{ row }">
						<el-button
							type="primary"
							icon="el-icon-edit"
							:disabled="row.groupId === 0"
							size="small"
							@click="handlerEdit(row)"
						>
							编辑
						</el-button>
						<el-button
							type="danger"
							:disabled="row.groupId === 0"
							icon="el-icon-delete"
							size="small"
							@click="handlerDelete(row.groupId)"
						>
							删除
						</el-button>
					</template>
				</el-table-column>
			</table-page>
		</template>
	</pageTemplateVue>
</template>

<script lang="ts">
import apiData from '@/api/store'
import { isVideo } from '@/assets/js/var/global'
import { computed, defineComponent } from 'vue'
import useWechatGroup, { useWechatGroupFun } from './useWechatGroup'
import TopFunction from './topFunction.vue'
import { getRef } from '@/utils'
import pageTemplateVue from '@/components/page/pageTemplate.vue'
import { api } from '@/api'

export default defineComponent({
	name: 'WechatGroup',
	components: { TopFunction, pageTemplateVue },
	setup() {
		// 是否隐藏
		const hide = (key: string) => {
			const isAdmin = true
			const data: Data = {
				selection: !isVideo, // 多选
				customer: !isVideo, // 负责客服
				customerSelect: isAdmin, // 负责客服的内容
				hello: !isVideo, // 欢迎语
				keyword: !isVideo, // 关键字
			}
			return data[key]
		}
		const { awaitFn } = useWechatGroup()
		const { handlerChangeCustomer, handlerEdit, handlerDelete, select } = useWechatGroupFun()
		const tableEl: any = getRef('table')

		return {
			select,
			hide,
			awaitFn,
			refreshEv() {
				tableEl.value?.initDataFn?.()
			},
			handlerEdit,
			handlerDelete,
			handlerChangeCustomer,
			loadmore: api.customer.subordinateCustomer,
		}
	},
})
</script>

<style lang="scss" scoped>
.wechatGroup {
}
</style>
