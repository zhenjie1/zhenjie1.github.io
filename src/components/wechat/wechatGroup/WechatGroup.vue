<template>
	<div class="wechatGroupComponents">
		<div v-for="group in wxList" :key="group.id" class="group-content">
			<p class="blur group-name">
				{{ group.groupName }}
				<span>(1/{{ group.children.length }})</span>
			</p>
			<ul class="wechat-content">
				<friend-item
					v-for="item in group.children"
					:key="item.wxId"
					class="wechat-item"
					:class="{ checked: isCheck(item) }"
					title
					:friend="item"
					@click="handlerClickWechat(item)"
				>
					<template #time>
						<span :class="[status(item.status)[1]]" class="onlineStatus">
							{{ status(item.status)[0] }}
						</span>
					</template>
					<!-- <template #float-right>
						<span class="float-right-context" @click="online(item)">
							上线
						</span>
					</template> -->
				</friend-item>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, PropType } from 'vue'
import FriendItem from '../friendGroupConver/FriendItem.vue'
import apiData from '@/api/store'
import { api } from '@/api'
import GComputed from 'js/computed/index'
import { useSocket } from '@/plugins/socket'
import wechatTools from '@/assets/js/wechat/wechat'
import friendTools from '@/assets/js/wechat/friend'

export default defineComponent({
	nickName: 'WechatGroup',
	components: { FriendItem },
	props: {
		// 要选中的微信号
		wechat: {
			type: Object as PropType<Wechat.data | undefined>,
			default: undefined,
		},
	},
	emits: { checked: null },
	setup(props, ctx) {
		const { send } = useSocket()
		api.chat.chhatWechatGroup()
		const handlerClickWechat = function handlerClickWechat(wechat: Wechat.data) {
			ctx.emit('checked', wechat)
			// const { send } = useSocket()
			// send('reloadContact', { uin: wechat.uin })
			// wechatTools.reloadAllFriendGroup(wechat)
			friendTools.initAllFriendGroup(wechat)
			// api.friend.friendList(wechat)
			// api.group.groupList(wechat)
		}

		const isCheck = computed(
			() => (wechat: Wechat.data) => wechat && wechat.uin === props.wechat?.uin
		)

		return {
			online: (item: Wechat.data) => {
				console.log(item)
				send('login', {
					content: {},
				})
			},
			status: GComputed.chat.status,
			wxList: computed(() => apiData.chat.wxList),
			handlerClickWechat,
			isCheck,
		}
	},
})
</script>

<style lang="scss" scoped>
.wechatGroupComponents {
	user-select: none;
	.group-content {
		.group-name {
			line-height: 36px;
			padding: 0 10px;
			color: var(--textGrayDeep);
			position: sticky;
			top: 0;
			z-index: 10;
			margin: 0 1px;
			// border-bottom: 1px solid var(--borderColor);
		}

		.wechat-content {
			.float-right-context {
				background-color: var(--bgColor);
				line-height: 40px;
				width: 40px;
				text-align: center;
				margin-right: 10px;
			}
			.onlineStatus {
				flex-shrink: 0;
			}
		}
	}
}
</style>
