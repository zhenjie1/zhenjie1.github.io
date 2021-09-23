<template>
	<div class="FriendItem hover:bg-bg-hover" :class="{ top: friend.op === 1 }">
		<div class="avatarBox">
			<slot name="avatar">
				<img :src="friend.headImgUrl" alt="" class="avatar" />
				<span v-if="badge" class="badge notDisturb">12</span>
			</slot>
		</div>
		<div class="info">
			<p class="title">
				<slot name="title">
					<span v-if="title" class="tit">{{ friend.nickName }}</span>
				</slot>
				<slot name="time">
					<span v-if="time" class="time">17:34</span>
				</slot>
			</p>
			<p v-if="conver" class="conver">
				<slot name="conver">
					<span class="conver-content">
						<!-- <span class="draft">[草稿]</span> -->
						<span class="appoint">[有人@我]</span>
						<span class="msg">123312123312123312123312123312123312</span>
					</span>
				</slot>
				<slot v-if="icon" name="icon">
					<span class="icon iconfont icon-lingsheng-jingyin" />
				</slot>
			</p>
		</div>
		<div class="float-right">
			<slot v-if="slots.floatRight" name="float-right"></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType } from 'vue'

export default defineComponent({
	name: 'FriendItem',
	props: {
		// 是否显示置顶
		top: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		// 是否显示标题
		title: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		// 是否显示消息时间
		time: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		// 是否显示右侧默认图标
		icon: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		// 是否显示未读消息数量
		badge: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		// 是否显示最近消息(包括时间)
		conver: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		// 一个好友对象(也可以是合并 Message 数据之后的)
		friend: {
			type: Object as PropType<FriendItem>,
			default: () => ({}),
		},
	},
	data() {
		return {
			slots: {
				floatRight: false,
			},
		}
	},
	mounted() {
		if (this.$slots['float-right']) this.slots.floatRight = true
	},
})
</script>

<style lang="scss" scoped>
.FriendItem {
	display: flex;
	align-items: center;
	padding: 10px;
	user-select: none;
	border-left: 2px solid transparent;
	position: relative;

	.float-right {
		position: absolute;
		right: 0;
	}

	&.top::after {
		position: absolute;
		right: 4px;
		top: 4px;
		content: '';
		display: block;
		width: 0;
		height: 0;
		border-top: 8px solid var(--main);
		border-left: 8px solid transparent;
		opacity: 0.5;
	}
	&.checked {
		border-left-color: var(--main);
	}
	.avatarBox {
		position: relative;
		margin-right: 10px;
		// 免打扰样式
		.badge.notDisturb {
			padding: 3px;
			font-size: 0;
			line-height: 0;
		}
	}
	.info {
		width: calc(100% - 46px);
		.title {
			color: var(--R80);
			font-size: 14px;
			display: flex;
			justify-content: space-between;
			.tit {
				@include omit;
			}
			.time {
				margin-left: 10px;
				display: flex;
				color: var(--textGrayDeep);
				font-size: 12px;
				line-height: 14px * 1.5;
			}
		}
		.conver {
			display: flex;
			justify-content: space-between;
			color: var(--textGray);
			font-size: 12px;
			.conver-content {
				@include omit;
				flex: 1;

				.draft,
				.appoint {
					color: var(--red);
				}
			}
			.icon {
				margin-left: 10px;
				font-size: 12px;
				color: var(--textGrayLight);
			}
		}
	}
}
</style>
