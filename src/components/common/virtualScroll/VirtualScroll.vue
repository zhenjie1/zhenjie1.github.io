<template>
	<div ref="parentDom" class="VirtualScroll" :style="{ height: height }">
		<p
			v-if="data.length === 0"
			class="promptText"
			:style="{ paddingTop: topOffset + 20 + 'px' }"
		>
			{{ promptText }}
		</p>
		<ul v-else :style="{ height: `${parentHeight}px` }" class="virtualContent">
			<li
				v-for="(item, index) in showData"
				:key="item.wxId || index"
				class="virtualItem"
				:style="{ top: topOffset + posIndex[index] * itemHeight + 'px' }"
			>
				<!-- <span style="position: absolute; top: 0; left: 0">
					sI: {{ startIndex }} len:{{ showData.length }}</span
				> -->
				<slot :item="item" :index="posIndex[index]" />
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, watchEffect, onActivated } from 'vue'
import useVirtualScroll from './VirtualScroll'

export default defineComponent({
	name: 'VirtualScroll',
	props: {
		// 要显示的数据
		data: {
			type: Array,
			required: true,
			default: () => [],
		},
		// 根元素的高的
		height: {
			type: String,
			default: '100%',
		},
		// 每一项的高度
		itemHeight: {
			type: Number,
			required: true,
		},
		// 每次渲染的个数
		showNumber: {
			type: Number,
			default: 10,
		},
		// 数据为空时的提示
		promptText: {
			type: String,
			default: '暂无数据',
		},
		// 顶部偏移量
		topOffset: {
			type: Number,
			default: 0,
		},
		// 顶部多渲染的个数
		topOffsetIndex: {
			type: Number,
			default: 2,
		},
	},
	emits: ['scrollEv'],
	setup(props, ctx) {
		const params = useVirtualScroll(props as any)

		// startIndex 变化, 说明滚动条位置发生了变化
		watchEffect(() => {
			if (params.startIndex) ctx.emit('scrollEv', params)
		})

		return {
			...toRefs(params),
		}
	},
})
</script>

<style lang="scss" scoped>
.promptText {
	line-height: 40px;
	text-align: center;
}
.VirtualScroll {
	overflow-y: auto;
	.virtualContent {
		position: relative;

		.virtualItem {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
		}
	}
}
</style>
