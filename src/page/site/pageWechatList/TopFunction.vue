<template>
	<div class="topFunction mx-sm">
		<el-form inline class="formFilter">
			<el-form-item label="筛选条件" class="nowrap">
				<el-cascader
					v-model="wechatGroupCheck"
					:options="list"
					size="small"
					collapse-tags
					placeholder="微信分组：全部"
					clearable
					class="w-44"
					:props="{ multiple: true }"
				/>
			</el-form-item>
			<el-form-item>
				<el-select
					v-model="statusCtx.check"
					placeholder="微信状态：全部"
					class="w-40"
					size="small"
				>
					<el-option
						v-for="(item, index) in statusCtx.data"
						:key="index"
						:value="item.value"
						:label="item.label"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-cascader
					v-model="f.check"
					collapse-tags
					placeholder="筛选条件: 全部"
					size="small"
					class="moreFilter w-40"
					:options="f.data"
					:props="{ multiple: true }"
					clearable
				></el-cascader>
			</el-form-item>
			<el-form-item class="m-none">
				<el-input
					v-model="filters.nickName"
					size="small"
					class="w-48"
					placeholder="输入 微信昵称/微信ID/微信号/手机号 搜索"
				></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts">
import { WechatListFilter } from '@/api/pageWechatList'
import apiData from '@/api/store'
import { computed, defineComponent, PropType, reactive, ref, watch } from 'vue'
import { flatten } from 'lodash'

export default defineComponent({
	name: 'TopFunction',
	props: {
		filters: {
			type: Object as PropType<WechatListFilter>,
			default: () => ({}),
			required: true,
		},
	},
	setup(props) {
		const statusCtx = reactive({
			data: [
				{ label: '微信状态：全部', value: '' },
				{ label: '在线', value: '1' },
				{ label: '离线', value: '0' },
				{ label: '异常', value: '2' },
				{ label: '封号', value: '3' },
			],
			check: undefined,
		})

		// 监听状态变化
		watch(
			() => statusCtx.check,
			(val) => {
				props.filters.status = val
			}
		)

		const f = reactive({
			data: [
				{ value: 'changePass', label: '已改密' },
				{ value: 'notChangePass', label: '未改密' },
				{ value: 'bindPhone', label: '已绑手机号' },
				{ value: 'bindPhoneNot', label: '未绑手机号' },
			],
			check: [],
		})

		// 监听条件筛选
		watch(
			() => f.check,
			(val: any) => {
				val = flatten(val)

				const p = val.includes('changePass')
				const pn = val.includes('notChangePass')

				const bp = val.includes('bindPhone')
				const bpn = val.includes('bindPhoneNot')

				const filter: Data = {
					isChangeCipher: undefined,
					isBindingPhone: undefined,
				}
				filter.isChangeCipher = getVal(p, pn)
				filter.isBindingPhone = getVal(bp, bpn)

				function getVal(a: boolean, b: boolean) {
					if ((a && b) || (!a && !b)) return
					if (a) return 1
					if (b) return 0
				}

				for (const i in filter) props.filters[i] = filter[i]
			}
		)

		const wechatGroupCheck = ref([])

		watch(wechatGroupCheck, (val) => {
			const value = val.map((v) => v[1])

			props.filters.uins = value
		})

		return {
			f,
			wechatGroupCheck,
			list: computed(() => apiData.wechatGroup.all),
			statusCtx,
		}
	},
})
</script>

<style lang="scss" scoped>
.topFunction {
	.formFilter {
		display: flex;
	}
}
</style>
