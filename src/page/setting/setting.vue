<template>
	<div class="setting">
		<nav class="routerNav">
			<router-link class="hover routerlink" to="/setting/notify">通知</router-link>
			<router-link class="hover routerlink" to="/setting/general">通用</router-link>
			<router-link class="hover routerlink" to="/setting/key">快捷键</router-link>
		</nav>

		<div class="content">
			<router-view v-slot="{ Component }" class="routerview">
				<keep-alive>
					<component :is="Component"></component>
				</keep-alive>
			</router-view>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Setting',
	data() {
		return {}
	},
	created() {
		this.initDataFn()
	},
	methods: {
		// 初始化数据
		initDataFn() {},
	},
})
</script>

<style lang="scss" scoped>
.setting {
	display: flex;
	flex-direction: column;
	.routerNav {
		display: flex;
		padding-top: 20px;
		background-color: var(--R04);

		.routerlink {
			padding: 0 20px;
			line-height: 40px;
			margin: 0 auto;
			white-space: nowrap;
			color: var(--textColor);
			& + .routerlink {
				margin-left: 20px;
			}
		}
	}
	.content {
		flex: 1;
		padding: 0 20px;
		background-color: var(--);
		.routerview {
			padding: 20px 0;
			// height: 100%;
			// background-color: var(--C0);
		}
	}
}
</style>
