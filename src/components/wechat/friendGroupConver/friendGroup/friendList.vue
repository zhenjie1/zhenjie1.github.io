<template>
	<div class="friend">
		<!-- 好友列表 -->

		<virtual-scroll class="virtualScrollContent" :item-height="60" :data="friendList">
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
		<!-- <pre>{{ friendList }}</pre> -->
	</div>
</template>

<script lang="ts">
import { checkWechatKey, injectStrict } from '@/assets/js/injectionKey'
import { isSomeFriend } from '@/assets/js/wechat'
import { useStore } from '@/store'
import { computed, defineComponent, PropType, ref } from 'vue'
import FriendItem from 'components/wechat/friendGroupConver/FriendItem.vue'

export default defineComponent({
	name: 'Friend',
	components: { FriendItem },
	props: {
		friend: {
			type: Object as PropType<Friend.data | undefined>,
			default: undefined,
		},
	},
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
			return Object.values(
				getters['friend/getFriends'](checkWechat.value?.uin) || {}
			)
		})

		return {
			handlerClickFriend,
			selectFriend,
			isSomeFriend,
			friendList,
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

<style lang="scss" scoped>
.friend {
}
</style>
