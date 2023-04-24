<script lang="ts" setup>
import { throttle } from 'lodash-es'
import { marked } from 'marked'
import { createSocket, onSocketMessage, sendMessage } from '~/assets/js/socket'

createSocket()

interface Messsage {
  type: 'right' | 'left'
  msg: string
  html: string
}
const disabled = ref(false)
const receiveMessages = reactive<Messsage[]>([])
let receiveIndex = -1

// 正在收取的消息 html
const finallyObj = reactive<Messsage>({ type: 'left', msg: '', html: '' })
// 恢复默认值
function resetFinally() {
  finallyObj.type = 'left'
  finallyObj.msg = ''
  finallyObj.html = ''
}
const receiveFilter = computed(() => {
  return receiveMessages.filter(v => v.msg)
})

const finallyRef = ref<HTMLElement | null>(null)

const showFinally = throttle(() => {
  const boxEl = document.getElementsByClassName('messageBox')[0]
  if (boxEl) {
    boxEl.scrollTop = boxEl.scrollHeight
  }
}, 300)

onSocketMessage((params) => {
  const { action, data } = params
  const actions: Data = {
    chatMsg() {
      const { msg } = data
      // console.log('finallyObj', finallyObj)
      finallyObj.msg += msg
      finallyObj.html = marked(finallyObj.msg)
      showFinally()
    },
    start() {
      receiveIndex++
      receiveMessages.push({ type: 'left', msg: '', html: '' })
      disabled.value = true
    },
    end() {
      receiveMessages[receiveIndex] = { ...finallyObj }
      resetFinally()
      disabled.value = false
    },
    error() {
      disabled.value = false
    },
  }

  actions[action]?.()
  // console.log(data)
})

const msg = ref('使用 python 实现一个socket')

function submit() {
  receiveIndex++
  receiveMessages.push({ type: 'right', msg: msg.value, html: marked(msg.value) })

  sendMessage('chatMsg', {
    msg: msg.value,
  })
  nextTick(() => {
    msg.value = ''
  })
}
</script>

<template>
  <div class="flex flex-col h-full max-w-300 mx-auto">
    <div class="messageBox flex-1 m-5 overflow-y-auto">
      <div v-for="(item, index) in receiveFilter" :key="index" class="item overflow-x-auto" :class="[item.type]" v-html="item.html" />
      <div v-if="finallyObj.msg" ref="finallyRef" class="item left overflow-x-auto" v-html="finallyObj.html" />
    </div>

    <form class="flex h-13 shadow-[0_0_15px_rgba(0,0,0,0.10)] bg-#40414f m-4 rounded-1" :class="[disabled ? 'opacity-20' : '']">
      <!-- <input id="msg" v-model="msg" type="text" name="msg" :disabled="disabled" class="flex-1 disabled:opacity-50"> -->
      <textarea v-model="msg" :readonly="disabled" class="resize-none flex-1 disabled:opacity-50 border-none py-4 pl-5" @keyup.enter="submit" />
      <i class="iconfont icon-fasong leading-13 px-5 opacity-40 text-18px cursor-pointer hover:opacity-70" @click="submit" />
    </form>
  </div>
</template>

<style lang="scss" scoped>
.messageBox{
  .item{padding: 20px 16px;}
  .item.left{background-color: #434654;}
}
</style>
