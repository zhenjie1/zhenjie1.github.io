<template>
	<div class="menuBottom" :class='{menuBottomHide : isMenuShow}'>
		<ul>
			<router-link :to='homeUrl' tag='li' :class="{checked: checkIndex == '1'}">
				<div class="icon">
					<i class="iconfont icon-home"></i>
				</div>
				<p>首页</p>
			</router-link>
			<li class="middle" @click='sosOrdersEv'>
				<div class="icon">
					<i class="iconfont icon-dianhua"></i>
				</div>
				<p>一键呼救</p>
			</li>
			<router-link to='/user/personal' tag='li' :class="{checked: checkIndex == '2'}">
				<div class="icon">
					<i class="iconfont icon-wode1"></i>
				</div>
				<p>个人</p>
			</router-link>
		</ul>
	</div>

</template>
<script>
import debounce from 'lodash.debounce'
import { sosOrders } from '@/config/getData'
import { mapState } from 'vuex'

export default {
	props:['checkIndex'],
	data(){
		return{
			start: 0,
			isMenuShow:false,
		}
	},
	computed:{
		...mapState(['geographicLocation', 'homeUrl','userInfo'])
	},
	methods: {
		sosOrdersEv(){
			// let isLogin = JSON.stringify(this.userInfo) !== '{}'
			console.log(this.userInfo)
			return
			if(!isLogin) {
				this.$vux.toast.text('请先登录！')
				this.$router.push('/user/login')
				return;
			}
			if( !this.geographicLocation ) return this.$vux.toast.text('无法获取您的位置！')

			var [x,y] = [this.geographicLocation.Longitude, this.geographicLocation.Latitude];
			var promise = sosOrders(x,y).then( res => {
				this.$vux.toast.text(res.msg)
				if(res.code == 2){
					window.location.href = 'tel:' + res.mobile
				}else if(res.code == 101){
					window.location.href = 'tel:' + res.mobile
				}else if( res.code == 600 ) {
					this.$router.push('/user/home/userRescue')
				}else if( res.code == 601 ) {
					this.$router.push('/user/personal/verified')
				}
			})
		},
		scrollEv(e){
			var y = Math.floor( e.targetTouches[0]['clientY'] );
			if(y > this.start + 10){
				this.isMenuShow = false
			}else if(y + 10 < this.start){
				this.isMenuShow = true
			}
			this.start = y;
		}
	},
	mounted() {
		window.addEventListener('touchstart', function(e){
			this.start = Math.floor( e.targetTouches[0]['clientY'] )
		})
		window.addEventListener('touchmove',
			debounce(this.scrollEv, 20, {
				'leading': true,
				'trailing': false
			})
		)
	}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/all.scss';

.menuBottom{background-color: #f8f8f8;height: 50px;width:78%;position: fixed;left:11%;bottom:20px;border-radius: 100px;	filter:drop-shadow(0 4px 6px rgba(0,0,0,.3));transition:transform .4s ease;
	ul{display: flex;align-items:flex-end;
		li{width:33.33%;text-align: center;margin-top:-37px;
			p{font-size:12px;}
			i{font-size: 20px;font-weight: bold;}
			a{display: block;}
		}
		li.checked{
			i,p{color:$red;}

		}
		li.middle{
			.icon{background-color: #f8f8f8;@include wh(60px,60px);padding:4px;text-align: center;border-radius: 200px;margin:0 auto;}
			i{font-weight: normal;color:white;font-size:40px;line-height: 60px;text-align: center;background-color: $red;width:60px;height:60px;border-radius: 100px;display: inline-block;}
			p{margin-top:-4px;color:$red;}
		}
	}
}
.menuBottomHide{transform: translateY(160px);}
</style>
