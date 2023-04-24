<script lang="ts" setup>
const { modelValue, showArea: isRenderArea = true } = defineProps<{
  modelValue: { value: string; area: string }
  showArea?: boolean
  isRenderArea?: boolean
}>()
const emits = defineEmits(['update:modelValue'])
const showArea = ref(false)
const area = ref('+86')
const areaData = [
  { cn: '中国', en: 'China', phone_code: '+86' },
  { cn: '中国香港', en: 'Hong Kong (SAR)', phone_code: '+852' },
  { cn: '中国澳门', en: 'Macao', phone_code: '+853' },
  { cn: '中国台湾', en: 'Taiwan', phone_code: '+886' },
]

const input = ref(modelValue?.value || '')
watch(input, (val) => {
  val = val.replace(/[^\d]/, '')
  input.value = val

  emits('update:modelValue', { value: val, area: area.value.replace('+', '') })
}, { immediate: true })

watch(area, () => {
  emits('update:modelValue', { value: input.value, area: area.value.replace('+', '') })
})

const areaHandler = (item: Data) => {
  area.value = item.phone_code
}

const documentClick = () => showArea.value = false
document.documentElement.addEventListener('click', documentClick)
onBeforeUnmount(() => document.documentElement.removeEventListener('click', documentClick))
</script>

<template>
  <div class="mobile relative flex items-center">
    <!-- 区号 -->
    <div v-if="isRenderArea" class="areaCode flex items-center flex-shrink-0 mr-2rem" @click.stop="showArea = !showArea">
      <span class="text-2.5rem leading-10rem">
        {{ area }}
      </span>
      <img src="../assets/images/enter/bind/arrowDown.png" alt="" class="w-1.67rem h-1.67rem ml-1rem">
    </div>
    <ul v-if="showArea" class="absolute top-80% bg-white z-10 py-1rem leading-5rem rounded-1rem shadow-md">
      <li v-for="item in areaData" :key="item.phone_code" class="px-2.4rem text-2.2rem active:bg-gray-100" @click="areaHandler(item)" @touchstart="() => {}">
        {{ item.cn }}
      </li>
    </ul>
    <input v-model="input" type="text" pattern="[0-9]*" maxlength="11" class="h-10rem block w-full bg-transparent" placeholder="请输入手机号" autocomplete="off">
  </div>
</template>

<style lang="scss" scoped>
.containerBox {
}
</style>
