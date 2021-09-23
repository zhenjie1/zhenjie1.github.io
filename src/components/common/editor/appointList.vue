<template>
	<ul id="appointList" class="appointList blur">
		<li
			v-for="(member, index) in members"
			:key="member.wxId"
			:class="{ checked: index === checkIndex }"
			class="appointListItem item"
		>
			<img :src="member.headImgUrl" class="avatar" />
			<span class="name">{{ member.nickName }}</span>
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from 'vue'

export default defineComponent({
	name: 'AppointList',
	props: {
		members: {
			type: Array as never as PropType<Group.member[]>,
			default: () => [],
		},
		checkIndex: {
			type: Number as PropType<Number>,
			default: '',
		},
	},
	setup(props) {
		watch(
			() => props.checkIndex,
			() => {
				setTimeout(() => {
					const li = document.querySelector('.appointListItem.checked')
					li?.scrollIntoView({ block: 'center' })
				}, 0)
			}
		)
	},
})
</script>

<style scoped lang="scss">
.appointList {
	border-radius: 4px;
	max-width: 200px;
	max-height: 400px;
	overflow-y: auto;
	box-shadow: var(--shadow);
	.item {
		display: flex;
		align-items: center;
		padding: 6px 10px;

		.avatar {
			width: 24px;
			height: 24px;
			margin-right: 10px;
		}
		.name {
			font-size: 14px;
		}

		&:hover {
			background-color: var(--bgHover);
		}
	}
}
</style>
