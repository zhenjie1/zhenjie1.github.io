import groupMemberData from 'components/wechat/friendGroupConver/friend'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { debounce } from 'lodash'
import { insertDom } from 'js/tool/dom'
import { getCursorPosition, setCursorNode } from 'js/tool/cursor'
import { searchFriendData } from 'js/tool/wechat'

// 选择群成员弹出层相关数据
export const memberModel = reactive({
	show: false, // 是否显示
	left: '10px', // x 轴位置
	top: '0px', // y 轴位置
})

// 群成员数据
export const members = ref<any[]>([])
export const index = ref(0)

/**
 * 修改 showMember 的值
 *
 * @param {boolean} value 值
 * @returns {void}
 */
export function changeShowMember(value: boolean) {
	memberModel.show = value
}

// 可编辑元素
export const editorInput = ref<HTMLDivElement>()

// 键盘按下事件
const keydownFunction = debounce(function (this: HTMLDivElement, e: KeyboardEvent) {
	const targetTag = editorInput.value
	if (!targetTag) return

	const len = members.value.length
	if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
		const cumulative = e.key === 'ArrowUp' ? -1 : 1

		if (cumulative > 0) {
			index.value = index.value >= len - 1 ? 0 : index.value + cumulative
		} else {
			index.value = index.value === 0 ? len - 1 : index.value + cumulative
		}
		return
	}

	if (e.key === '@') selectMember.call(this)
	// 点击删除键
	else if (e.key === 'Backspace') {
		changeEditorText.call(this)
	} else if (e.key === 'Alt') {
		const appoint = document.createElement('span')
		appoint.innerText = '@指定人'
		appoint.contentEditable = 'false'
		appoint.className = 'appointItem'

		// 用来点击后 或 插入后 获取焦点使用
		const TSpace = document.createTextNode(' ')
		insertDom(targetTag, [appoint, TSpace])

		const style = appoint.getBoundingClientRect()
		memberModel.left = style.left + 'px'
		memberModel.top = `${style.top - 10}px`
		memberModel.show = true

		setCursorNode(TSpace, TSpace.length)
	} else {
		changeEditorText.call(this)
	}
}, 100)

/**
 * 修改编辑区域的文字
 *
 * @param {HTMLDivElement} this this指向
 */
function changeEditorText(this: HTMLDivElement) {
	const rang = window.getSelection()!.getRangeAt(0)
	let text = rang.endContainer.nodeValue || ''

	if (text.indexOf('@') === -1) return // 输入的文字中没有 @ 符号

	const cursorIndex = getCursorPosition(this) // 当前光标位置

	const cursorPrev = text.substr(0, cursorIndex) // 当前光标之前的文字
	const cursorAppointIndex = cursorPrev.lastIndexOf('@') // 查找 @ 符合的位置

	if (cursorAppointIndex === -1) return // 此光标之前没有 @ 符合

	text = cursorPrev.substr(cursorAppointIndex + 1).split(' ')[0] // +1 是把 @ 符合忽略

	const data = groupMemberData as Group.member[]
	members.value = searchFriendData(data, text)
	index.value = 0
}

/**
 * 触发选择成员
 *
 * @param {HTMLDivElement} this this指向
 */
export function selectMember(this: HTMLDivElement) {
	memberModel.show = true
	const { endContainer, endOffset } = window.getSelection()!.getRangeAt(0)
}

/**
 * 初始化
 */
export function editorInit() {
	onMounted(() => {
		if (editorInput.value?.innerHTML === '') {
			const before = document.createElement('span')
			editorInput.value.appendChild(before)
		}

		editorInput.value!.addEventListener('keydown', keydownFunction)
	})

	onBeforeUnmount(() => {
		editorInput.value!.removeEventListener('keydown', keydownFunction)
	})
}
