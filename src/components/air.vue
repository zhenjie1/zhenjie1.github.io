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

