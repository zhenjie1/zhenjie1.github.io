<template>
	<div v-size.left="size" class="ChatRichText">
		<chat-tool-menu />
		<Editor class="textarea" />
		<div class="positionDrop" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ChatToolMenu from './ChatToolMenu.vue'
import { DirectiveSizeOptions } from 'js/directive/viewSize'
import Editor from 'components/common/editor/editor.vue'

export default defineComponent({
	name: 'ChatRichText',
	components: { ChatToolMenu, Editor },
	setup() {
		const input = ref('')

		const size: DirectiveSizeOptions = {
			minHeight: 140,
			maxHeight: 400,
			drop: '.positionDrop',
		}

		return {
			input,
			size,
		}
	},
})
</script>

<style lang="scss" scoped>
.ChatRichText {
	border-top: 1px solid var(--borderColor);
	display: flex;
	flex-direction: column;
	position: relative;

	.positionDrop {
		position: absolute;
		top: 0;
		left: 0;
		transform: translateY(-50%);
		width: 100%;
		height: 6px;
		cursor: row-resize;
		background-color: transparent;
	}

	.textarea {
		background-color: transparent;
		border: none;
		outline: none;
		flex: 1 1 150px;
		overflow: hidden;
		&:focus {
			box-shadow: none;
		}
	}
}
</style>
