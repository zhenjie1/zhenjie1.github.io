<template>
	<div class="personal">
		<router-link tag='div' to='personal/basic' class="info">
			<img :src="userInfo.photo" alt="" class="avatar">
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

		<div class="menuBottom">
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
		</div>
		<transition name='breadcrumb'>
			<keep-alive>
				<router-view />
			</keep-alive>
		</transition>
	</div>
</template>

<script>
import { sosOrders } from "@/config/getData";
import { getStore } from "../../../config/mUtils";
import mapLngLat from "../../../assets/js/LatAndLon";
export default {
  data() {
    return {
      userInfo: "",
      text: ""
    };
  },
  methods: {
    sosOrdersEv() {
      mapLngLat.then(res => {
        if (res) {
          var [x, y] = [res.x, res.y];
          console.log(x, y);
          sosOrders(x, y).then(res => {
            console.log(res);
            if (res.code == 2) {
              window.location.href = "tel:" + res.mobile;
            } else if (res.code == 101) {
              window.location.href = "tel:" + res.mobile;
            } else if (res.code == 600) {
              this.$router.push("/user/home/userRescue");
            } else if (res.code == 601) {
              this.$router.push("/user/personal/verified");
            }
          });
        }
      });
    }
  },
  created() {
    if (getStore("userInfo") == null) {
      alert("请先登录！");
      this.$router.push("/user/login");
    } else {
      this.userInfo = getStore("userInfo");
      this.text = getStore("userInfo").vipType == 1 ? "保障中" : "去购买";
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
.menuBottom {
  background-color: #f8f8f8;
  height: 50px;
  width: 78%;
  position: fixed;
  left: 11%;
  bottom: 20px;
  border-radius: 100px;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
  ul {
    display: flex;
    align-items: flex-end;
    li {
      width: 33.33%;
      text-align: center;
      margin-top: -37px;
      p {
        font-size: 12px;
      }
      i {
        font-size: 20px;
        font-weight: bold;
      }
      a {
        display: block;
      }
    }
    li.checked {
      i,
      p {
        color: $red;
      }
    }
    li.middle {
      .icon {
        background-color: #f8f8f8;
        @include wh(60px, 60px);
        padding: 4px;
        text-align: center;
        border-radius: 200px;
        margin: 0 auto;
      }
      i {
        font-weight: normal;
        color: white;
        font-size: 40px;
        line-height: 60px;
        text-align: center;
        background-color: $red;
        width: 60px;
        height: 60px;
        border-radius: 100px;
        display: inline-block;
      }
      p {
        margin-top: -4px;
        color: $red;
      }
    }
  }
}
</style>

