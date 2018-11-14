<template>
	<div class="personal">
		<router-link class="info" to='/user/personal/Basic'>
			<img :src="userInfo.photo" alt="" class="avatar">
			<div class="center">
				<h3>昵称：{{userInfo.name}}</h3>
				<span>查看或编辑个人信息</span>
			</div>
			<i class="iconfont icon-fenxiang"></i>
		</router-link>

		<ul class="options">
			<router-link to='/user/personal/money' tag='li'>
				<div class="l">
					<i class="iconfont icon-weibiaoti-"></i>
					<span>我的钱包</span>
				</div>
				<div class="r">
					<i class="iconfont icon-jiantou"></i>
				</div>
			</router-link>
      <router-link tag='li' to='personal/player' v-if='userInfo.userType != 4'>
				<div class="l">
					<i class="iconfont icon-wode1"></i>
					<span>我的队员</span>
				</div>
				<div class="r">
					<i class="iconfont icon-jiantou"></i>
				</div>
      </router-link>
		</ul>
		<ul class="options">
			<router-link to='/setting' tag='li'>
				<div class="l">
					<i class="iconfont icon-shezhi"></i>
					<span>设置</span>
				</div>
				<div class="r">
					<i class="iconfont icon-jiantou"></i>
				</div>
			</router-link>
		</ul>

		<transition name='breadcrumb'>
			<keep-alive>
				<router-view/>
			</keep-alive>
		</transition>
	</div>
</template>

<script>
import { sosOrders } from '@/config/getData'
import { getStore } from '../../../config/mUtils'

export default {
	data() {
		return {
			userInfo:{photo:''}
		}
	},
	methods: {
		// sosOrdersEv(){

		// 	sosOrders(113.733971,34.780561).then( res => {
		// 		if(res.code == 2){
		// 			window.location.href = 'tel:' + res.mobile
		// 		}else{
		// 			alert(res.msg)
		// 		}
		// 	})
		// },
	},
	created(){
        this.userInfo = getStore('userInfo')
        if (this.userInfo == null) {
        	alert('请先登录！')
			this.$router.push('/user/login')
        }
        if(getStore('userInfo').vipType == 1) {
        	this.text = '保障中'
        }
    }
}
</script>


<style lang="scss" scoped>
@import '../../../assets/css/all.scss';

.personal{min-height: 100%;width:100%;position: relative;
	.options{margin-top:10px;
		li{display: flex;justify-content: space-between;background-color: white;line-height: 50px;padding:0 16px;font-size:16px;align-items:center;
			.l,.r{display: flex;align-items: center;}
			.r b{color:#666;}
			.l i{font-size: 22px;margin-right: 15px;color:$red;}
			.r i{margin-left: 15px;color:#9A9A9A;}
			b{font-weight: normal;}
		}
		li + li{border-top:1px solid #f5f5f5;}
	}

	.info{display: flex;padding:15px 20px;background-color: white;align-items: center;
		justify-content: space-between;
		.avatar{@include wh(70px,70px);border-radius: 100%;overflow: hidden;}
		.center{flex:0.8;
			h3{font-weight: normal;font-size:16px;}
			span{color:#666;font-size:13px;}
		}
		i{font-size:25px;padding:10px 0 10px 20px;color:#b1b1b1;}
	}
}
</style>

