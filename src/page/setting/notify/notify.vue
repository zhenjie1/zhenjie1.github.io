<template>
	<div class="notify">
		<el-form :model="notify" label-width="40px">
			<el-form-item label="">
				<el-checkbox
					v-model="notify.promptTone"
					disabled
					label="消息提示音"
				></el-checkbox>
			</el-form-item>
			<el-form-item label="">
				<el-checkbox
					v-model="notify.banner"
					label="打开屏幕横幅通知"
				></el-checkbox>
			</el-form-item>
			<el-form-item label="">
				<el-checkbox v-model="notify.detail" label="显示消息详情"></el-checkbox>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Notify',
	data() {
		return {
			notify: {
				promptTone: false,
				banner: false,
				detail: true,
			},
		}
	},
	created() {
		this.initDataFn()
	},
	methods: {
		// 初始化数据
		initDataFn() {},
	},
})
</script>

<style lang="scss" scoped>
.notify {
}
</style>
