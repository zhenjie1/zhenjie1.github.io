<template>
  <div class="hello">
	  地图页面
	<div id="map">123</div>
  </div>
</template>

<script>
import { loadScript } from '../../../../assets/js/map'

export default {
	name: 'HelloWorld',
	data () {
		return {

		}
	},
	mounted(){
		alert('显示了')
		// 生成地图
		loadScript()

		let bodyH = document.documentElement.offsetHeight
		document.getElementById('map').style.height = bodyH + 'px'
		document.getElementById('map').style.position = 'fixed'
	}
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#map{width:100%;height:100%;}
</style>


