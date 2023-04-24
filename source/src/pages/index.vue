<script lang="ts" setup>
import { createSocket, onSocketMessage, sendMessage } from '~/assets/js/socket'

createSocket()

const disabled = ref(false)
const receiveMessage = ref(`Nuxt.js 2.0升级了以下主要组件：

1. Vue.js 2.5.0以及以上版本
2. Webpack 4.0.0以及以上版本
3. Babel 7.0.0以及以上版本
4. Node.js v8.0.0以及以上版本
5. Vuex 3.0.1以及以上版本
6. Vue Router 3.0.1以及以上版本

此外，Nuxt.js 2.0还引入了许多新特性和优化，例如静态资源加载性能优化、模块自定义API、插件系统优化、路由别名等。`)

const receiveHtml = computed(() => {
  let html = ''
  receiveMessage.value.replace(/\n/g, '<br/>').split('<br/>').forEach((item) => {
    html += `<p>${item}</p>`
  })
  return receiveMessage.value
})
onSocketMessage((params) => {
  const { action, data } = params
  const actions: Data = {
    chatMsg() {
      const { msg } = data
      receiveMessage.value += msg
    },
    start() {
      receiveMessage.value += '\n\n'
      disabled.value = true
    },
    end() {
      disabled.value = false
    },
    error() {
      disabled.value = false
    },
  }

  actions[action]?.()
  console.log(data)
})

const msg = ref('nuxt2 升级了哪些东西')

function submit() {
  sendMessage('chatMsg', {
    msg: msg.value,
  })
}
</script>

<template>
  <div class="">
    <form class="flex" @submit.prevent="submit">
      <input id="msg" v-model="msg" type="text" name="msg" :disabled="disabled" class="flex-1 disabled:opacity-50">
      <button type="submit">
        Send
      </button>
    </form>

    <pre id="receiveMessage" v-html="receiveHtml" />
  </div>
</template>
