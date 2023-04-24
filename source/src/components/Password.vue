<script lang="ts" setup>
const { phone = '', area = '', sendCode, countdownOptions } = defineProps<{
  // code
  modelValue: string
  // 手机号
  phone: string
  area: string
  // 发送验证码的方法
  sendCode: (mobile: string) => Promise<void>

  countdownOptions?: {
    initText?: string
    retryText?: string
  }
}>()

const emits = defineEmits(['update:modelValue'])

const countdown = useCountdown(countdownOptions)

const code = ref('')
watch(code, () => emits('update:modelValue', code.value))

// 点击发送验证码
const sendCodeHandler = async () => {
  if (countdown.isStart) return

  await sendCode(area + phone)
  countdown.startEvent()
}

// 发送验证码按钮是否禁用
const sendCodeDisabled = computed(() => {
  return !/^1\d{10}$/.test(phone)
})
</script>

<template>
  <div class="code relative">
    <input v-model="code" type="text" pattern="[0-9]*" class="h-10rem block w-full bg-transparent" placeholder="请输入验证码" maxlength="6" autocomplete="off">
    <van-button
      :disabled="sendCodeDisabled || countdown.isStart"
      class="gradientBtn absolute! right-0 h-5.17rem! top-2.42rem font-bold min-w-auto! rounded-full! text-2rem!"
      @click="sendCodeHandler"
    >
      {{ countdown.text }}
    </van-button>
  </div>
</template>

<style lang="scss" scoped>
.containerBox {
}
</style>
