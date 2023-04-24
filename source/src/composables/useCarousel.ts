import type { Ref } from 'vue'

interface Options {
  duration?: number
}
function useCarousel(noticeList: Ref<any[]>, itemHeight: string, options: Options = {}) {
  const { duration = 3100 } = options
  const y = ref('')
  const isAnimate = ref(true)

  watch(noticeList, startScroll)
  if (noticeList.value.length > 0) {
    startScroll()
  }

  let time: NodeJS.Timeout | null = null
  function startScroll() {
    time && clearInterval(time)
    time = setInterval(() => {
      isAnimate.value = true
      y.value = `calc(-${itemHeight} * 1)`

      setTimeout(() => {
        isAnimate.value = false
        y.value = '0'
        noticeList.value.push(noticeList.value[0])
        noticeList.value.shift()
      }, 300)
    }, duration)
  }

  return { y, isAnimate }
}

export default useCarousel
