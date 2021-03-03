<template>
	<div class="UploadImage">
		<slot></slot>
		<input type="file" :accept="accept" :multiple="multiple" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'UploadImage',
	props: {
		value: {
			type: Object,
			default: () => ({}),
		},
		accept: {
			type: String,
			default: '',
		},
		multiple: {
			type: Boolean,
			default: true,
		},
		max: {
			type: Number,
			default: 9,
		},
	},
})
</script>

<style lang="scss" scoped>
.UploadImage {
	display: inline-block;
}
</style>
