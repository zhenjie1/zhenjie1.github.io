<template>
	<div class="Rescue">
		<div class="topImg">
			<img src="https://wx4.sinaimg.cn/mw690/0062fb6Qly1fqoy9sxat2j309j0630w7.jpg" alt="">
		</div>
		<div class="conText">
			<div class="title">救援卡使用说明</div>
			<dl v-for='(e, i) in cont' :key="i">
				<dt>{{e.title}}</dt>
				<dd>{{e.content}}</dd>
			</dl>
		</div>
		<div class="bottomBtn" v-if='isShow'>
			<span>价格：￥{{price}}</span>
			<input type="button" value="立即购买>" @click="upData">
		</div>
		<div class="bottomBtn" v-else>
			<button class="button">已购买</button>
		</div>

		<!-- <payment v-model="showPayment" :rescueId='jyId' :pageNum='pageNum' @vipType='vip'></payment> -->
		<pop-payment v-model="showPayment" :rescueId='jyId' v-if="showPayment" @input='paymentHide'></pop-payment>
	</div>
</template>


<script>
import MessageBox from 'mint-ui/packages/message-box/'
import { mapState } from 'vuex'
import { recharge,rescueMoney,rescueInt, retreat } from '../../../../../config/getData'
import Payment from '../../../../common/payment/Payment.vue'
import popPayment from '../../../../common/paymentPass/popPayment'
import {URL} from '../../../../../config/url.js'
import { isLogin } from '../../../../../config/mUtils'

export default {

	components:{
		Payment,
		popPayment
	},
	computed:{
		...mapState([
			'userInfo'
		])
	},
	data(){
		return {
			showPayment:false,
			jyId:'',
			pageNum:0,
			cont:'',
			img:'',
			price:'',
			isShow:true
		}
	},
	methods:{
		paymentHide(val){
			this.showPayment = val
		},
		rechargeEv(index){
			if(index == 2){
				window.location.href='http://zjlist0226.oicp.io:29037/a/pay/MobilePay?price=0.05'
			}
		},
		upData(){
			if(!isLogin.call(this)){
				 this.$vux.toast.text('请先登录!');
				 return this.$router.push('/user/login')
			}
			if(this.userInfo.realName ==1) {
				this.showPayment = true
			}else {
				MessageBox.confirm('请先进行实名认证，为您更好的提供救援帮助').then(action => {
					this.$router.push('/user/personal/verified')
				})
			}
		}
	},
	mounted(){
		if(!this.userInfo){
			this.isShow = true
		}else if(this.userInfo.vipType == 1) {
			this.isShow = false;
		}
		rescueInt().then(res => {
			this.jyId = res.rows[0].id;
			this.cont = res.rows[0].content
			this.price = res.rows[0].price
		})
	}
}
</script>


<style lang="scss" scoped>
@import '../../../../../assets/css/all';

.Rescue{@include screen;z-index: 11;text-align:center;
	.topImg{overflow: hidden;border-radius: 6px;display: inline-block;width:94%;margin:15px 0;
		img{width:100%;}
	}

	.conText{text-align: left;background-color: white;margin:0 15px 76px;padding:20px;border-radius: 6px;line-height:1;
		.title{font-size: 15px;text-align: center;margin:0 auto 23px;position: relative;width:150px;
			&:after,&:before{content:'';display: block;width:0;height: 0;padding:3px;background-color: #666;border-radius: 50%;position: absolute;top:50%;transform: translateY(-50%);}
			&:after{right:0}
		}
		dl{
			dt{color:#5C5C5C;margin:20px 0 10px;}
			dd{color:#7F7F7F;line-height: 22px;}
		}
	}
	.bottomBtn{overflow: hidden;position: fixed;left:0;bottom:0;width:100%;background-color:white;
		span{float:left;line-height: 56px;font-size: 15px;color:#F02B2B;margin-left: 15px;}
		input{float:right;height: 56px;border:none;background-color: #F02B2B;color:white;padding:0 30px;font-size: 17px;}

		.weui-cell{width:120px;position: fixed;right:0;bottom:0;height: 36px;opacity: 0;}

	}
	button {background-color: #F02B2B;color:white;padding:0 30px;font-size: 16px;border: none;display: block;line-height: 48px;width: 100%;}

}

</style>

