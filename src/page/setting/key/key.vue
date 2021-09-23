<template>
	<div class="key">
		<el-form :model="keys" label-width="90px">
			<el-form-item label="发送消息">
				<el-select v-model="keys.sendMessage" class="sendMessage" placeholder="">
					<el-option label="Return" value="Enter"></el-option>
					<el-option label="Command+Return" value="Meta+Enter"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="截图">
				<el-input
					v-keyword="keys.screenshot"
					readonly
					:value="keys.screenshot.key.join('+')"
					class="input"
					placeholder="记录快捷键"
				></el-input>
			</el-form-item>
			<el-form-item label="激活窗口">
				<el-input
					v-keyword="keys.activate"
					readonly
					:value="keys.activate.key.join('+')"
					placeholder="记录快捷键"
				></el-input>
			</el-form-item>
			<el-form-item label="锁定">
				<el-input
					v-keyword="keys.lock"
					readonly
					:value="keys.lock.key.join('+')"
					placeholder="记录快捷键"
				></el-input>
			</el-form-item>
			<el-form-item label="搜索联系人">
				<el-input
					v-keyword="keys.search"
					readonly
					:value="keys.search.key.join('+')"
					placeholder="记录快捷键"
				></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'Key',
	data() {
		return {
			keys: {
				sendMessage: 'Enter',
				screenshot: {
					change: false,
					key: ['Shift', 'Meta', 'A'],
				},
				activate: {
					change: false,
					key: ['Shift', 'Meta', 'O'],
				},
				lock: {
					change: false,
					key: ['Shift', 'Meta', 'W'],
				},
				search: {
					change: false,
					key: ['Shift', 'Meta', 'F'],
				},
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

<style>
.key .input .el-input__inner {
	ime-mode: disabled;
	/* background-color: red; */
}
</style>

<style lang="scss" scoped>
.key {
	width: 300px;
	margin: 0 auto;

	.sendMessage {
		width: 100%;
	}
}
</style>
