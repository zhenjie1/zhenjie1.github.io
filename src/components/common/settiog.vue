<template>
	<div class="setting">
		<ul>
			<router-link to='setting/loginPass' tag='li'>
				<span>修改密码</span>
				<div class="r">
					<i class="iconfont icon-jiantou"></i>
				</div>
			</router-link>
			<li @click='link'>
				<span>实名认证</span>
				<div class="r">
					<b>{{text}}</b>
					<i class="iconfont icon-jiantou"></i>
				</div>
			</li>
			<router-link to='setting/payment' tag='li'>
				<span>支付密码</span>
				<div class="r">
					<i class="iconfont icon-jiantou"></i>
				</div>
			</router-link>
		</ul>
		<!-- <ul>
			<li>
				<span>关于天佑</span>
				<div class="r">
					<i class="iconfont icon-jiantou"></i>
				</div>
			</li>
		</ul> -->
		<div class="logout" @click='logoutEv'>退出登录</div>
		<actionsheet v-model="logoutShow" cancel-text='取消' :menus="logoutMenu" @on-click-menu-delete="onDelete" show-cancel></actionsheet>

		<router-view></router-view>
	</div>
</template>

<script>
import Actionsheet from 'vux/src/components/actionsheet/'
import { logout } from '../../config/getData'
import { getStore,removeStore } from '../../config/mUtils'
import { mapState, mapActions } from 'vuex'

export default {
	data(){
		return {
			text:'点击认证',
			testval:['666','112','333'],
			logoutShow:false,
			logoutMenu:{
				'title.noop': '确定退出?<br/><span style="color:#666;font-size:12px;">推出后某些功能将无法使用</span>',
				delete:'<span style="color:red">确认退出</span>'
			}
		}
	},
	computed:{
		...mapState([
			'userInfo'
		]),
		userType(){
			return this.userInfo.userType
		}
	},
	methods:{
		...mapActions([
			'setUserInfo'
		]),
		variety(val,ind){
			this.testval[ind] = val
		},
		logoutEv(){
			this.logoutShow = true
		},
		onDelete(val){
			logout().then( res => {
				if(res.code == 2){
					this.$vux.toast.text('退出成功');
					this.setUserInfo(undefined)
					this.$router.push('/user/login')
				}
			})
		},
		link() {
			if(this.userInfo.realName != 1) {
				this.$router.push('/user/personal/verified')
			}
		}
	},
	mounted(){
		let type = this.userInfo.realName;
		if(type == 1) {
			this.text = '已认证'
		}
	},
	components:{
		Actionsheet,
	}
}
</script>


<style lang="scss" scoped>
.setting{
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

