<template>
	<div class="hello">
		<button @click="show = !show">切换</button>
		{{ show }}
		<transition name="fade">
			<p v-if="show" class="test">123 456</p>
		</transition>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Hello',
	data() {
		return {
			show: false,
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
.hello {
	.test {
	}
}
</style>
