<template>
	<div class="editorBox">
		<div
			ref="editorInput"
			class="editorTemplate"
			v-bind="$attrs"
			:contenteditable="true"
			@input="changeValue"
			@click="handlerClick"
		></div>

		<teleport to="body">
			<appoint-list
				v-show="memberModel.show"
				:members="members"
				:check-index="checkedIndex"
				class="appointList"
				:style="memberModel"
			/>
		</teleport>
	</div>
</template>

<script lang="ts">
import AppointList from './appointList.vue'
import { defineComponent, ref } from 'vue'
import { setCursorNode } from 'js/tool/cursor'
import { emitErrLog } from 'utils/prompt'

import {
	memberModel,
	editorInput,
	editorInit,
	members,
	index as checkedIndex,
} from './editor'

export default defineComponent({
	name: 'Editor',
	components: { AppointList },
	props: {
		// 是否支持 @人
		appoint: {
			type: Boolean,
			default: true,
		},
	},
	emits: {
		// emits changes 事件数据格式验证
		change(value: any) {
			if (typeof value !== 'string') emitErrLog()
			return true
		},
	},
	setup(prop, ctx) {
		const value = ref('')

		editorInit()

		return {
			value,
			memberModel,
			members,
			checkedIndex,
			editorInput,
			changeValue(e: Event) {
				const htmlDom = (e.target as never) as HTMLElement
				const text = htmlDom.innerText

				if (text === '') memberModel.show = false

				ctx.emit('change', text)
			},
		}
	},
	methods: {
		// 点击编辑区域执行
		handlerClick(e: MouseEvent) {
			const tag = e.target as HTMLElement
			if (tag.className.indexOf('appointItem') === -1) return

			if (tag.nextSibling) setCursorNode(tag.nextSibling, 0)
		},
	},
})
</script>

<style scoped>
:deep(.appointItem) {
	color: var(--main);
	padding: 0 4px;
}
</style>

<style lang="scss" scoped>
.editorTemplate {
	height: 100%;
	overflow-y: auto;
	margin: 0 4px;
	padding: 0 8px;
	line-height: 20px;
	&:focus {
		outline: none;
	}
}

.appointList {
	position: absolute;
	transform: translateY(-100%);
	// bottom: 100%;
}
</style>
