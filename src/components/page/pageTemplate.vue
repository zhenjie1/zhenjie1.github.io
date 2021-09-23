<template>
	<div class="pageTemplate">
		<div class="container">
			<div ref="otherFunction" class="otherFunction">
				<div class="btns">
					<slot name="btns"></slot>
				</div>
				<div class="function ml-3">
					<slot name="function"></slot>
				</div>
			</div>
			<div class="tableContent">
				<slot name="table" :maxHeight="maxHeight">{{ maxHeight }}</slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import tableHeightObserver from '@/assets/js/domObserver/tableHeightObserver'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'PageTemplate',
	setup() {
		const { maxHeight } = tableHeightObserver({ el: 'otherFunction' })
		return {
			maxHeight,
		}
	},
})
</script>

<style lang="scss" scoped>
.pageTemplate {
	width: 100%;
	height: 100%;
}
</style>
