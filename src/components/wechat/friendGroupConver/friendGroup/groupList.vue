<template>
	<div class="groupList">
		<!-- 好友列表 -->
		<virtual-scroll class="virtualScrollContent" :item-height="56" :data="friendList">
			<template #default="{ item }">
				<friend-item
					:friend="item"
					class="friendItem"
					:class="{
						checked: isSomeFriend(item, friend),
						select: isSomeFriend(item, selectFriend),
					}"
					title
					@contextmenu="friendContextmenu($event, item)"
					@click="handlerClickFriend(item)"
				/>
			</template>
		</virtual-scroll>
	</div>
</template>

<script lang="ts">
import { checkFriendKey, checkWechatKey, injectStrict } from '@/assets/js/injectionKey'
import { isSomeFriend } from '@/assets/js/wechat'
import { useStore } from '@/store'
import { computed, defineComponent, ref } from 'vue'
import FriendItem from 'components/wechat/friendGroupConver/FriendItem.vue'

export default defineComponent({
	name: 'GroupList',
	components: { FriendItem },
	setup() {
		const { commit, getters } = useStore()
		const checkWechat = injectStrict(checkWechatKey)

		// 右键选中的好友
		const selectFriend = ref<FriendItem | undefined>(undefined)

		// 点击好友执行
		const handlerClickFriend = (item: FriendItem) => {
			commit('fg/saveCheckedFriend', item as any)
		}

		const friendList = computed(() => {
			const uin = checkWechat.value?.uin
			return Object.values(getters['group/getGroup'](uin) || {})
		})

		const friend = injectStrict(checkFriendKey)

		return {
			handlerClickFriend,
			selectFriend,
			isSomeFriend,
			friendList,
			friend,
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
