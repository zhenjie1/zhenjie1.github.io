<script lang="ts">
import { defineComponent, reactive, h } from 'vue'
import UploadImage from 'components/common/UploadImage.vue'

// <template>
// 	<div class="ChatToolMenu">
// 		<ul class="left">
// 			<li v-for="(item, index) in toolMenu" :key="index" class="item">
// 				<i
// 					class="iconfont icon"
// 					:class="[item.icon]"
// 					:title="item.title"
// 				/>
// 			</li>
// 		</ul>
// 	</div>
// </template>

export default defineComponent({
	name: 'ChatToolMenu',
	components: { UploadImage },
	setup() {
		const toolMenu = reactive([
			{ icon: 'icon-biaoqing', title: '表情' },
			{ icon: 'icon-wenjian', title: '文件', file: true },
			{ icon: 'icon-jietu', title: '截图' },
			{ icon: 'icon-xiaoxi', title: '消息' },
		])

		return {
			toolMenu,
		}
	},
	render() {
		const menu = this.toolMenu.map((item) => {
			const icon = h('i', {
				class: { iconfont: true, icon: true, [item.icon]: true },
				title: item.title,
			})

			const input = item.file
				? h('input', { type: 'file', class: 'inputFile' })
				: ''

			return h('li', { class: 'item' }, [icon, input])
		})

		return h('div', { class: 'ChatToolMenu' }, [h('ul', { class: 'left' }, menu)])
	},
})
</script>

<style lang="scss">
.ChatToolMenu {
	.left {
		display: flex;
		.item {
			position: relative;
			overflow: hidden;
			.icon {
				width: 40px;
				text-align: center;
				line-height: 40px;
				height: 40px;
			}

			.inputFile {
				opacity: 0;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				z-index: 10;
			}
		}
	}
}
</style>
