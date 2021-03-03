<template>
	<div class="general">
		<el-form :model="general" label-width="140px">
			<el-form-item label="消息记录:">
				<el-checkbox
					v-model="general.promptTone"
					label="退出时保留聊天记录"
				></el-checkbox>
			</el-form-item>
			<el-form-item label="语音转文字:">
				<el-checkbox
					v-model="general.banner"
					label="聊天中的语音消息自动转成文字"
				></el-checkbox>
			</el-form-item>
			<el-form-item label="下载文件保存位置:">
				<div class="downloadPath">
					<p class="path">/user/zhenjie/Download</p>
					<el-button type="primary" @click="changeDownloadPath">修改</el-button>
				</div>
				<!-- <el-checkbox v-model="general.detail" label="显示消息详情"></el-checkbox> -->
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'General',
	data() {
		return {
			general: {
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
		changeDownloadPath() {
			window.open(location.href, 'newwindow', 'height=100,width=400')
		},
	},
})
</script>

<style lang="scss" scoped>
.general {
	.downloadPath {
		display: flex;
		.path {
			margin-right: 10px;
		}
	}
}
</style>
