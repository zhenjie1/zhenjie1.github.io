<script lang="ts" setup>
import { isAndroid } from '~/assets/js/utils'

interface Props {
  title?: string
  battery?: boolean
  bgTransparent?: boolean
  onBack?: Function
}

const { title, bgTransparent = false, onBack } = defineProps<Props>()

title && useTitle(title)

const router = useRouter()
const back = () => {
  if (onBack) onBack()
  else router.back()
}

// 电池导航栏高度
const headerHeight = isAndroid ? '28px' : ''
</script>

<template>
  <div class="header flex-shrink-0" :class="{ battery, bgTransparent }" :style="{ paddingTop: headerHeight }">
    <div class="back" @click="back">
      <img src="../assets/images/headerBack.png" alt="">
    </div>
    <p class="title">
      <template v-if="title">
        <div>
          {{ title }}
        </div>
      </template>
      <slot v-else name="title" />
    </p>
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  text-align: center;
  font-size: 2.67rem;
  font-weight: 500;
  line-height: 7.33rem;
  height: 7.33rem;
  position: relative;
  background-color: white;
  z-index: 1;
  box-sizing: content-box;
  border-bottom: 1px solid #f6f6f6;
  &.bgTransparent{background-color: transparent !important;}

  .back{position: absolute;left:0;bottom:0;display: flex;width: 7.33rem;height: 7.33rem;z-index: 10;
    img{margin: auto;width: 2.5rem;height: 2.5rem;}
  }

  .title{position: absolute;width:100%;bottom: 0;left:0;}

  .right{position: absolute;right:0;bottom:0;display: flex;height: 7.33rem;z-index: 10;
  }
  // &.battery{
  //   margin-top: var(--sat);
  //   .back{top: var(--sat);}
  // }
}
</style>
