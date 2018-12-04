<template>
	<div class="claimsWarp">
		<title-header />
		<p v-html="text"></p>
	</div>
</template>

<script>
import titleHeader from '../../common/title'
	export default {
		data(){
			return {
				text:''
			}
		},
		mounted() {
			this.text = sessionStorage.claims
		},
		components:{
			titleHeader
		}
	}
</script>

<style scoped lang='scss'>
@import '../../../assets/css/all.scss';

.claimsWarp{@include screen;box-sizing: border-box;font-size: 16px;z-index: 20;
	p{padding:15px;}
}
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
