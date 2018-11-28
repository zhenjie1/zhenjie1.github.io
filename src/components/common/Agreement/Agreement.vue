<template>
  <div class="xyagree">
    <div v-html="html"></div>
  </div>
</template>

<script>
  import { view, getProtocol } from '../../../config/getData'
  export default {
    data() {
      return {
        html:''
      }
    },
    mounted() {
	  let type = this.$route.params.type
	  let protocolId = this.$route.params.protocolId
	//   console.log(protocolId)
	  if( protocolId ){
		  getProtocol(protocolId).then( res => {
			  this.html = res.rows.content
		  })
		  return
	  }
	//   if()
      view(type).then( res=> {
        if(res && res.code == 2) {
          this.html = res.rows.content
        }
      })
    },
  }
</script>

<style lang='scss'>
  .xyagree {background-color: white;
    div {width: 100% !important;box-sizing: border-box;padding: 15px;}
    h1,h4 {width:100% !important;}
  }
</style>


