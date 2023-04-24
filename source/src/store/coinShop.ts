import { acceptHMRUpdate, defineStore } from 'pinia'

export const useStoresStore = defineStore('stores', () => {
  /**
   * Current name of the user.
   */
  const store = ref<Data | undefined>()
  const coin = ref<string | undefined>()

  function setStore(data: Data) {
    store.value = data
  }
  function setCoin(num: string) {
    coin.value = num
  }

  return {
    store,
    coin,
    setStore,
    setCoin,
  }
}, { persist: true })

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
