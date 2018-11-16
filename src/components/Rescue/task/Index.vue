<template>
	<div class="task">
		<ul class="nav">
			<li
				v-for="(menuVal,ind) in RescueMenu"
				:key="ind"
				:class="{checked: ind == navIndex-1}"
				@click='navIndex = ind + 1,isShow()'
			>
				<span>{{menuVal}}</span>
			</li>
		</ul>

		<div class="ordersComm Orders">
			<ul>
				<li v-for="(item,index) in infoData" v-if="listIsShow(item)" :ref='"li"' @click='localItem(item)' :key="index" :class='"order"'>
					<!-- {{index}} -->
					<router-link to='/rescue/task/details'>
						<div class="title">
							<p>救援单号：{{item.uuid}}</p>
							<span>{{item.stateId | status(item)}}</span>
						</div>
						<!-- 只有普通用户的时候才显示 -->
						<div class="track" v-if="userType == 3">
							<i class="iconfont icon-che"></i>
							<div class="r">
								<h2>{{item.orderStautsList[0].content}}</h2>
								<span>{{ item.createDate }}</span>
							</div>
						</div>
						<div class="info">
							<img src="" alt="" class="icon">
							<div class="con">
								<h3>{{item.office | office}}</h3>
								<p>
									<span>{{item.rangeId | Rescue}}</span>
									<b>{{ item.createDate }}</b>
								</p>
							</div>
						</div>
					</router-link>
					<div class="note" v-if="item.remarks !== ''">
						<i class="iconfont icon-jinggao"></i>
						<span>备注</span>
						<p>{{item.remarks}}</p>
					</div>
					<router-link to='/rescue/map' @click.native='mapEv(item)' v-if='userType != 3'>
						<div class="position">
							<i class="iconfont icon-weizhi"></i>
							<p>{{item.place}}</p>
							<span style='opacity:0;'>22.22km</span>
							<b href="">查看地图 <i class="iconfont icon-shuangjiantouyou"></i></b>
						</div>
					</router-link>
					<div v-else>
						<div class="position">
							<i class="iconfont icon-weizhi"></i>
							<p>{{item.place}}</p>
						</div>
					</div>
					<div class="btn" v-if='item.stateId !=99'>
						<div
							v-for="(val,ind) in item.btn"
							:key='ind'
							:class="{file: val.type == 'file'}"
						>
							<span v-if="val.type == 'file'">{{val.name}}</span>
							<input
								:type="val.type"
								:value='val.type == "button" ? val.name : ""'
								accept="image/*"
								capture="camera"
								@click='accept(item,ind,val.name)'
								@change="imgResult"
							>
						</div>
					</div>
				</li>
			</ul>
			<transition name='breadcrumb'>
				<router-view></router-view>
				<personnel :originaId='originaId' v-if="isShowPer" @down='downEv'></personnel>
			</transition>
		</div>

		<confirm v-model="showCancel" :hide-on-blur='true' :show-input='true' placeholder='请输入取消理由' @on-confirm='cancelEv' :title='"取消理由"' theme="android" confirm-text='确定' cancel-text='取消'></confirm>
		<confirm v-model="showCancelRefuse" :hide-on-blur='true' :show-input='true' placeholder='请输入拒绝理由' @on-confirm='cancelRefuseEv' :title='"拒绝理由"' theme="android" confirm-text='确定' cancel-text='取消'></confirm>

		<bottom-line v-if="liLength > 0"></bottom-line>

		<div class="Empty" v-if="liLength == 0"><i class="iconfont icon-icondd1"></i><p>暂无数据</p></div>
		<div class="personal" v-if="userType != 3" @click='personal'><i class="iconfont icon-wode"></i></div>
		<div class="personal" v-else @click='personal'><i class="iconfont icon-home"></i></div>
	</div>
</template>

