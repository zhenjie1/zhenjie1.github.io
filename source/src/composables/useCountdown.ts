/**
 * 倒计时
 */
const useCountdown = ({ initText = '发送验证码', retryText = '重新发送' } = {}) => {
  const isStart = ref(false)
  const num = ref(60)
  const count = ref(0)
  const text = computed(() => {
    return isStart.value
      ? `${num.value}s`
      : count.value === 0
        ? initText
        : retryText
  })

  const startEvent = () => {
    if (isStart.value) return

    isStart.value = true

    const time = setInterval(() => {
      --num.value
      if (num.value <= 0) {
        count.value++
        clearTimeout(time)
        num.value = 60
        isStart.value = false
      }
    }, 1000)
  }

  return reactive({ isStart, text, startEvent })
}

export default useCountdown
