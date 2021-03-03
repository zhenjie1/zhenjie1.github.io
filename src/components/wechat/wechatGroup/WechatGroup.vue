<template>
	<div class="wechatGroupComponents">
		<div v-for="group in wechatData" :key="group.id" class="group-content">
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
				></friend-item>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, PropType } from 'vue'
import FriendItem from '../friendGroupConver/FriendItem.vue'
import wechatIcon from 'assets/logo.png'

interface WechatData {
	groupName: string
	id: number
	children: Wechat.data[]
}

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
		const wechatData: WechatData[] = reactive([
			{
				groupName: '分组名',
				id: Math.random() * 100,
				children: [
					{
						id: '123',
						wxId: 'wxId_123321ghfghfghjf32',
						uin: Math.random() * 10000,
						nickName: '第一个微信第一个微信第一个微信',
						headImgUrl: wechatIcon,
						groupId: 123,
						status: 2,
					},
					{
						id: '123',
						groupId: 123,
						status: 2,
						wxId: 'wxId_asdfdsq313213312',
						uin: Math.random() * 10000,
						nickName: '第一个微信第一个微信第一个微信',
						headImgUrl: wechatIcon,
					},
				],
			},
			{
				groupName: '分组名',
				id: Math.random() * 100,
				children: [
					{
						id: '123',
						groupId: 123,
						status: 2,
						wxId: 'wxId_123321ghfghfghjf32',
						uin: Math.random() * 10000,
						nickName: '第一个微信第一个微信第一个微信',
						headImgUrl: wechatIcon,
					},
					{
						id: '123',
						groupId: 123,
						status: 2,
						wxId: 'wxId_123321ghfg213f32',
						uin: Math.random() * 10000,
						nickName: '第一个微信第一个微信第一个微信',
						headImgUrl: wechatIcon,
					},
					{
						id: '123',
						groupId: 123,
						status: 2,
						wxId: 'wxId_123321123213f32',
						uin: Math.random() * 10000,
						nickName: '第一个微信第一个微信第一个微信',
						headImgUrl: wechatIcon,
					},
					{
						id: '123',
						groupId: 123,
						status: 2,
						wxId: 'wxId_asdfdsq313213312',
						uin: Math.random() * 10000,
						nickName: '第一个微信第一个微信第一个微信',
						headImgUrl: wechatIcon,
					},
				],
			},
			{
				groupName: '分组名',
				id: Math.random() * 100,
				children: [
					{
						id: '123',
						groupId: 123,
						status: 2,
						wxId: 'wxId_123321ghfghfghjf32',
						uin: Math.random() * 10000,
						nickName: '第一个微信第一个微信第一个微信',
						headImgUrl: wechatIcon,
					},
					{
						id: '123',
						groupId: 123,
						status: 2,
						wxId: 'wxId_asdfdsq313213312',
						uin: Math.random() * 10000,
						nickName: '第一个微信第一个微信第一个微信',
						headImgUrl: wechatIcon,
					},
					{
						id: '123',
						groupId: 123,
						status: 2,
						wxId: 'wxId21313213312',
						uin: Math.random() * 10000,
						nickName: '第一个微信第一个微信第一个微信',
						headImgUrl: wechatIcon,
					},
				],
			},
		])

		const handlerClickWechat = function handlerClickWechat(wechat: Wechat.data) {
			ctx.emit('checked', wechat)
		}

		const isCheck = computed(() => (wechat: Wechat.data) =>
			wechat && wechat.uin === props.wechat?.uin
		)

		return {
			handlerClickWechat,
			isCheck,
			wechatData,
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
			color: var(--colorDeepGray);
			position: sticky;
			top: 0;
			z-index: 10;
			margin: 0 1px;
			// border-bottom: 1px solid var(--borderColor);
		}
	}
}
</style>
