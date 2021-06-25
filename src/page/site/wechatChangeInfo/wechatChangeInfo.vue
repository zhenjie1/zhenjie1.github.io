<template>
	<div class="wechatChangeInfo">
		<PageTemplateVue>
			<template #table="{ maxHeight }">height: {{ maxHeight }}</template>
		</PageTemplateVue>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTemplateVue from '@/components/page/pageTemplate.vue'

export default defineComponent({
	name: 'WechatChangeInfo',
	components: { PageTemplateVue },
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
.wechatChangeInfo {
}
</style>
