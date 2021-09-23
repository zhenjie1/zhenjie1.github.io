<template>
	<div class="chatTemplateContent">
		<chat-wechat-list />

		<friend-group-conver class="friendGroupConver" />

		<chat-template class="chat-template" :friend="checkFriend" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from 'vue'
import ChatWechatList from './chatWechatList.vue'
import FriendGroupConver from 'components/wechat/friendGroupConver/FriendGroupConver.vue'
import ChatTemplate from 'components/wechat/chatTemplate/ChatTemplate.vue'
import { useStore } from '@/store'
import { checkWechatKey, checkFriendKey } from 'js/injectionKey'
import { useSocket } from '@/plugins/socket'

export default defineComponent({
	components: { ChatWechatList, FriendGroupConver, ChatTemplate },
	setup() {
		const store = useStore()
		const { receive } = useSocket()
		receive('login', (data) => {
			console.log('aaaa', data)
		})

		const checkWechat = computed(() => store.state.wechat.checkedWechat)
		const checkFriend = computed(() => store.state.fg.checkedFriend)

		provide(checkWechatKey, checkWechat)
		provide(checkFriendKey, checkFriend)

		return {
			checkWechat,
			checkFriend,
		}
	},
})
</script>

<style lang="scss">
@import '../../assets/css/wechat.scss';
</style>

<style lang="scss" scoped>
.chatTemplateContent {
	// @apply flex overflow-hidden;
	display: flex;
	background-color: var(--bgColor);
	overflow: hidden;
	> * {
		flex-shrink: 0;
	}
}

.friendGroupConver {
	width: 230px;
}

.chat-template {
	background-color: var(--msgBgColor);
	flex-grow: 1;
	flex-shrink: 1;
	overflow: hidden;
	// width: calc(100% - 430px);
}
</style>
