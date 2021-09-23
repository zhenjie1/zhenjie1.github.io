import { onMounted, reactive, ref, computed, toRefs, watch, onActivated } from 'vue'
import { throttle, debounce } from 'lodash'

/**
 * 虚拟 dom 处理
 *
 * @param {IVirtualParams} props 参数1
 * @returns {object} 返回所需值
 */
export default function useVirtualScroll(props: Virtual.params): Virtual.returns {
	const { topOffset, itemHeight } = props
	const offsetLength = 2 // 上下多渲染的个数

	const defaultShowNumber = 15 // 默认渲染个数
	// 父级 dom
	const parentDom = ref<HTMLElement>()
	// 显示的个数
	const showNumber = ref(defaultShowNumber)

	// 可显示数据对应的索引
	const posIndex = reactive<number[]>([])

	const data = reactive({
		showData: [], // 可显示的数据
		allData: props.data, // 所有的数据
	})

	const parentHeight = computed(() => +props.data.length * props.itemHeight + topOffset)

	const startIndex = ref(0) // 开始索引

	/**
	 * 父级 dom 滚动时执行
	 *
	 * @returns {void}
	 */
	function scrollEv() {
		// 如果数据为空
		if (props.data.length === 0) return
		if (!parentDom.value) throw new Error('没有找到父节点!')
		const y = (parentDom.value.scrollTop || 0) - topOffset

		// 开始索引
		const sIndex = Math.floor(y / itemHeight) - offsetLength
		startIndex.value = sIndex >= 0 ? sIndex : 0
		const endIndex = startIndex.value + showNumber.value + offsetLength * 2
		// 生成位置索引
		const elIndex = endIndex - startIndex.value
		for (let i = 0; i < elIndex; i++) posIndex[i] = i + startIndex.value

		// 分割数据
		data.showData = props.data.slice(startIndex.value, endIndex) as never[]
	}

	// 从缓存读取时, 运行一次
	onActivated(scrollEv)

	// 数据本身发生变化
	watch(() => props.data, scrollEv)

	onMounted(() => {
		if (!parentDom.value) throw new Error('没有找到父节点!')

		watch(() => showNumber.value, scrollEv)

		parentDom.value.addEventListener('scroll', throttle(scrollEv, 50))

		// 计算可以显示多少个数据
		showNumber.value = calcShowNumber({
			dom: parentDom.value,
			itemHeight: props.itemHeight,
			defaultNumber: props.showNumber || defaultShowNumber,
			offsetTop: topOffset,
		})

		scrollEv()
	})

	window.addEventListener(
		'resize',
		debounce(() => {
			showNumber.value = calcShowNumber({
				dom: parentDom.value,
				itemHeight: props.itemHeight,
				defaultNumber: props.showNumber || defaultShowNumber,
				offsetTop: topOffset,
			})
		}, 100)
	)

	return reactive({
		parentDom,
		posIndex,
		...toRefs(data),
		startIndex,
		parentHeight,
	})
}

interface CalcShowNumber {
	dom?: HTMLElement // 要计算的html元素
	itemHeight: number // 每项的高度
	defaultNumber: number // 默认显示个数
	offsetTop?: number // 顶部偏移量
}

/**
 * 计算可显示的个数
 *
 * @param {CalcShowNumber} options 配置参数
 * @returns {number} 返回个数
 */
function calcShowNumber(options: CalcShowNumber): number {
	const { defaultNumber, dom, itemHeight, offsetTop = 0 } = options
	if (!dom) return defaultNumber

	const calc = Math.ceil(dom.offsetHeight / itemHeight)

	return calc || options.defaultNumber
}
