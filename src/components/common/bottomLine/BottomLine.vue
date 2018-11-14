<template>
  <div class="bottomLine">
	  <p>{{txt}}</p>
  </div>
</template>

<script>
export default {
  props: ['text'],
  data(){
	  return {
		  txt:''
	  }
  },
  mounted () {
	  this.txt = this.text !== undefined ? this.text : '我是有底线的'
  }
}
</script>


<style lang="scss" scoped>
@import '../../../assets/css/all';

.bottomLine{width:100%;
	p{text-align: center;position: relative;padding:15px 0;color:#808080;
		&:after,&:before{
			position: absolute;
			top:50%;
			content: '';
			display: block;
			width:18%;
			height: 1px;
			background-color: $e6;
		}
		&:after{left:10%;}
		&:before{right:10%;}
	}
}
</style>
