<template>
	<div class="Rescue">
		<title-header />
		<div class="topImg">
			<img src="../../../../../assets/images/rescueCard.png" alt="">
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
import { recharge, rescueMoney, rescueInt, retreat } from '../../../../../config/getData'
import Payment from '../../../../common/payment/Payment.vue'
import popPayment from '../../../../common/paymentPass/popPayment'
import { URL } from '../../../../../config/url.js'
import { isLogin } from '../../../../../config/mUtils'
import titleHeader from '../../../../common/title'

export default {

	components: {
		Payment,
		popPayment,
		titleHeader
	},
	computed: {
		...mapState([
			'userInfo'
		])
	},
	data() {
		return {
			showPayment: false,
			jyId: '',
			pageNum: 0,
			cont: '',
			img: '',
			price: '',
			isShow: true
		}
	},
	methods: {
		paymentHide(val) {
			this.showPayment = val
		},
		rechargeEv(index) {
			if (index == 2) {
				window.location.href = 'http://zjlist0226.oicp.io:29037/a/pay/MobilePay?price=0.05'
			}
		},
		upData: function () {
			if (!isLogin.call(this)) {
				this.$vux.toast.text('请先登录!');
				return this.$router.push('/user/login')
			}
			if (this.userInfo.realName == 1) {
				this.showPayment = true
			} else {
				MessageBox.confirm('请先进行实名认证，为您更好的提供救援帮助').then(action => {
					this.$router.push('/user/personal/verified')
				})
			}
		}
	},
	mounted() {
		if (!this.userInfo) {
			this.isShow = true
		} else if (this.userInfo.vipType == 1) {
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
@import "../../../../../assets/css/all";

.Rescue { @include screen; text-align: center; z-index: 11;
    .topImg { border-radius: 6px; display: inline-block; margin: 15px 0; overflow: hidden; width: 94%;
        img { background-color: transparent; width: 100%;}}

    .conText { background-color: white; border-radius: 6px; line-height: 1; margin: 0 15px 76px; padding: 20px; text-align: left;
        .title { position: relative; font-size: 15px; margin: 0 auto 23px; text-align: center; width: 150px;
            &:after, &:before { position: absolute; background-color: #666666; border-radius: 50%; content: ""; display: block; height: 0; padding: 3px; top: 50%; transform: translateY(-50%); width: 0;}
            &:after { right: 0;}}
        dl { dt { color: #5C5C5C; margin: 20px 0 10px;}
            dd { color: #7F7F7F; line-height: 22px;}}}
    .bottomBtn { position: fixed; background-color: white; bottom: 0; left: 0; overflow: hidden; width: 100%;
        span { color: #F02B2B; float: left; font-size: 15px; line-height: 56px; margin-left: 15px;}
        input { background-color: #F02B2B; border: none; color: white; float: right; font-size: 17px; height: 56px; padding: 0 30px;}

        .weui-cell { position: fixed; bottom: 0; height: 36px; opacity: 0; right: 0; width: 120px;}}
    button { background-color: #F02B2B; border: none; color: white; display: block; font-size: 16px; line-height: 48px; padding: 0 30px; width: 100%;}}

</style>

