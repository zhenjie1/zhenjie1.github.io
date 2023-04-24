<script lang="ts" setup>
import type { PropType } from 'vue'
import { daysTrans } from '~/assets/js/utils'

const props = defineProps({
  tag: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object as PropType<Data>,
    required: true,
  },
  scale: {
    type: Number,
    default: 1,
  },
  // 单位
  unit: {
    type: String,
    default: '个',
  },
})

useTitle('首冲专享礼包')
</script>

<template>
  <div class="giftItem">
    <img class="w-[30px] h-[27px] object-contain mx-auto mt-2" :src="data.award_img" alt="" :style="{ transform: `scale(${props.scale})` }">
    <p class="title text-[10px] text-[#999999] text-center my-1 mx-1 omit">
      {{ data.award_name }}
    </p>
    <span class="number text-[10px] font-bold omit">{{ data.nums }}{{ props.unit }}</span>
    <div v-if="props.tag" class="subscript omit din">
      {{ daysTrans(data.validate) }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.giftItem {
  background: url(~/assets/images/giftBg.png) no-repeat;
  background-size: 100% 100%;
  // border-radius: 8px;
  position: relative;

  .subscript {
    position: absolute;
    right: 0;
    top: 0;
    background: linear-gradient(90deg, #A86BFF 0%, #D96FFF 100%);
    border-bottom-left-radius: 8px;
    border-top-right-radius: 8px;
    transform-origin: right top;
    transform: scale(0.9);
    padding: 0 4px;
    font-size: 10px;
    color: white;
  }

  .title{line-height: 1;}
  .number{display: block;text-align: center;line-height: 1;}

  /*important*/
}

.giftItem {
  width: 60px;
  height: 70px;
}
</style>
