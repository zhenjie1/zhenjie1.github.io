<template>
	<div class="chatHistory">
		<div ref="el" class="el"></div>
	</div>
</template>

<script lang="ts">
import anime from 'animejs'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ChatHistory',
	setup() {
		// const battery = reactive({
		// 	charged: '0%',
		// 	qqq: '0%',
		// 	cycles: 120,
		// })
		// anime({
		// 	targets: battery,
		// 	qqq: 123,
		// 	charged: '100%',
		// 	cycles: 130,
		// 	round: 1,
		// 	easing: 'linear',
		// 	update: function () {
		// 		console.log('uoload')
		// 	},
		// })
		// return {
		// 	battery,
		// }
	},
	data() {
		return {}
	},
	created() {
		this.initDataFn()
	},
	mounted() {
		const el = this.$refs.el as HTMLElement
		anime({
			targets: el,
			translateX: {
				value: [50, 250], // 100px * 2.5 = '250px'
				duration: 1000,
			},
			width: {
				value: '-=20px', // 28 - 20 = '8px'
				duration: 1800,
				easing: 'easeInOutSine',
			},
			rotate: {
				value: '+=2turn', // 0 + 2 = '2turn'
				duration: 1800,
				easing: 'easeInOutSine',
			},
			direction: 'alternate',
		})
	},
	methods: {
		// 初始化数据
		initDataFn() {},
	},
})
</script>

<style lang="scss" scoped>
.chatHistory {
	position: relative;
	.el {
		background-color: red;
		position: absolute;
		left: 0;
		width: 25px;
		height: 25px;
		border-radius: 100%;
		transform: translateX(1px);
	}
}
</style>
