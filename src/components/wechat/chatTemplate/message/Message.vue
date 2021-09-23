<template>
	<div class="MessageTemplate">
		<pre>{{ friend }}</pre>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'MessageTemplate',
	props: {
		friend: {
			type: Object,
			default: undefined,
		},
	},
	setup() {},
})
</script>

<style scoped lang="scss">
.MessageTemplate {
	overflow-y: auto;
	padding-top: 51px;
}
</style>
