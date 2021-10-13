<template>
	<div class="friendTopSearch">
		<el-input v-model="text" size="small" class="search" placeholder="搜索" clearable />
		<el-button size="small" class="createGroup bg-blue-20">创建群聊</el-button>
	</div>
</template>

<script lang="ts">
import { checkFriendKey, checkWechatKey, injectStrict } from '@/assets/js/injectionKey'
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
	name: 'FriendTopSearch',
	setup() {
		const checkWechat = injectStrict(checkWechatKey)
		const friend = injectStrict(checkFriendKey)
		watchEffect(() => {
			// console.log('wechat', friend.value)
			// console.log('friend', checkWechat.value)
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
