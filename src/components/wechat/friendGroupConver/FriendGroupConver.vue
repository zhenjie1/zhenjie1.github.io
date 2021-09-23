<template>
	<div v-if="wechat" v-size="size" class="friendGroupConverContent">
		<div class="topOpertaing">
			<friend-top-search />
			<div class="friendGroupConver">
				<el-tabs v-model="menuActive" stretch>
					<el-tab-pane name="conver" label="会话"></el-tab-pane>
					<el-tab-pane name="friendGroup" label="通讯录"></el-tab-pane>
					<el-tab-pane name="newFriend" label="新朋友"></el-tab-pane>
				</el-tabs>
			</div>
		</div>

		<div class="flex-1 overflow-hidden">
			<component :is="componentName"></component>
		</div>

		<div class="positionDrop" title="按住调节大小" />
	</div>
	<p v-else class="friendGroupConverContent promptText">请先选中微信号</p>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import FriendTopSearch from './FriendTopSearch.vue'
import FriendGroup from './friendGroup/index.vue'
import Conversation from './conversation.vue'
import { checkFriendKey, checkWechatKey, injectStrict } from '@/assets/js/injectionKey'

export default defineComponent({
	name: 'FriendGroupConver',
	components: {
		FriendTopSearch,
		FriendGroup,
		Conversation,
	},
	props: {},
	setup() {
		const menuActive = ref('friendGroup')

		const friend = injectStrict(checkFriendKey)
		const wechat = injectStrict(checkWechatKey)

		const componentName = computed(() => {
			const data: Data = {
				conver: 'Conversation',
				friendGroup: 'FriendGroup',
			}
			return data[menuActive.value]
		})

		return {
			menuActive,
			friend,
			wechat,
			componentName,
		}
	},
	data() {
		return {
			size: {
				drop: '.positionDrop',
				minWidth: 200,
				maxWidth: 300,
				width: true,
				height: true,
			},
		}
	},
})
</script>

<style scoped lang="scss">
.promptText {
	padding-top: 100px;
}
.friendGroupConverContent {
	@apply relative flex box-border flex-col flex-shrink-0;
	border-right: 1px solid var(--borderColor);

	.topOpertaing {
		@apply w-full p-3 pb-0 box-border;
		.friendGroupConver {
			@apply text-center;
		}
	}
	.positionDrop {
		@apply w-2 h-full right-0 top-0 absolute bg-transparent transform translate-x-1/2;
		cursor: col-resize;
	}
}
</style>
