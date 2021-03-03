<template>
	<div class="chatTemplateContent">
		<chat-wechat-list />

		<friend-group-conver
			class="friendGroupConver"
			:wechat="checkWechat"
			:friend="checkFriend"
		/>

		<chat-template class="chat-template" :friend="checkFriend" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, reactive, readonly } from 'vue'
import ChatWechatList from './chatWechatList.vue'
import FriendGroupConver from 'components/wechat/friendGroupConver/FriendGroupConver.vue'
import ChatTemplate from 'components/wechat/chatTemplate/ChatTemplate.vue'
import { useStore } from 'vuex'

export default defineComponent({
	components: { ChatWechatList, FriendGroupConver, ChatTemplate },
	setup() {
		const store = useStore<IState>()

		const checkWechat = computed<Wechat.data | undefined>(
			() => store.state.wechat.checkedWechat
		)
		const checkFriend = computed<Friend.data | undefined>(
			() => store.state.friend.checkedFriend
		)

		provide('checkWechat', checkWechat)
		provide('friend', checkFriend)
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
	display: flex;
	background-color: var(--bgColor);
	overflow: hidden;
	> * {
		flex-shrink: 0;
	}
}

.friendGroupConver {
	width: 230px;
	z-index: 3;
}

.chat-template {
	background-color: var(--msgBgColor);
	flex-grow: 1;
	overflow: hidden;
	// width: calc(100% - 430px);
}
</style>
