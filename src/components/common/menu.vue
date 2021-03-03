<template>
	<div class="my-menu">
		<ul v-for="(menu, index) in menuData" :key="index" class="menu-list">
			<p v-if="menu.title" class="title">
				{{ menu.title }}
			</p>
			<li
				v-for="(item, ind) in menu.menu"
				:key="ind"
				class="menu-item"
				@click="handler(item)"
			>
				<router-link v-if="item.link" class="routerlink" :to="item.link">
					<i v-if="item.icon" class="iconfont icon" :class="[item.icon]" />
					<span class="text">{{ item.content }}</span>
					<!-- <ul v-if="index === 0 && ind === 2" class="miniMenu">
						<li class="hover">111111111</li>
						<li class="hover">111111111</li>
						<li class="hover">111111111</li>
						<li class="hover">111111111</li>
						<li class="hover">111111111</li>
						<li class="hover">111111111</li>
						<li class="hover">111111111</li>
					</ul> -->
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
// import { IMenuData, MenuContent } from '/root/typings/menu/menu'

export default defineComponent({
	name: 'MyMenu',
	props: {
		data: {
			type: Array as PropType<IMenuData[]>,
			default: () => [],
		},
	},
	setup(props) {
		return {
			menuData: props.data,
		}
	},
	methods: {
		handler(item: MenuContent) {
			// if (item.link) this.$router.push(item.link)
		},
	},
})
</script>

<style scoped lang="scss">
.my-menu {
	font-size: 14px;
	padding: 0 10px;
	height: 100%;
	// overflow-y: auto;
	border-right: 1px solid var(--borderColor);
	box-sizing: border-box;
	user-select: none;
	background-color: var(--menuBgColor);
	.menu-list {
		.title {
			color: var(--R40);
			font-size: 13px;
			padding: 10px 10px;
		}
		.menu-item {
			& + .menu-item {
				margin-top: 10px;
			}
			.routerlink {
				border-radius: 2px;
				transition: background-color 0.3s;
				color: var(--R70);
				padding: 8px 10px;
				display: flex;
				align-items: center;
				position: relative;
				.miniMenu {
					position: absolute;
					left: 100%;
					top: 0;
					box-shadow: var(--shadow);
					background-color: var(--C0);
					padding: 1px;
					li {
						padding: 8px 10px;
					}
					&::after {
						content: '';
						display: block;
						width: 0;
						height: 0;
						border: 10px solid transparent;
						// border-top: 50px solid black;
						border-right-color: var(--C0);
						// box-shadow: -4px 0 10px black;
						// border-bottom: 50px solid green;
						// border-left: 50px solid blue;
						// padding: 10px;
						position: absolute;
						top: 0;
						transform: translateX(-100%);
					}
				}
				* {
					transition: color 0.3s;
				}
				.icon {
					width: 20px;
					height: 20px;
					font-size: 15px;
					color: var(--R40);
					line-height: 20px;
					text-align: center;
					margin-right: 10px;
				}
				&:hover {
					color: var(--R95);
					.icon {
						color: var(--R80);
					}
				}
			}
		}
	}
}
.routerlink.router-link-active {
	// background-color: var(--R04);
	// background-color: var(--main);
	.icon,
	.text {
		color: var(--main) !important;
		// color: var(--C0) !important;
	}
}
</style>
