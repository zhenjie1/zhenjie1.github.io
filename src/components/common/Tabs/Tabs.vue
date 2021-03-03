<template>
	<div class="myTabs">
		<ul class="tabs-content">
			<li class="tab-item">
				<span class="label">标签 1标签</span>
			</li>
			<li class="tab-item active"><span class="label">标签 2</span></li>
			<li class="tab-item">
				<span class="label">标签 3</span>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'MyTabs',
})
</script>

<style scoped lang="scss">
.myTabs {
	position: relative;
	&::after {
		position: absolute;
		left: 0;
		bottom: 0;
		content: '';
		display: block;
		width: 100%;
		height: 2px;
		// background-color: var(--borderColor);
	}
	.tabs-content {
		display: flex;

		.tab-item {
			text-align: center;
			display: flex;
			height: 40px;
			flex: 1;
			height: 1.5;
			font-size: 14px;
			box-sizing: border-box;
			cursor: pointer;

			.label {
				line-height: 20px;
				@include lineOmit(2);
				margin: auto;
			}
			&.active {
				color: var(--main);
				position: relative;
				z-index: 2;

				&::after {
					content: '';
					display: block;
					width: 70%;
					height: 2px;
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					background-color: var(--main);
				}
			}
		}
	}
}
</style>
