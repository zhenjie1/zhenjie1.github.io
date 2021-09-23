<template>
	<div class="pageGroupList">群聊列表</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'PageGroupList',
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
.pageGroupList {
}
</style>
