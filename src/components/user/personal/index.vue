<template>
	<div class="personal">
		<router-link tag='div' to='personal/basic' class="info">
			<img :src="userInfo.photo " alt="" class="avatar">
			<div class="center">
				<h3>昵称：{{userInfo.name}}</h3>
				<span>查看或编辑个人信息</span>
			</div>
			<i class="iconfont icon-fenxiang"></i>
		</router-link>
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

		<!-- <div class="menuBottom">
			<ul>
				<router-link to='/user' tag='li'>
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
				<router-link to='/user/personal' tag='li' class="checked">
					<div class="icon">
						<i class="iconfont icon-wode1"></i>
					</div>
					<p>个人</p>
				</router-link>
			</ul>
		</div> -->
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
export default {
  data() {
    return {
      text: ""
    };
  },
  computed:{
		...mapState([
			'userInfo'
		]),
  },
  components:{
	  bottomNav
  },
  methods:{
	  ...mapActions(['setUserInfo']),
		getUserInfoEv(){
			getUserInfo().then( res => {
				res = res.rows
				this.setUserInfo(res)
			})
		},
  },
  created() {
	this.getUserInfoEv();
    if (this.userInfo == null) {
      this.$vux.toast.text("请先登录！");
      this.$router.push("/user/login");
    } else {
      this.text = this.userInfo.vipType == 1 ? "保障中" : "去购买";
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../assets/css/all.scss";

.personal {
  min-height: 100%;
  width: 100%;
  position: relative;
  .options {
    margin-top: 10px;
    li {
      display: flex;
      justify-content: space-between;
      background-color: white;
      line-height: 50px;
      padding: 0 16px;
      font-size: 16px;
      align-items: center;
      .l,
      .r {
        display: flex;
        align-items: center;
      }
      .r b {
        color: #666;
      }
      .l i {
        font-size: 22px;
        margin-right: 15px;
        color: $red;
      }
      .r i {
        margin-left: 15px;
        color: #9a9a9a;
      }
      b {
        font-weight: normal;
      }
    }
    li + li {
      border-top: 1px solid #f5f5f5;
    }
  }

  .info {
    display: flex;
    padding: 15px 20px;
    background-color: white;
    align-items: center;
    justify-content: space-between;
    .avatar {
      @include wh(70px, 70px);
      border-radius: 100%;
      overflow: hidden;
    }
    .center {
      flex: 0.8;
      h3 {
        font-weight: normal;
        font-size: 16px;
      }
      span {
        color: #666;
        font-size: 13px;
      }
    }
    i {
      font-size: 25px;
      padding: 10px 0 10px 20px;
      color: #b1b1b1;
    }
  }
}
</style>

