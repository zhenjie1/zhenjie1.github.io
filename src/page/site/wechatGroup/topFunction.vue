<template>
	<div class="topFunction">
		<el-button type="primary" size="small" @click="handlerAdd"> 新建微信分组 </el-button>
		<el-button type="primary" :disabled="!checkLeng" size="small" @click="handler('hello')">
			设置欢迎语
		</el-button>
		<el-button :disabled="!checkLeng" type="primary" size="small" @click="handler('keyword')">
			设置关键字
		</el-button>
		<el-button :disabled="!checkLeng" type="primary" size="small">分配客服</el-button>
		<Hello v-if="show.hello" ref="hello" v-model="show.hello" :checkes="select"></Hello>
		<Keyword
			v-if="show.keyword"
			ref="keyword"
			v-model="show.keyword"
			:checkes="select"
		></Keyword>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, computed, getCurrentInstance } from 'vue'
import { useWechatGroupFun } from './useWechatGroup'
import Hello from './hello.vue'
import Keyword from './keyword.vue'
import { GroupList } from '@/api/wechatGroup'
import { getRef } from '@/utils'

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

		const current = getCurrentInstance()!

		return {
			show,
			checkLeng,
			select,
			handlerAdd,
			refreshEv() {
				const parent: any = current?.parent
				parent?.setupState.refreshEv?.()
			},
			handler(key: string) {
				show[key] = true

				if (props.checkes.length !== 1) return

				const { keyWord, timeInterval, welcomeTemplateId, welcomeTimeInterval } = props
					.checkes[0] as any
				if (key === 'hello') {
					if (!welcomeTimeInterval) return

					const [startInterval, endInterval] = timeInterval.split('-')

					setTimeout(() => {
						const helloTemp: any = current.refs.hello
						helloTemp.form.startInterval = startInterval
						helloTemp.form.endInterval = endInterval
						helloTemp.form.isTurnOn = 0
						helloTemp.form.helloId = welcomeTemplateId
					}, 0)
				} else if (key === 'keyword') {
					if (!keyWord) return
					const [startInterval, endInterval] = welcomeTimeInterval.split('-')
					setTimeout(() => {
						const keywordTemp: any = current.refs.keyword
						keywordTemp.form.startInterval = startInterval
						keywordTemp.form.endInterval = endInterval
						keywordTemp.form.isTurnOn = 0
						keywordTemp.form.helloId = keyWord
					}, 0)
				}
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.topFunction {
}
</style>
