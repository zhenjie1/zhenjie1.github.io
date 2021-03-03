<template>
	<div class="list">123</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'MyList',
	created(): void {
		console.log('11111')
	},
	methods: {
		aaa(): number {
			return 123
		},
	},
})
</script>
