<template>
	<div class="app-page">
		<left-menu-position v-if="!$route.meta.fullScreen" class="leftMenuPosition" />
		<router-view v-slot="{ Component }" class="right">
			<keep-alive>
				<component :is="Component"></component>
			</keep-alive>
		</router-view>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LeftMenuPosition from 'components/common/LeftMenu.vue'

export default defineComponent({
	name: 'AppPage',
	components: { LeftMenuPosition },
})
</script>

<style lang="scss">
$menuWidth: 60px;
.app-page {
	display: flex;
	height: 100%;
	.leftMenuPosition {
		width: $menuWidth;
		flex-shrink: 0;
	}
	.right {
		flex-grow: 1;
		width: calc(100% - #{$menuWidth});
		background-color: var(--bgColor);
	}
}
</style>
