<template>
	<div>
		<el-dialog
			v-model="show"
			append-to-body
			title="设置欢迎语"
			width="400px"
			@close="show = false"
		>
			<el-form ref="formEl" label-width="100px" :model="form" :rules="rules">
				<el-form-item label="是否开启" prop="isTurnOn">
					<el-radio-group v-model="form.isTurnOn">
						<el-radio :label="1">关闭</el-radio>
						<el-radio :label="0">开启</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item v-if="isOpen" label="延迟时间" required>
					<el-row>
						<el-col :span="10">
							<el-form-item prop="startInterval">
								<el-input
									v-model="form.startInterval"
									size="small"
									class="text-center w-full"
									placeholder="2-7200"
								/>
							</el-form-item>
						</el-col>
						<el-col :span="2" class="mx-xs text-center">-</el-col>
						<el-col :span="10">
							<el-form-item prop="endInterval">
								<el-input
									v-model="form.endInterval"
									size="small"
									class="w-full text-center"
									placeholder="2-7200"
								/>
							</el-form-item>
						</el-col>
						<el-col :span="2" class="ml-xs text-center">秒</el-col>
					</el-row>
				</el-form-item>
				<el-form-item v-if="isOpen" label="欢迎语模版" prop="helloId">
					<my-select
						v-model="form.helloId"
						class="w-full"
						one-key="id"
						label="templateName"
						:loadmore="selectLoadmore"
					/>
				</el-form-item>
			</el-form>

			<template #footer>
				<span class="dialog-footer">
					<el-button size="small" @click="show = false"> 取 消 </el-button>
					<el-button size="small" type="primary" :loading="loading" @click="submit">
						确 定
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { api } from '@/api'
import { GroupList, SetHelloParams } from '@/api/'
import { validatorNumberRange } from '@/assets/js/formValidate'
import { useVModel } from '@vueuse/core'
import { computed, defineComponent, reactive, ref, PropType, getCurrentInstance } from 'vue'

export default defineComponent({
	name: 'Hello',
	props: {
		// 被选中的数据
		checkes: {
			type: Array as PropType<GroupList[]>,
			default: () => [],
		},
		modelValue: {
			type: Boolean,
			default: true,
		},
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const show = useVModel(props, 'modelValue', emit)
		const form = reactive({
			isTurnOn: 1,
			startInterval: '',
			endInterval: '',
			helloId: '' as any as number,
		})
		const isOpen = computed(() => form.isTurnOn === 0)

		const formEl = ref()

		const loading = ref(false)

		const current = getCurrentInstance()!

		return {
			isOpen,
			formEl,
			form,
			loading,
			selectLoadmore: (page: any) => api.hello.list(...page),
			rules: {
				isTurnOn: [{ required: true, message: ' ', trigger: 'change' }],
				startInterval: [
					{ required: true, message: '开始间隔不能为空', trigger: 'blur' },
					{
						validator: validatorNumberRange,
						min: 2,
						max: 7200,
						trigger: 'blur',
					},
				],
				endInterval: [
					{ required: true, message: '结束间隔不能为空', trigger: 'blur' },
					{
						validator: validatorNumberRange,
						min: 2,
						max: 7200,
						trigger: 'blur',
					},
				],
				helloId: [{ required: true, message: '请选择模板', trigger: 'change' }],
			},
			show,
			handlerClose() {
				show.value = false
			},
			submit() {
				formEl.value.validate(async (valid: boolean) => {
					if (!valid) return

					const data: SetHelloParams = {
						cServiceIds: props.checkes.map((v) => v.userId),
						groupIds: props.checkes.map((v) => v.groupId),
						isTurnOn: form.isTurnOn,
						timeInterval: `${form.startInterval}-${form.endInterval}`,
						wechatKeyGroupName: form.helloId,
						welcomeTemplateId: form.helloId,
					}

					loading.value = true
					await api.hello
						.setHello(data)
						.then(() => {
							const parent: any = current?.parent
							parent?.setupState.refreshEv?.()
						})
						.finally(() => (loading.value = false))

					show.value = false
				})
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.hello {
}
</style>
