<template>
	<div class="personal">
		<router-link tag='div' to='personal/basic' class="info">
			<img :src="userInfo.photo " alt="" class="avatar">
			<div class="center">
				<h3>昵称：{{userInfo.name}}</h3>
				<span>查看或编辑个人信息</span>
			</div>
		</router-link>
		<i class="iconfont icon-fenxiang share" @click='shareEv'></i>
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
		</ul>

		<ul class="options">
			<router-link to='/user/home/userRescue' tag='li'>
				<div class="l">
					<i class="iconfont icon-yinhangqia"></i>
					<span>救援卡</span>
				</div>
				<div class="r">
					<b>{{text}}</b>
					<i class="iconfont icon-jiantou"></i>
				</div>
			</router-link>
			<router-link to="/rescue" tag='li'>
				<div class="l">
					<i class="iconfont icon-shijian"></i>
					<span>救援记录</span>
				</div>
				<div class="r">
					<i class="iconfont icon-jiantou"></i>
				</div>
			</router-link>
			<router-link to='/user/buyRecord'>
				<li>
					<div class="l">
						<i class="iconfont icon-jiaoyijilu"></i>
						<span>保险记录</span>
					</div>
					<div class="r">
						<i class="iconfont icon-jiantou"></i>
					</div>
				</li>
			</router-link>
			<router-link to='personal/remind' tag='li'>
				<div class="l">
					<i class="iconfont icon-xiaoxi"></i>
					<span>我的消息</span>
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
		<bottom-nav checkIndex='2' />
		<transition name='breadcrumb'>
			<router-view />
		</transition>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { sosOrders, getUserInfo } from "@/config/getData";
import bottomNav from '../../common/bottomNav/bottomNav'
import { isLogin } from '../../../config/mUtils'
import { URL } from '../../../config/url.js'
import android from '../../../assets/js/android.js'

export default {
	data() {
		return {
			text: ""
		};
	},
	computed: {
		...mapState([
			'userInfo'
		]),
	},
	components: {
		bottomNav
	},
	methods: {
		...mapActions(['setUserInfo']),
		getUserInfoEv() {
			getUserInfo().then(res => {
				res = res.rows
				this.setUserInfo(res)
			})
		},
		shareEv() {
			try {
				var href = URL + '/share/share.html?referId=123456'
				// var href = URL + '/share/share.html?referId=' + this.userInfo.id
				let title = '天佑救援-您的安全由我护佑'
				let content = '不管你在任何一个角落，中国天佑救援，时刻为您的安全待命'
				let icon = 'http://ty.tianjistar.com/static/images/tyIcon.png'
				console.log('链接：' + href)
				console.log('标题：' + title)
				console.log('内容：' + content)
				console.log('图标：' + icon)
				bridge.shareInAndroid(title, content, icon, href);
			} catch (err) {

			}

		}
	},
	created() {
		this.getUserInfoEv();
		if (!isLogin.call(this)) {
			this.$vux.toast.text("请先登录！");
			this.$router.push("/user/login");
		} else {
			// if (this.userInfo.userType != '3') this.$router.push('/rescue/task')
			this.text = this.userInfo.vipType == 1 ? "保障中" : "去购买";
		}
	}
};
</script>


<style lang="scss" scoped>
@import "../../../assets/css/all.scss";

.personal { position: relative;width: 100%;height: 100%;
    .options { margin-top: 10px;
        li { align-items: center; background-color: white; display: flex; font-size: 16px; justify-content: space-between; line-height: 50px; padding: 0 16px;
            .l, .r { align-items: center; display: flex;}
            .r b { color: #666666;}
            .l i { color: $red; font-size: 22px; margin-right: 15px;}
            .r i { color: #9A9A9A; margin-left: 15px;}
            b { font-weight: normal;}}
        li + li { border-top: 1px solid #F5F5F5;}}
    .share { position: absolute; color: #B1B1B1; font-size: 25px; padding: 15px; right: 15px; top: 23px;}

    .info { align-items: center; background-color: white; display: flex; justify-content: space-between; padding: 15px 20px;
        .avatar { @include wh(70px, 70px); border-radius: 100%; overflow: hidden;}
        .center { flex: .93;
            h3 { font-size: 16px; font-weight: normal;}
            span { color: #666666; font-size: 13px;}}}}

</style>

