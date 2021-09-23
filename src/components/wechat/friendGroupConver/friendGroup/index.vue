<template>
	<div class="conversation h-full">
		<ul class="nav">
			<li
				v-for="(item, key) in nav.data"
				:key="key"
				:class="{ check: nav.check === key }"
				class="item"
				@click="nav.clickNav(key)"
			>
				{{ item.title }} ({{ total(key) }})
			</li>
		</ul>

		<component :is="componentName" class="overflow-hidden flex-1"></component>
	</div>
</template>

<script lang="ts">
import { checkWechatKey, injectStrict } from '@/assets/js/injectionKey'
import { useStore } from '@/store'
import { computed, defineComponent, reactive } from 'vue'
import FriendList from './friendList.vue'
import GroupList from './groupList.vue'

export default defineComponent({
	name: 'FriendGroup',
	components: { FriendList, GroupList },
	props: {
		compName: {
			type: String,
			default: 'friend',
		},
	},
	emits: ['update:compName'],
	setup(props, ctx) {
		const { state } = useStore()

		const checkWechat = injectStrict(checkWechatKey)
		const total = computed(() => {
			checkWechat.value
			return (type: 'friend' | 'group') => {
				const source = type === 'friend' ? state.friend.friends : state.group.groups

				const data = checkWechat.value ? source[checkWechat.value.uin] || {} : {}
				return checkWechat.value ? Object.keys(data).length : 0
			}
		})

		const nav = reactive({
			data: {
				friend: { title: '好友' },
				group: { title: '群聊' },
			},
			check: 'friend',
			clickNav(key: string) {
				this.check = key
				ctx.emit('update:compName', key)
			},
		})

		const componentName = computed(() => {
			const data: Data = {
				friend: 'FriendList',
				group: 'GroupList',
			}
			return data[nav.check] || ''
		})

		return {
			componentName,
			nav,
			total,
		}
	},
})
</script>

<style lang="scss" scoped>
.conversation {
	@apply flex flex-col;
	.nav {
		@apply flex-shrink-0;
		li {
			width: 40%;
			color: var(--textGrayDeep);
			&.check {
				color: var(--main);
			}
		}
	}
}
</style>
