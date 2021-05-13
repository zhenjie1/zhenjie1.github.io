<template>
	<div v-if="wechat" v-size="size" class="friendGroupConverContent">
		<div class="blur topOpertaing">
			<friend-top-search />
			<div class="friendGroupConver">
				<el-tabs v-model="menuActive" stretch>
					<el-tab-pane name="conver" label="会话"></el-tab-pane>
					<el-tab-pane name="friendGroup" label="通讯录"></el-tab-pane>
					<el-tab-pane name="newFriend" label="新朋友"></el-tab-pane>
				</el-tabs>
			</div>
		</div>

		<virtual-scroll
			class="virtualScrollContent"
			:top-offset="82"
			:item-height="60"
			:data="friendData"
		>
			<template #default="{ item }">
				<friend-item
					:friend="item"
					class="friendItem"
					:class="{
						checked: isSomeFriend(item, friend),
						select: isSomeFriend(item, selectFriend),
					}"
					badge
					title
					time
					icon
					conver
					top
					@contextmenu="friendContextmenu($event, item)"
					@clickItem="handlerClickFriend"
				/>
			</template>
		</virtual-scroll>

		<div class="positionDrop" title="按住调节大小" />
	</div>
	<p v-else class="friendGroupConverContent promptText">请先选中微信号</p>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import FriendTopSearch from './FriendTopSearch.vue'
import friendData from './friend'
import FriendItem from './FriendItem.vue'
import { isSomeFriend } from 'js/wechat/tool'
import { wechatProp } from 'assets/props/wechatProps'

import VirtualScroll from 'components/common/virtualScroll/VirtualScroll.vue'
import { useStore } from '@/store'

export default defineComponent({
	name: 'FriendGroupConver',
	components: {
		FriendTopSearch,
		FriendItem,
		VirtualScroll,
	},
	props: {
		wechat: wechatProp,
		friend: {
			type: Object as PropType<Friend.data | undefined>,
			default: undefined,
		},
	},
	setup(props) {
		const { commit, state } = useStore()
		const menuActive = ref('conver')

		const checkFriend = computed(() => props.friend)

		// const state = store.state
		// 点击好友执行
		const handlerClickFriend = (item: FriendItem) => {
			commit('fg/saveCheckedFriend', item)
		}

		// 右键选中的好友
		const selectFriend = ref<FriendItem | undefined>(undefined)

		const contextmenuConfig = {
			close() {
				selectFriend.value = undefined
			},
		}

		return {
			isSomeFriend,
			menuActive,
			checkFriend,
			selectFriend,
			contextmenuConfig,
			friendData,
			// 点击好友或群聊数据
			handlerClickFriend,
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
	methods: {
		friendContextmenu(event: MouseEvent, item: FriendItem) {
			// 加延迟, 防止连续右键 close 事件清除
			setTimeout(() => (this.selectFriend = item), 0)
			//friendContextmenu(event, item, this.contextmenuConfig)
		},
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
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 10;
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

	.virtualScrollContent {
		.friendItem {
			height: 60px;
			box-sizing: border-box;
		}
		.friendItem.select {
			box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 4px inset;
		}
	}
}
</style>
