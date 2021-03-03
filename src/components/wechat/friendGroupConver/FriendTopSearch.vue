<template>
	<div class="friendTopSearch">
		<el-input v-model="text" class="search" placeholder="搜索" clearable />
		<el-button class="createGroup">创建群聊</el-button>
	</div>
</template>

<script lang="ts">
import { ComputedRef, defineComponent, inject, ref, watchEffect } from 'vue'
export default defineComponent({
	name: 'FriendTopSearch',
	setup() {
		const checkWechat = inject<ComputedRef<FriendItem>>('checkWechat')
		const friend = inject<ComputedRef<FriendItem>>('friend')
		watchEffect(() => {
			console.log('wechat', friend?.value)
			console.log('friend', checkWechat?.value)
		})
		const text = ref('')

		return {
			text,
		}
	},
})
</script>

<style lang="scss" scoped>
.friendTopSearch {
	display: flex;
	.createGroup {
		margin-left: 10px;
	}
}
</style>
