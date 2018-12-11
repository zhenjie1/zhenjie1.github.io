<template>
	<div class="titleNav" :class="title.theme" v-show="title.isShow">
		<i class="iconfont icon-jiantou2 retuenBtn" v-show="title.returnIsShow" @click='$router.go(-1)'></i>
		{{title.text}}
		<i class="iconfont icon-shuaxin reload" v-show="title.reloadIsShow" @click='reload'></i>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	computed:{
		...mapState(['title'])
	},
	methods:{
		reload(){
			window.location.reload()
		}
	}
}
</script>


<style lang="scss" scoped>
$titleHeight: 50px;
.titleNav{text-align: center;position: relative;line-height: $titleHeight;font-size: 16px;border-bottom:1px solid #f5f5f5;background-color: white;z-index:1;box-shadow: 0 0px 6px rgba(0,0,0,.05);height: $titleHeight;
	i.retuenBtn,i.reload{position: absolute;top:0;padding: 0 15px;display: block;line-height: $titleHeight;}
	i.retuenBtn{left:0;}
	i.reload{right:0;}
}

.titleNav.simple{background-color: transparent;position: fixed;z-index:15;font-size:0;
	i{background-color: rgba(0,0,0,.5);color: white;line-height: 36px;top: 20px;padding: 0 20px;border-top-right-radius: 3px;border-bottom-right-radius: 3px;}
	.reload{display: none;}
}
</style>
