<template>
	<div class="insPay">
		<div class="price">
			<h3>{{price}}</h3>
		</div>
		<div class="payChoose clearfix">
			<a href="#" class="fl">
				<span class="fl">支付方式</span>
				<span class="fr">{{payChoose}}</span>
			</a>
		</div>
		<a href="#" class="payBtn">确定</a>
	</div>
</template>

<script>
	export default {
		name:'insPay',
		data () {
			return {
				price:'999.00',
				payChoose:'天机会'
			}
		}
	}
</script>

<style>
	.fr {float: right;}
	.fl {float: left;}
	.clearfix:after {content: "";display: block;clear: both;}
	.insPay .price {height: 140px;text-align: center;font-size: 20px;line-height: 140px;}
	.insPay .payChoose {width: 90%;padding: 0 5%;}
	.insPay .payChoose a {display: block;width: 100%;}
	.insPay .payChoose {line-height: 30px;background-color: #fff;font-size: 14px;}
	.insPay .payBtn {width: 100%;line-height: 38px;background-color: #fff;text-align: center;font-size: 14px;display: block;position: fixed;bottom: 0px;}

</style>