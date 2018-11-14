<template>
  <div class="xyagree">
    <div v-html="html"></div>
  </div>
</template>

<script>
  import { view } from '../../../config/getData'
  export default {
    data() {
      return {
        html:''
      }
    },
    mounted() {
      let type = this.$route.params.type
      view(type).then( res=> {
        if(res && res.code == 2) {
          this.html = res.rows.content
        }
      })
    },
  }
</script>

<style lang='scss'>
  .xyagree {
    div {width: 100% !important;}
    h1,h4 {width:100% !important;}
  }
</style>


