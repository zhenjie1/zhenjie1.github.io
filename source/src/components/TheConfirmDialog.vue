<script lang="ts" setup>
defineProps<{
  title?: string
  content?: string
}>()
const emits = defineEmits(['ok', 'close', 'update:input'])
const cancelFn = () => {
  emits('close')
}

const confirmFn = () => {
  emits('ok')
}
</script>

<template>
  <Teleport to="body">
    <div class="theConfirmDialog">
      <div class="bg" />
      <div class="confirmDialog_content text-2.5rem">
        <div class="title">
          {{ title }}
        </div>
        <div v-if="$slots.default" class="content">
          <slot />
        </div>
        <div v-else class="content">
          {{ content }}
        </div>
        <div class="btns">
          <div class="btn" @click="cancelFn">
            取消
          </div>
          <div class="btn btn2" @click="confirmFn">
            确定
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.theConfirmDialog {position: fixed;z-index: 10;
  .bg{position: fixed;top:0;left:0;width: 100%;height: 100%;background-color: rgba(0,0,0,.7);}
  .confirmDialog_content{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 48.67rem;
    background-color: white;
    border-radius: 1.17rem;

    .title{line-height:7.33rem;font-size: 2.8rem;font-weight: bold;text-align: center;}
    .content{font-size: 2.5rem;line-height: 3.67rem;padding: 1.33rem 2.5rem 2.42rem;text-align: center;color: #646566;}

    .btns{display: flex;
      border-top: .8px solid rgba(0,0,0,.08);
      .btn{flex: 1;text-align: center;line-height: 8.25rem;color:#333;
        &:active{background-color: rgba(0,0,0,.08);}
      }
      .btn2{border-left: .8px solid rgba(0,0,0,.08);}
    }
  }
}
</style>
