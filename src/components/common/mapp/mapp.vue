<template>
<div class="mapp" :style="{height:height}" :class="{screen: screen === true}">
	<div id="map"></div>
	<div class="buttonStyle" v-if="enter == 'home'">
		<div class="style"></div>
		<div class="btn" v-if="screen">
			<div class="menuTiao" @click='downScreen'><p></p></div>
			<input type="button" value="一键呼救" class="sos" @click='sosEv'>
		</div>
	</div>
</div>
</template>

<script>
import { loadScript, mouseoverMap } from '../../../assets/js/map'

export default {
	data(){
		return {
			height:270 + 'px',
			enter:window.location.href.indexOf('home') !== -1 ? 'home' : 'rescue'
		}
	},
	props:['screen','lngLat'],
	watch:{
		lngLat(val){
			//更新地图显示位置
			mouseoverMap(val)
		},
		screen:function(val){
			if(val===true){
				this.height = document.documentElement.offsetHeight + 'px'
			}else{
				this.height = 270 + 'px'
			}
			this.$emit('input',val)
		}
	},
	methods:{
		sosEv(){
			this.$emit('sos')
		},
		downScreen(){
			// this.screen = false;
			this.$emit('screen',false)
		}
	},
	mounted(){
		if(this.enter === 'rescue') this.height = document.documentElement.offsetHeight + 'px'
		loadScript(this.enter, this);
	}
}
</script>


<style lang="scss" scoped>

.mapp{position: relative;transition:height .4s ease;z-index:1 !important;left:0;top:0;width:100%;background-color: #f5f5f5;
	.buttonStyle{position: absolute;left:0;bottom:-1px;width:100%;
		.menuTiao{background-color: white;padding:13px 0;
			p{width:40px;height: 5px;background-color: #C4C5C2;border-radius: 100px;margin:0 auto;}
		}
		.sos{width:100%;height:45px;border:none;border-radius: 5px;font-size:18px;background-color: #E64340;color:white;border:1px solid rgba(0, 0, 0, 0.2)}
		.btn{padding:0 15px 15px;background-color: white;}
		.style{background: url('../../../assets/images/mapImg.png') no-repeat 0 0/100% 100%;height: 65px;width:100%;pointer-events: none;}
	}
	#map{height:100%;}
}
.screen{position: fixed !important;}
</style>
