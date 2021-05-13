<template>
	<div v-size="size" class="chatWechatList">
		<div class="wechatTitle">
			<!-- {{ name(checkWechat) }} -->
			<div class="dropWin wechatOnline">微信号(2/10)</div>
			<div class="wechat">
				<el-input
					class="search"
					size="small"
					prefix-icon="iconfont icon-guanjianzibiaoqian"
					clearable
				></el-input>
			</div>
		</div>

		<wechat-group
			class="wechatGroup"
			:wechat="checkWechat"
			@checked="checkedWechat"
		></wechat-group>

		<div class="positionDrop" title="按住调节大小" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import WechatGroup from 'components/wechat/wechatGroup/WechatGroup.vue'

export default defineComponent({
	name: 'ChatWechatList',
	components: { WechatGroup },
	setup() {
		const store = useStore()
		const checkWechat = computed<Wechat.data | undefined>(
			() => store.state.wechat.checkedWechat
		)

		return {
			name: store.getters['wechat/getCheckWechatName'],
			checkWechat,
			checkedWechat(wechat: Wechat.data | undefined) {
				store.commit('wechat/saveCheckedWechat', wechat)
			},
		}
	},
	data() {
		return {
			size: {
				drop: '.positionDrop',
				minWidth: 140,
				maxWidth: 240,
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.chatWechatList {
	width: 200px;
	border-right: 1px solid var(--borderColor);
	position: relative;
	display: flex;
	// overflow: hidden;
	flex-direction: column;

	.wechatTitle {
		padding: 0 10px 10px;
		.wechatOnline {
			line-height: 40px;
		}
	}

	// .chatComponent {
	// 	flex-shrink: 0;
	// 	width: 100%;
	// }
	.wechatGroup {
		flex-grow: 1;
		overflow-y: auto;
	}

	// .wechat {
	// 	.search {
	// 		width: calc(100% - 20px);
	// 		margin: 0 10px;
	// 	}
	// }

	.positionDrop {
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
		width: 8px;
		background-color: transparent;
		transform: translateX(50%);
		z-index: 10;
		cursor: col-resize;
	}
}
</style>
