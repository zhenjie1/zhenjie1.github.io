<template>
	<el-select v-model="check" v-loadmore="loadmoreParams" :popper-class="clas" placeholder="">
		<el-option
			v-for="item in data"
			:key="item[oneKey]"
			:label="item[label]"
			:value="item[oneKey]"
		></el-option>
	</el-select>
</template>

<script lang="ts">
import { random } from 'lodash'
import { defineComponent, PropType } from 'vue'
import { useVModel } from '@vueuse/core'

export default defineComponent({
	name: 'MySelect',
	props: {
		// 与 el-select 一致
		modelValue: {
			type: String as PropType<string | number>,
			default: '',
			required: true,
		},
		// 数据
		data: {
			type: Array as PropType<any[]>,
			default: () => [],
			required: true,
		},
		// 唯一标识
		oneKey: {
			type: String,
			default: 'id',
			required: true,
		},
		// label
		label: {
			type: String,
			default: 'id',
			required: true,
		},
		loadmore: {
			type: Function,
			default: () => Promise.resolve(),
		},
	},
	setup(props, { emit }) {
		const check = useVModel(props, 'modelValue', emit)

		const randomNum = random(10000000)
		const clas = `my-select-${Date.now()}-${randomNum} .el-select-dropdown__wrap`

		const loadmoreParams = {
			clas,
			loadmore: props.loadmore,
		}
		return {
			loadmoreParams,
			clas,
			check,
		}
	},
})
</script>

<style lang="scss" scoped>
.mySelect {
}
</style>
