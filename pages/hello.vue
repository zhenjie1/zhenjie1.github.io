<script lang="ts" setup>
import { createSocket, onSocketMessage, sendMessage } from '~/assets/js/socket'

createSocket()

const receiveMessage = ref('')
onSocketMessage((params) => {
  const { action, data } = params
  const actions: Data = {
    chatMsg() {
      const { msg } = data
      receiveMessage.value += msg
    },
  }

  actions[action]?.()
  console.log(params)
})

const msg = ref('Hello World')

function submit() {
  sendMessage('chatMsg', {
    msg: msg.value,
  })
}
</script>

<template>
  <div class="">
    <form @submit.prevent="submit">
      <input id="msg" v-model="msg" type="text" name="msg">
      <button type="submit">
        Send
      </button>
    </form>

    <pre id="receiveMessage">
      {{ receiveMessage }}
    </pre>
  </div>
</template>
