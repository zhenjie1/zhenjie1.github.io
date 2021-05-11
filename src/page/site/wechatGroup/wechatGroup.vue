<template>
	<div class="wechatGroup">微信分组</div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'WechatGroup',
	setup() {
		const store = useStore()
	},
})
</script>

<style lang="scss" scoped>
.wechatGroup {
}
</style>
