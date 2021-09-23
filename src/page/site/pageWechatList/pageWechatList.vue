<template>
	<PageTemplate class="pageWechatList">
		<template #function>
			<top-function :filters="filters" />
		</template>
		<template #table="{ maxHeight }">
			<TablePage
				ref="table"
				:height="maxHeight"
				:await-fetch="awaitFn"
				:filters="filters"
				one-key="uin"
			>
				<el-table-column type="selection" width="54px"></el-table-column>
				<el-table-column label="状态" align="center" width="72px">
					<template #default="{ row }">
						<span :class="chat.status.value(row.status)[1]">
							<i class="iconfont" :class="chat.status.value(row.status)[1]"></i>
							<span>{{ chat.status.value(row.status)[0] }}</span>
						</span>
					</template>
				</el-table-column>
				<el-table-column
					label="昵称"
					min-width="150px"
					align="center"
					show-overflow-tooltip
				>
					<template #default="{ row }">
						<div class="wechatInfoBox">
							<div class="wechatInfo flex items-center">
								<img :src="chat.avatar.value(row)" class="avatar" alt="" />
								<span class="name ml-3 omit">
									{{ chat.name.value(row) }}
								</span>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="密码" min-width="70px" align="center">
					<template #default="{ row }">
						<span :class="'changPass' + row.isChangeCipher">
							{{ row.isChangeCipher === 0 ? '未改' : '已改' }}
						</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="friendTotal"
					label="好友数"
					align="center"
					min-width="70px"
				></el-table-column>
				<el-table-column
					prop="roomTotal"
					label="群聊数"
					align="center"
					min-width="70px"
				></el-table-column>

				<el-table-column
					prop="proxyIp"
					label="登录IP"
					align="center"
					show-overflow-tooltip=""
				></el-table-column>
				<el-table-column
					prop="groupName"
					label="微信分组"
					align="center"
					show-overflow-tooltip
				/>
				<el-table-column
					prop="createTime"
					label="上号时间"
					align="center"
					min-width="156px"
				></el-table-column>
				<el-table-column
					prop="failReason"
					label="状态信息"
					align="center"
					min-width="300px"
					show-overflow-tooltip
				>
					<template #default="{ row }">
						<span v-if="row.status !== 1">{{ row.failReason }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<!-- <template> -->
					<el-button type="primary" size="small"> 详情 </el-button>
					<!-- </template> -->
				</el-table-column>
			</TablePage>
		</template>
	</PageTemplate>
</template>

<script lang="ts">
import GComputed from 'js/computed'
import { defineComponent } from 'vue'
import usePageWechatList from './pageWechatList'
import TopFunction from './TopFunction.vue'
import PageTemplate from '@/components/page/pageTemplate.vue'
// import { chat } from 'js/computed/index'

export default defineComponent({
	name: 'PageWechatList',
	components: { TopFunction, PageTemplate },
	setup() {
		const { filters, awaitFn } = usePageWechatList()

		return {
			chat: GComputed.chat,
			filters,
			awaitFn,
		}
	},
})
</script>

<style lang="scss" scoped>
.pageWechatList {
}
</style>
