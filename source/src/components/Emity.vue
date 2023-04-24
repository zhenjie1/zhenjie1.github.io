<script lang="ts" setup>
interface Props {
  width?: string
  height?: string
  text?: string
}
const {
  height = '62.5rem',
  text = '暂无数据',
  width = '100%',
} = defineProps<Props>()
</script>

<template>
  <div class="emityContent flex w-full" :style="{ height, width }">
    <div class="m-auto text-center">
      <img src="../assets/images/emptyDataIcon.png" alt="" class="w-18.5rem">
      <p class="text-#999 text-2rem mt-2.17rem">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.emityContent {
}
</style>
