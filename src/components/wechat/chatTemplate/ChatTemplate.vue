<template>
	<div v-if="friend" class="chatTemplate">
		<div class="dropWin blur topInfo">
			<span class="name">
				{{ getName(friend) }}
			</span>
			<i class="iconfont icon-more2 operatingButton" />
		</div>
		<Message class="messageContent" :friend="friend" />
		<chat-rich-text />
	</div>
	<div v-else class="emptyFriend">
		<i class="iconfont icon-wechat icon"></i>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChatRichText from './ChatRichText.vue'
import Message from './message/Message.vue'
import { getName } from 'js/wechat/tool'

export default defineComponent({
	name: 'ChatTemplate',
	components: { ChatRichText, Message },
	props: {
		friend: {
			type: Object,
			default: undefined,
		},
	},
	setup() {
		return {
			getName,
		}
	},
})
</script>

<style lang="scss" scoped>
.chatTemplate {
	display: flex;
	flex-direction: column;
	position: relative;
	.messageContent {
		flex-grow: 1;
	}
	.topInfo {
		flex-shrink: 0;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		line-height: 50px;
		border-bottom: 1px solid var(--borderColor);
		font-size: 16px;
		align-items: center;
		position: absolute;
		width: 100%;

		.name {
			@include omit;
			padding: 0 20px;
			line-height: 1.5;
		}
		.operatingButton {
			width: 50px;
			text-align: center;
			flex-shrink: 0;
			font-weight: bold;
		}
	}
}
.emptyFriend {
	display: flex;
	.icon {
		font-size: 60px;
		margin: auto;
		color: var(--R1);
	}
}
</style>
