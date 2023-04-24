<script lang="ts" setup>
import api from '~/assets/js/api'

const {
  label = '选择图片',
  data = {},
  type,
  modelValue,
  accept = 'image/gif,image/jpeg,image/jpg,image/png',
  echoImage,
} = defineProps<{
  label?: string
  /**
   * 传给后端的 type 值
   */
  type: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
  /**
   * 其他参数
   */
  data?: Data
  modelValue?: string
  accept?: string
  // 回显的图片地址
  echoImage?: string
}>()

const emits = defineEmits(['update:modelValue', 'change', 'fileSelect'])

defineOptions({
  name: 'ContentBox',
})
// const { open: openCamera } = useFileDialog({ capture: 'camera' })
const { open: openFile, files } = useFileDialog({ accept, multiple: false })

const fileUrl = computed(() => {
  if (files.value?.length) {
    return URL.createObjectURL(files.value[0])
  }
  return ''
})

const url = ref(echoImage || fileUrl.value || modelValue)
watch(() => modelValue, () => {
  if (!modelValue) return
  if (modelValue.startsWith('http')) url.value = modelValue
})

defineExpose({
  clearUrl: () => {
    url.value = ''
    emits('update:modelValue', '')
  },
})

const show = ref(false)
// watch(url, () => {
//   show.value = false
//   setTimeout(() => {
//     show.value = true
//   }, 3000)
// })

watch(files, () => {
  if (!files.value) return

  Array.from(files.value).map(async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('type', type)
    Object.keys(data).map(k => formData.append(k, data[k]))

    url.value = URL.createObjectURL(file)

    emits('fileSelect', file)
    const res = await api.common.uploadImage().run(formData)
    emits('update:modelValue', res.image_name)
    emits('change')
  })
})

const viewImage = () => show.value = true
// const input = document.createElement('input')
// input.type = 'file'
// const openFile = () => input.click()

// const show = ref(true)
// const actions = [
//   { name: '拍照', type: 'camera' },
//   { name: '相册', type: 'file' },
// ]

// const onSelect = (row: Data) => {
//   console.log(row.type)
//   if (row.type === 'file') openFile()
//   else openCamera()
// }
</script>

<template>
  <div class="uploadImage">
    <div v-if="!url" class="pt-5" @click="openFile()">
      <van-icon name="plus" class="icon" />
      <p class="label">
        {{ label }}
      </p>
    </div>
    <div v-else class="showImage">
      <img :src="url" alt="" class="block w-full h-full absolute top-0 left-0 object-cover" @click="viewImage">
      <p class="text" @click="openFile()">
        修改
      </p>
    </div>

    <div v-if="show" class="viewImage" @click="show = false">
      <img :src="url" alt="" class="w-full">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.showImage{position: relative;height: 100%;width: 100%;
  .text{position: absolute;bottom: 0;left:0;width:100%;line-height: 2.98rem;background-color: rgba(0,0,0,.7);color: white;font-size: 2rem;text-align: center;}
}
.viewImage{position: fixed;left:0;top:0;right:0;bottom: 0;background-color: rgba(0,0,0,.7);z-index: 10;
  img{position: fixed;left:50%;top:50%;transform: translate(-50%, -50%);}
}
.uploadImage {
  border: 1px dashed #e6e6e6;
  display: block;
  background-color: #fafafa;
  border-radius: .4rem;

  height: 10.42rem;
  width: 11.83rem;
  overflow: hidden;
  position: relative;

  .icon{font-size: 4.2rem;text-align: center;display: block;color: #bbb;}
  .label{color: #bdbdbd;margin-top: .4rem;font-size: 2rem;text-align: center;}
}
</style>
