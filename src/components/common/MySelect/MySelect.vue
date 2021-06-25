<template>
	<el-select
		v-model="check"
		v-loadmore="loadmoreParams"
		:popper-class="clas"
		placeholder=""
		@change="handlerChange"
	>
		<el-option
			v-for="item in selectList"
			:key="item[oneKey]"
			:label="item[label]"
			:value="item[oneKey]"
		></el-option>
	</el-select>
</template>

<script lang="ts">
import { random } from 'lodash'
import { defineComponent, PropType, ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'

export default defineComponent({
	name: 'MySelect',
	props: {
		// 被选中的数据，用于外部读取当前选中项的完整数据
		checked: {
			type: Object,
			default: undefined,
		},
		// 与 el-select 一致
		modelValue: {
			type: String as PropType<string | number>,
			default: '',
			required: true,
		},
		/**
		 * data 与 loadmore 传一个即可
		 */
		data: {
			type: Array as PropType<any[]>,
			default: () => [],
		},
		// api 接口
		loadmore: {
			type: Function,
			default: () => Promise.resolve(),
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
	},
	emits: ['update:checked', 'change'],
	setup(props, { emit }) {
		const check = useVModel(props, 'modelValue', emit)

		const randomNum = random(10000000)
		const clas = `my-select-${Date.now()}-${randomNum} .el-select-dropdown__wrap`

		const selectList = ref(props.data)

		watch(check, (val) => {
			const target = selectList.value.find((v) => v[props.oneKey] === val)
			emit('update:checked', target)
		})

		const loadmoreParams = {
			clas,
			list: selectList,
			loadmore: props.loadmore,
		}
		return {
			selectList,
			loadmoreParams,
			clas,
			check,
			handlerChange(id: any) {
				const target = selectList.value.find((v) => v[props.oneKey] === id)
				emit('change', target)
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.mySelect {
}
</style>
