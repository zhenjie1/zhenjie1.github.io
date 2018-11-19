<template>
	<div class="claimsWarp" v-html="text">
	<!-- {{text}} -->
		<!-- <div class="claimsCon">
			<div class="claimsConTit">理赔流程</div>
			<div class="claimsConText">1.报案：发生事故后48个小时内拨打客服热线222222电话报案，我司客服人员将告知理赔所需材料及相关事宜。</div>
			<div class="claimsConText">2.申请：理赔材料齐全后，请将材料快递至我司。</div>
			<div class="claimsConText">3.审核：收到材料后，我司将进行及时审核和调查。</div>
			<div class="claimsConText">4.结案：根据审核结构进行理赔并将理赔款支付至被保险人的指定账户。</div>
		</div> -->
	</div>
</template>

<script>
	export default {
		data(){
			return {
				text:''
			}
		},
		mounted() {
			this.text = window.sessionStorage.recordDet
		}
	}
</script>

<style scoped lang='scss'>
@import '../../../assets/css/all.scss';

.claimsWarp{@include screen;box-sizing: border-box;padding: 15px;font-size: 16px;}
	/* .fr {float: right;}
	.fl {float: left;}
	.clearfix:after {content: "";display: block;clear: both;}
	.claimsWarp {
		position: fixed;
		left:0;top:0;
		width:100%;
		height:100%;
		padding-bottom: 50px;
		overflow-y: auto;
		background-color: #f5f5f5;
	}
	.claimsHead {position: relative;height: 44px;}
	.claimsHeada {position: absolute;left: 20px;top: 50%;margin-top: -8px;font-size: 16px;height: 16px;}
	.claimsHead h4 {width: 100%;line-height: 44px;color: #000;text-align: center;font-size: 16px;background-color: #fff;}
	.claimsCon {width: 94%;padding: 0 3%;margin-top: 20px;color: #000;font-size: 14px;line-height: 26px;letter-spacing: 1px;} */



</style>
