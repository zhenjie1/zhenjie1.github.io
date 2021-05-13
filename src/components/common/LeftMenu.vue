<template>
	<div class="dropWin leftMenuPosition">
		<p class="logo">logo</p>
		<div class="userInfo">
			<img src="../../assets/logo.png" class="avatar" alt="" />
		</div>
		<ul class="menu">
			<li v-for="(item, key) in menu" :key="key" class="item">
				<router-link :to="item.link" class="routerlink">
					<i class="iconfont" :class="[item.icon]"></i>
					<span class="title">{{ item.title }}</span>
					<span v-if="item.badge" class="badge">{{ item.badge }}</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'LeftMenuPosition',
	data() {
		return {
			menu: {
				wechat: {
					icon: 'icon-weixin1',
					link: '/chat',
					title: '聊天',
					badge: 10,
				},
				site: { icon: 'icon-shezhi', link: '/site', title: '设置', badge: 0 },
				task: {
					icon: 'icon-renwuguanli',
					link: '/task',
					title: '任务',
					badge: 0,
				},
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.leftMenuPosition {
	color: white;
	background-color: var(--AppLeftMenuColor);

	.logo {
		font-size: 16px;
		text-align: center;
		line-height: 70px;
		background-color: rgba(255, 255, 255, 0.1);
	}

	$avatarSize: 36px;
	.userInfo {
		width: $avatarSize;
		height: $avatarSize;
		margin: 10px auto;
		background-color: rgba(255, 255, 255, 0.1);
	}

	.menu {
		padding: 10px 0;
		.item {
			cursor: pointer;
			text-align: center;
			margin-bottom: 20px;
			.routerlink {
				position: relative;
				&.router-link-active,
				&.router-link-active .iconfont,
				&.router-link-active .title {
					color: var(--main);
				}
			}
			.iconfont {
				font-size: 24px;
				line-height: 1;
				text-align: center;
				width: 100%;
				color: rgb(138, 138, 138);
				// padding: 10px 0;
			}
			.title {
				font-size: 12px;
				color: #808080;
				line-height: 1;
			}
			.badge {
				right: 14px;
			}
		}
	}
}
</style>
