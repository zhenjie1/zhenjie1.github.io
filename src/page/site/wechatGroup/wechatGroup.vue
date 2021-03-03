<template>
	<div class="wechatGroup">微信分组</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'WechatGroup',
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
.wechatGroup {
}
</style>
