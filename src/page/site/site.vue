<template>
	<div class="siteTemplateContent">
		<my-menu :data="menu" class="menu" />
		<router-view v-slot="{ Component }" class="router">
			<transition name="fade">
				<!-- <keep-alive> -->
				<component :is="Component"></component>
				<!-- </keep-alive> -->
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
				title: '微信列表',
				menu: [
					{
						content: '设置',
						icon: 'icon-wechat',
						link: '/setting',
					},
					{
						content: '微信列表',
						icon: 'icon-wechat',
						link: '/site/pageWechatList',
					},
					{
						content: '微信分组',
						icon: 'icon-biaoqian',
						link: '/site/wechatGroup',
					},
					{
						content: '批量修改资料',
						icon: 'icon-change',
						link: '/site/wechatChangeInfo',
					},
				],
			},
			{
				title: '客服账号',
				menu: [
					{
						content: '聊天记录',
						icon: 'icon-xiaoxi-block',
						link: '/site/chatHistory',
					},
				],
			},
			{
				title: '素材模版',
				menu: [
					{
						content: '图文音视频',
						icon: 'icon-icon-test',
						link: '/site/materialLibrary',
					},
					{
						content: '关键字模版',
						icon: 'icon-guanjianzibiaoqian',
						link: '/site/keyword',
					},
					{
						content: '欢迎语模版',
						icon: 'icon-paishou',
						link: '/site/hello',
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
.siteTemplateContent {
	display: flex;
	// height: 100%;
	overflow: hidden;
	.menu {
		flex-shrink: 0;
	}
	.router {
		overflow: hidden;
		flex: 1;
	}
	// ::v-deep(.router) {
	// 	> * {
	// 		height: 100%;
	// 	}
	// }
}
</style>
