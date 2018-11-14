<template>
  <transition name='fade'>
	<router-view></router-view>
  </transition>
</template>

<style lang="scss">
.fade-enter,.fade-leave-to{
	transform: translateX(10px);
}
.fade-enter-to,.fade-leave{
	transform: translateX(0);
}
.fade-enter-active,.fade-leave-active{
	transition: all .2s ease;
}
</style>


<script>
import { getStore } from '../config/mUtils.js'
export default {
	mounted(){
		// var userInfo = getStore('userInfo')
		// if(userInfo.type == 3){
		// 	this.$router.push('/user/home')
		// }else if(userInfo.type == 2 || userInfo.type == 4){
		// 	this.$router.push('/rescue')
		// }
		// console.log(userInfo)
	}
}
</script>

