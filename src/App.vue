<template>
	<!-- <div v-if="!ready" class="offline">您的设备已离线, 请检查网络连接!</div> -->
	<div ref="div" class="app-page">
		<left-menu-position v-if="!$route.meta.fullScreen" class="leftMenuPosition" />
		<router-view v-slot="{ Component }" class="router">
			<!-- <keep-alive> -->
			<component :is="Component"></component>
			<!-- </keep-alive> -->
		</router-view>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LeftMenuPosition from 'components/common/LeftMenu.vue'
import { useSocket } from './plugins/socket'

export default defineComponent({
	name: 'AppPage',
	components: { LeftMenuPosition },
	setup(props) {
		const { ready } = useSocket()
		return {
			ready,
		}
	},
})
</script>

<style lang="scss" scoped>
$menuWidth: 60px;
.offline {
	position: relative;
	color: var(--yellow);
	padding: 4px 10px;
	&::before {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		background-color: var(--yellow);
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		opacity: 0.2;
	}
}
.app-page {
	display: flex;
	height: 100%;
	.leftMenuPosition {
		width: $menuWidth;
		flex-shrink: 0;
	}
	> ::v-deep(.router) {
		flex-grow: 1;
		width: calc(100% - #{$menuWidth});
		background-color: var(--bgColor);
	}
}
</style>
