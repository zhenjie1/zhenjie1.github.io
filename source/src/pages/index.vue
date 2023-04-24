<script lang="ts" setup>
import { throttle } from 'lodash-es'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import hlvue from 'highlight.js/lib/languages/python'
import { createSocket, onSocketMessage, sendMessage } from '~/assets/js/socket'

console.log(hlvue)
hljs.registerLanguage('vue', hlvue)
createSocket()
hljs.highlightAll()
const md = MarkdownIt({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
      }
      catch (_) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  },
})
// console.log('md', md.render('```js\nconsole.log(1)\n```'))

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
      finallyObj.html = md.render(finallyObj.msg)
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
      receiveMessages[receiveIndex] = { ...finallyObj, type: 'error' }
      resetFinally()
      disabled.value = false
    },
  }

  actions[action]?.()
  // console.log(data)
})

const msg = ref('')

function submit() {
  receiveIndex++
  receiveMessages.push({ type: 'right', msg: msg.value, html: md.render(msg.value) })

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
    <div class="messageBox flex-1 m-5 mb-0 overflow-y-auto">
      <div v-for="(item, index) in receiveFilter" :key="index" class="item overflow-x-auto" :class="[item.type]" v-html="item.html" />
      <div v-if="finallyObj.msg" ref="finallyRef" class="item left overflow-x-auto" v-html="finallyObj.html" />
    </div>
    <pre>{{ finallyObj }}</pre>

    <form class="flex h-16 shadow-[0_0_15px_rgba(0,0,0,0.10)] bg-#40414f m-4 mb-7 rounded-6px" :class="[disabled ? 'opacity-30' : '']">
      <textarea v-model="msg" :readonly="disabled" class="resize-none flex-1 disabled:opacity-50 border-none py-5 pl-5 text-4" placeholder="输入您的问题" @keyup.enter="submit" />
      <i class="iconfont icon-fasong leading-16 px-5 opacity-40 text-18px cursor-pointer hover:opacity-70" @click="submit" />
    </form>
  </div>
</template>

<style lang="scss" scoped>
.messageBox{
  .item{padding: 20px 16px;border-radius: 6px;}
  .item.left{background-color: #434654;}
}
</style>