<script>
import Confirm from "vux/src/components/confirm/";
import socket from "@/assets/js/websocket.js";
import Personnel from "./orders/personnel";
import { RescueMenu, userMenu, rescueType } from "@/assets/js/config";
import { findMissedlist, orderBtn, findMyListOk, cancelOrder, cancelOffice } from "@/config/getData";
import { setStore, isLogin } from "../../../config/mUtils";
import { initFun,orderBtnFun,topNavMenuFun,setBtnTxtFun } from "../../../assets/js/orders";
import addScroll from "@/assets/js/scrollLoad";
import BottomLine from "../../common/bottomLine/BottomLine";
import { mapState } from 'vuex'

export default {
  data() {
    return {
      showCancelRefuse: false,
      showCancel: false,
      navIndex: 1,
      currentView: "orders",
      isShowPer: false,
      infoData: [],
      pageNum: 1,
      liLength: -1,
      userType: "", //用户类型
      total: 0, //共多少条数据
      socketData: {},
      originalData: [],
      originaId: "",
      clickObj: "",
      test: "",
      RescueMenu: []
    };
  },
  computed:{
	  ...mapState([
		  'userInfo'
	  ])
  },
  filters: {
    office(str) {
      return typeof str == "object"
        ? str.name
        : str == "" || str == undefined
          ? "救援机构未分配"
          : str;
    },
    status(str, item) {
      return setBtnTxtFun(str, item);
    }
  },
  watch: {
    $route: "initData"
  },
  created() {
	if( !isLogin.call(this) ) {
		this.$vux.toast.text('请先登录！')
		this.$router.push('/user/login')
	}
    addScroll(this);
  },
  methods: {
    cancelRefuseEv(val) {
      if (val == "") {
        alert("请输入拒绝理由！");
        return;
      }
      cancelOffice(this.originaId, val).then(res => {
        this.clickObj.stateId = "99";
      });
    },
    localItem(item) {
      setStore("viewCurrentData", item);
    },
    cancelEv(val) {
      if (val == "") {
        alert("请输入拒绝理由！");
        return;
      }
      cancelOrder(this.originaId, val).then(res => {
        this.clickObj.stateId = "99";
      });
    },
    mapEv(item) {
      sessionStorage.lngLat = item.jingwei;
      // console.log(sess)
    },
    imgResult(e) {
      if (e.target.files.length > 0) {
        alert("拍摄成功");
      } else {
        // alert("您未拍摄照片");
      }
    },
    listIsShow(item) {
      // if(this.userType == 2){
      // 	if(this.navIndex == 1) return item.stateId == 0 || item.stateId == 1
      // 	return item.stateId == this.navIndex
      // }else if(this.userType == 3){
      // 	return true;
      // }
      if (this.userType == 3) {
        return true;
      } else {
        if (this.navIndex == 1) return item.stateId == 0 || item.stateId == 1;
        return item.stateId == this.navIndex;
      }
    },
    isShow() {
      topNavMenuFun(this);
    },
    personal() {
      if (this.userType == 3) {
        this.$router.push("/user/home");
      } else {
        this.$router.push("/personal");
      }
    },
    initData() {
      initFun(this, this.userType);
    },
    downEv(msg) {
      if (msg === true) {
        for (let i = 0; i < this.infoData.length; i++) {
          if (this.infoData[i].id == this.originaId) {
            this.infoData[i].stateId = 1;
            break;
          }
        }
        this.isShowPer = false;
      } else if (msg === false) {
        this.isShowPer = false;
      } else alert(msg);
    },
    statusSet(item) {
      orderBtn(item.id, item.stateId + 1).then(res => {
        if (res.code == 2) {
          item.stateId = item.stateId + 1;
          // console.log(item.stateId)
        }
      });
    },
    //点击按钮
    accept(item, ind, name) {
      // console.log(name)
      orderBtnFun(this, this.userType, item, ind, name);
    }
  },
  mounted() {
    try {
      this.userType = this.userInfo["userType"];
    } catch (e) {
      this.$router.push("/user/login");
    }

    this.RescueMenu = this.userType == 3 ? userMenu : RescueMenu;
    // console.log(this.RescueMenu)
    this.initData();
    var that = this;

    //对推送过来的数据进行处理
    // if(this.userType != 3){
    socket(data => {
      console.log(data);
      if (data.code == 1) {
        alert("你有新的任务");
        // this.infoData = data.rows
        this.infoData.splice(0, 0, data.rows);
      } else if (data.code == 3) {
        // alert(data.msg);
      } else if (data.code == 2) {
        alert("你有新的任务");
        this.infoData.splice(0, 0, data.rows);
      }
    });
    // }
  },
  components: {
    Personnel,
    BottomLine,
    Confirm
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/all.scss";

$size: 44px;
.personal {
  position: fixed;
  left: 20px;
  bottom: 20px;
  background-color: white;
  border-radius: 100%;
  width: $size;
  height: $size;
  line-height: $size;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  i {
    font-size: 24px;
    font-weight: bold;
  }
}

.task {
  min-height: 100%;
  .nav {
    display: flex;
    background-color: white;
    justify-content: space-around;
    li {
      line-height: 43px;
      text-align: center;
      color: $gray;
      flex: 1;
      span {
        line-height: 40px;
        display: inline-block;
        border-bottom: 2px solid transparent;
      }
    }
    li.checked span {
      border-color: $red;
      color: $red;
    }
  }
  .Empty {
    text-align: center;
    i {
      font-size: 70px;
      color: #bfbfbf;
      margin: 80px 0 28px;
      display: block;
    }
    p {
      color: #848689;
      font-size: 17px;
    }
  }
}
</style>
<style lang="scss">
@import "../../../assets/css/all.scss";

.ordersComm {
  li.order {
    margin-top: 10px;
    background-color: white;
    a {
      display: block;
    }
  }
  .track {
    display: flex;
    border-top: 1px solid #f0f0f0;
    padding: 15px;
    .iconfont {
      font-size: 20px;
      margin-right: 10px;
      color: #666;
    }
    .r {
      flex: 1;
      h2 {
        font-weight: normal;
        font-size: 12px;
      }
      span {
        font-size: 12px;
        color: #8b8b8b;
        margin-top: 10px;
        display: block;
      }
    }
  }
  > a {
    display: block;
  }
  .title {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    line-height: 40px;
    span {
      color: $red;
    }
  }
  .info {
    background-color: #f8f8f8;
    display: flex;
    padding: 10px 15px;
    align-items: center;
    .icon {
      width: 70px;
      height: 70px;
      display: block;
      margin-right: 10px;
    }
    h3 {
      font-size: 14px;
      font-weight: normal;
    }
    p {
      font-size: 13px;
      margin-top: 10px;
      span {
        margin-right: 20px;
      }
      b {
        font-weight: normal;
      }
    }
  }
  // .supplement{
  .note {
    font-size: 14px;
    line-height: 1;
    padding: 10px 15px;
    border-bottom: 1px solid $e6;
    i {
      color: $red;
      margin-right: 4px;
      display: inline-block;
    }
    p {
      color: $gray;
      font-size: 12px;
      margin: 4px 0 0 24px;
      line-height: 1.5;
    }
  }
  .position {
    display: flex;
    font-size: 12px;
    line-height: 36px;
    border-bottom: 1px solid $e6;
    i {
      font-size: inherit;
      margin: 0 4px 0 15px;
    }
    p {
      height: 36px;
      overflow: hidden;
      width: 55%;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    span {
      margin: 0 4px;
    }
    b {
      color: $red;
      font-weight: normal;
      i {
        margin-left: -2px;
      }
    }
  }
  // }
  .btn {
    display: flex;
    justify-content: flex-end;
    padding: 5px 0;
    font-size: 14px;
    input {
      border: 1px solid #333;
      background-color: white;
      width: 75px;
      height: 28px;
      border-radius: 3px;
      margin-right: 10px;
    }

    .file {
      position: relative;
      border: 1px solid #333;
      width: 73px;
      height: 26px;
      overflow: hidden;
      border-radius: 3px;
      margin-right: 10px;
      line-height: 28px;
      text-align: center;
      span {
        font-size: 13px;
        line-height: 28px;
      }
      input {
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}
</style>
