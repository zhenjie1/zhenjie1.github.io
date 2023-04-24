<script lang="tsx" setup>
import { computed } from 'vue'
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#333',
  },
  w: {
    type: String,
    default: '5em',
  },
  h: {
    type: String,
    default: '',
  },
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <span class="block">
    <span class="flex h-full">
      <svg aria-hidden="true" class="svg-icon m-auto" :width="props.w" :height="props.h">
        <use :xlink:href="symbolId" :fill="props.color" />
      </svg>
    </span>
  </span>
</template>
