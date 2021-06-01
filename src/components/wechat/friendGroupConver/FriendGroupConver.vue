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

		<Conversation v-if="menuActive === 'conver'" />
		<FriendGroup v-if="menuActive === 'friendGroup'" v-model:compName="fgCheck" />

		<div class="positionDrop" title="按住调节大小" />
	</div>
	<p v-else class="friendGroupConverContent promptText">请先选中微信号</p>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import FriendTopSearch from './FriendTopSearch.vue'
import FriendGroup from './friendGroup/index.vue'
import Conversation from './conversation.vue'
import { isSomeFriend } from 'js/wechat/tool'
import { wechatProp } from 'assets/props/wechatProps'

export default defineComponent({
	name: 'FriendGroupConver',
	components: {
		FriendTopSearch,
		FriendGroup,
		Conversation,
		// FriendItem,
		// VirtualScroll,
	},
	props: {
		wechat: wechatProp,
		friend: {
			type: Object as PropType<Friend.data | undefined>,
			default: undefined,
		},
	},
	setup(props) {
		const menuActive = ref('friendGroup')
		const fgCheck = ref('friend')

		const checkFriend = computed(() => props.friend)

		return {
			fgCheck,
			isSomeFriend,
			menuActive,
			checkFriend,
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
	position: relative;
	border-right: 1px solid var(--borderColor);
	display: flex;
	box-sizing: border-box;
	flex-direction: column;
	flex-shrink: 0;

	.topOpertaing {
		width: 100%;
		padding: 10px 10px 0;
		box-sizing: border-box;
		// background-color: var(--C6);
		.friendGroupConver {
			text-align: center;
			// padding: 0 10px;
		}
	}
	.positionDrop {
		width: 8px;
		height: 100%;
		position: absolute;
		right: 0;
		top: 0;
		background-color: transparent;
		transform: translateX(50%);
		cursor: col-resize;
	}

	// .virtualScrollContent {
	// 	.friendItem {
	// 		height: 60px;
	// 		box-sizing: border-box;
	// 	}
	// 	.friendItem.select {
	// 		box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 4px inset;
	// 	}
	// }
}
</style>
