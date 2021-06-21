<template>
	<div class="wechatGroup">
		<TopFunction class="pt-xs mx-xs" :checkes="select"></TopFunction>
		<table-page ref="table" v-model:select-data="select" :await-fetch="awaitFn">
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
					<el-select
						v-if="hide('customerSelect')"
						v-model="row.customerServiceName"
						size="small"
						@change="(id) => handlerChangeCustomer(row, id)"
					>
						<el-option
							v-for="item in customer"
							:key="item.id"
							:label="item.label"
							:value="item.id"
						></el-option>
					</el-select>
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
						size="small"
						@click="handlerEdit(row)"
					>
						编辑
					</el-button>
					<el-button
						type="danger"
						icon="el-icon-delete"
						size="small"
						@click="handlerDelete(row.groupId)"
					>
						删除
					</el-button>
				</template>
			</el-table-column>
		</table-page>
	</div>
</template>

<script lang="ts">
import apiData from '@/api/store'
import { isVideo } from '@/assets/js/var/global'
import { computed, defineComponent } from 'vue'
import useWechatGroup, { useWechatGroupFun } from './useWechatGroup'
import TopFunction from './topFunction.vue'

export default defineComponent({
	name: 'WechatGroup',
	components: { TopFunction },
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
		const { handlerChangeCustomer, handlerEdit, handlerDelete, select } =
			useWechatGroupFun()

		return {
			select,
			hide,
			awaitFn,
			handlerEdit,
			handlerDelete,
			handlerChangeCustomer,
			customer: computed(() => apiData.customer.subordinate),
		}
	},
})
</script>

<style lang="scss" scoped>
.wechatGroup {
}
</style>
