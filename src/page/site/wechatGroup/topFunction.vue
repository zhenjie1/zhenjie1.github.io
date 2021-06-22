<template>
	<div class="topFunction">
		<el-button type="primary" size="small" @click="handlerAdd">
			新建微信分组
		</el-button>
		<el-button
			type="primary"
			:disabled="!checkLeng"
			size="small"
			@click="handler('hello')"
		>
			设置欢迎语
		</el-button>
		<el-button
			:disabled="!checkLeng"
			type="primary"
			size="small"
			@click="handler('keyword')"
		>
			设置关键字
		</el-button>
		<el-button :disabled="!checkLeng" type="primary" size="small">分配客服</el-button>
		<Hello v-if="show.hello" v-model="show.hello" :checkes="select"></Hello>
		<Keyword v-if="show.keyword" v-model="show.keyword" :checkes="select"></Keyword>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, computed } from 'vue'
import { useWechatGroupFun } from './useWechatGroup'
import Hello from './hello.vue'
import Keyword from './keyword.vue'
import { GroupList } from '@/api/wechatGroup'

export default defineComponent({
	name: 'TopFunction',
	components: { Hello, Keyword },
	props: {
		// 被选中的数据
		checkes: {
			type: Array as PropType<GroupList[]>,
			default: () => [],
		},
	},
	setup(props) {
		const show: Data = reactive({
			hello: false,
			keyword: false,
		})

		const checkLeng = computed(() => props.checkes.length > 0)
		const { handlerAdd, select } = useWechatGroupFun()
		return {
			show,
			checkLeng,
			select,
			handlerAdd,
			handler(key: string) {
				show[key] = true
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.topFunction {
}
</style>
