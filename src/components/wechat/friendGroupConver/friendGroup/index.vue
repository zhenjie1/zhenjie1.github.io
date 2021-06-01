<template>
	<div class="conversation">
		<!-- <el-tabs v-model="menuActive" stretch>
			<el-tab-pane name="conver" label="好友"></el-tab-pane>
			<el-tab-pane name="friendGroup" label="群聊"></el-tab-pane>
		</el-tabs> -->
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

		<component :is="componentName"></component>
	</div>
</template>

<script lang="ts">
import { checkWechatKey, injectStrict } from '@/assets/js/injectionKey'
import { useStore } from '@/store'
import { computed, defineComponent, PropType, reactive } from 'vue'
import FriendList from './friendList.vue'
import GroupList from './groupList.vue'

export default defineComponent({
	name: 'FriendGroup',
	components: { FriendList, GroupList },
	props: {
		compName: {
			type: String as PropType<'friend' | 'group'>,
			required: true,
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
				const source =
					type === 'friend' ? state.friend.friends : state.group.groups

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
			const data = {
				friend: 'FriendList',
				group: 'GroupList',
			}
			return data[props.compName] || ''
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
	.nav {
		li {
			width: 40%;
			color: var(--colorGrayDeep);
			&.check {
				color: var(--main);
			}
		}
	}
}
</style>
