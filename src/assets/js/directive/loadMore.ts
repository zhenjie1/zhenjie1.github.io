import { isObject } from '@vueuse/core'
import { ApiTablePage } from 'typings/components/tablepage'
import { Directive } from 'vue'

type Page = {
	index: number
	size: number
	total: number
	lock: boolean
}

export default function loadMore(): Directive {
	return {
		mounted(el: HTMLElement, binding) {
			if (!binding.value) return
			if (!isObject(binding.value)) {
				throw new Error('参数只能是 function 类型')
			}

			// 分页数据
			const page: Page = {
				index: 1,
				size: 10,
				total: 1000,

				lock: false, // 锁🔒
			}

			const { clas, loadmore, index, size } = binding.value as any
			if (!loadmore) return

			if (index) page.index = index
			if (size) page.size = size

			if (!clas) throw new Error('请传入生成的 class 名称')

			const selectDom = getElement(clas)
			if (!selectDom) return console.warn('没找到 dom', clas)

			// 请求第一页数据
			loadNextData(loadmore, page)

			selectDom.addEventListener('scroll', function (this: Element) {
				const { scrollHeight, scrollTop, clientHeight } = this
				const condition = scrollHeight - scrollTop <= clientHeight
				// 还未滚动到底部呢
				if (!condition) return
				// debugger
				if (page.size * page.index >= page.total) return console.log('done') // 已经显示全部了
				if (page.lock) return console.warn('上次的请求还未返回')

				// 加载下一页
				loadNextData(loadmore, page)
			})
		},
	}
}

// 加载下一页数据
function loadNextData(loadmoreFn: Function, page: Page) {
	page.lock = true
	const p = loadmoreFn([page.index, page.size, false])

	if (!(p instanceof Promise)) {
		page.index++
		page.lock = false
		return
	}

	p.then((res: ApiTablePage<any>) => {
		if (!isObject(res)) return console.warn('忘记返回参数啦!!!')

		page.total = res.total
		page.index++ // 下次请求下一页
	}).finally(() => {
		page.lock = false // 恢复锁状态
	})
}

function getElement(el: string | Element) {
	if (el instanceof Element) return el

	return document.querySelector(`.${el}`)
}
