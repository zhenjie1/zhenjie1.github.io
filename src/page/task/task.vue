<template>
	<div class="taskTemplateContent">
		<my-menu :data="menu" class="menu" />
		<router-view v-slot="{ Component }" class="router">
			<transition name="fade">
				<keep-alive>
					<component :is="Component"></component>
				</keep-alive>
			</transition>
		</router-view>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import MyMenu from 'components/common/menu.vue'

export default defineComponent({
	components: { MyMenu },

	setup() {
		const menu = reactive<IMenuData[]>([
			{
				title: '好友',
				menu: [
					{
						content: '好友列表',
						icon: 'icon-friendList',
						link: '/task/pageFriendList',
					},
					{
						content: '好友任务',
						icon: 'icon-renwu',
						link: '/task/friendTask',
					},
					{
						content: '爆粉配置',
						icon: 'icon-peizhi',
						link: '/task/fansOutbreak',
					},
					{
						content: '接粉统计',
						icon: 'icon-tongji',
						link: '/task/fansTotal',
					},
				],
			},
			{
				title: '群聊',
				menu: [
					{
						content: '群聊列表',
						icon: 'icon-groupList',
						link: '/task/pageGroupList',
					},
					{
						content: '群聊任务',
						icon: 'icon-task',
						link: '/task/groupTask',
					},
					{
						content: '群聊剧本',
						icon: 'icon-juben',
						link: '/task/groupScenario',
					},
				],
			},
		])
		return {
			menu,
		}
	},
})
</script>

<style scoped lang="scss">
.taskTemplateContent {
	display: flex;
	.router {
		flex-grow: 1;
	}
}
</style>
