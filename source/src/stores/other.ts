import { acceptHMRUpdate, defineStore } from 'pinia'

export const useOtherStore = defineStore('other', () => {
  /**
   * Current name of the user.
   */
  const touchDisabled = ref(false)
  watch(touchDisabled, (value) => {
    if (value) document.documentElement.classList.add('overflow-hidden')
    else document.documentElement.classList.remove('overflow-hidden')
  }, { immediate: true })

  function setTouch(status: boolean) {
    touchDisabled.value = status
    onUnmounted(() => {
      touchDisabled.value = false
    })
  }

  return {
    touchDisabled,
    setTouch,
  }
}, {
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
