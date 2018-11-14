<template>
	<div class="payment">
		<ul>
			<router-link tag='li' to='payment/verification'>
				<span>修改支付密码</span>
				<div class="r">
					<i class="iconfont icon-jiantou"></i>
				</div>
			</router-link>
			<router-link tag="li" to='payment/forget'>
				<span>忘记支付密码</span>
				<div class="r">
					<i class="iconfont icon-jiantou"></i>
				</div>
			</router-link>
		</ul>
		<router-view></router-view>
	</div>
</template>

<style lang="scss" scoped>
@import '../../../assets/css/all';

.payment{@include screen;
	ul{margin-bottom:10px;
		li{line-height: 50px;background-color: white;display: flex;justify-content: space-between;padding:0 20px;
			span{font-size: 15px;color:#030303;}
			i.iconfont{color:#9a9a9a;}
			b{color:#666;font-weight: normal;}
		}
		li + li{margin-top:1px;}
	}
	.logout{line-height: 50px;background-color: white;padding:0 20px;text-align: center;margin-top:40px;font-size: 17px;}
}

</style>
