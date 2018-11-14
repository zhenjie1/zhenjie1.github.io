<template>
	<div class="personal">
		<div class="info">
			<img :src="userInfo.photo" alt="" class="avatar">
			<div class="center">
				<h3>昵称：{{userInfo.name}}</h3>
			</div>
		</div>

		<ul class="options">
      <li>
      	<div class="l">
					<span>生日</span>
				</div>
				<div class="r">{{userInfo.birthday}}</div>
      </li>
      <li>
      	<div class="l">
					<span>联系方式</span>
				</div>
				<div class="r">{{userInfo.mobile}}</div>
      </li>
      <li>
      	<div class="l">
					<span>擅长</span>
				</div>
				<div class="r">{{userInfo.goodAt}}</div>
      </li>
      <li>
      	<div class="l">
					<span>实名认证</span>
				</div>
				<div class="r">{{userInfo.idNumber}}</div>
      </li>
		</ul>
	</div>
</template>

<script>
import { sosOrders } from '@/config/getData'

export default {
	name:'playInfo',
	data() {
		return {
			userInfo:''
		}
	},
	methods: {
		getData() {
			this.userInfo = this.$route.query
			if(this.userInfo.idNumber) {
				let a = this.userInfo.idNumber;
			this.userInfo.idNumber = a.substring(0,6)+"********"+a.substring(13,18) 
			}
		}
	},
	created(){
			this.getData()
   },
  watch: {
  	$route:'getData'
  }
}
</script>


<style lang="scss" scoped>
@import '../../../../assets/css/all.scss';

.personal{min-height: 100%;width:100%;position:relative;position: fixed;left: 0;top: 0;width: 100%;height: 100%;overflow-y: auto;background-color: #f5f5f5;
	.options{margin-top:10px;
		li{display: flex;justify-content: space-between;background-color: white;line-height: 50px;padding:0 16px;font-size:16px;align-items:center;
			.l,.r{display: flex;align-items: center;}
			.r{color:#999;}
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

