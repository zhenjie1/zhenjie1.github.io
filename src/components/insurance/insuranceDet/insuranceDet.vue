<template>
	<div class="insurDet" id="insurDet">
		<div class="insurDetBan">
			<img src="" alt="" />
		</div>
		<div class="insurDetName">
			<h5 class="insurName">天佑{{name}}</h5>
			<div class="clearfix insurNameBot">
				<div class="fl">{{zData.remarks}}</div>
				<div class="fr">天佑在线承保</div>
			</div>
		</div>
		<div class="insurDetFw w96">
			<div class="borbot insurF">
				<h4>保险范围</h4>
				<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo</div>
			</div>
			<div class="borbot">
				<h4>保障期限<span class="">(支付成功后日生效)</span></h4>
				<div class="insurDetQx">
					<label v-for="(Dtime,index) in dateData" :key="index" @click="choose(index)" :class="{active:index==timeIndex}">
						<span ref="menuItem">{{Dtime.insuranceId}}</span>
						<span ref="itmeMon">{{Dtime.insuranceMoney}}</span>
						<input type="radio" name="1" value="半年" />{{Dtime.insuranceDay}}
					</label>
				</div>
			</div>
			<div>
				<h4>为谁投保</h4>
				<div class="insurDetQx">
					<label v-for="(Dtime,index) in Derdata" :key="index" @click="pchoose(index)" :class="{active:index==penIndex}"ref="typeMen">
						<input type="radio" name="1" value="半年" />{{Dtime.pen}}
					</label>
				</div>
			</div>
		</div>
		<div class="DetFrom">
			<div class="DetUserName">
				<label for="">被保人姓名</label>
				<input type="text" v-model="input1" placeholder="请输入被保人的真实姓名"/>
			</div>
			<div class="DetSfz">
				<label for="">身份证号码</label>
				<input type="text" v-model="input2" placeholder="请填写真实的身份证号"/>
			</div>
		</div>
		<div class="DetChoose">
			<div class="clearfix DetChooseList" v-if='zData.isMc==1'>
				<div class="fl DetChooseTit">是否有医保（含新农合）</div>
				<ul class="fr surybBox">
					<!-- {{ybIndex}} -->
					<li v-for="(surs,index) in sureNo" class="fl surybw" :key="index" @click="ychoose(index)" :class="{active:index==ybIndex}">{{surs.val}}</li>
				</ul>
			</div>
			<div class="clearfix DetChooseList" v-if='zData.isHospital == 1'>
				<div class="fl DetChooseTit">最近是否住院</div>
				<ul class="fr surybBox">
					<li
						v-for="(surs,index) in sureNo"
						:key="index"
						class="fl suryb"
						@click="zychoose(index)"
						:class="{active:index==zyIndex}"
					>{{surs.text}}</li>
				</ul>
			</div>
		</div>
		<div class="insurUpImg">
			<router-link class="clearfix" v-show='ybIndex == 1' :to="'/user/insuranceList/insuranceDet'+this.id +'/insurImgUp'">
				<div class="fl DetChooseTit">上传证明</div>
				<div class="insurUpImga fr">{{tip}}<span class="iconfont icon-jiantou"></span></div>
			</router-link>
			<div class="clearfix" @click='lpBtn'>
				<div class="fl DetChooseTit">理赔流程</div>
				<span class="lp fr iconfont icon-jiantou"></span>
			</div>
		</div>
		<div class="DetBot">
			<div class="DetBotRead w96 clearfix">
				<div class="DetBotCheck fl" :class="{'DetBotCheckbox':isA,'DetBotCheck':!isA}" @click="gbsrc()"></div>
				<div class="fl">阅读并同意<router-link to='/user/agree/1' class="TY">《投保条约》</router-link></div>
			</div>
			<div class="DetBotb clearfix">
				<div class="DetBotPrice fl"><span class="inspan">价格：</span><span class="inp" style="color: #f02b2b;">{{paymon}}</span></div>
				<div class="DetBotSub fl">
					<a href="javascript:;" @click="upData">提交</a>
				</div>
			</div>
		</div>

		<payment v-model='isShowPay' :show='isShowPay' :data='propsData' :pageNum='pageNum' :showList='[0]'></payment>
		<router-view></router-view>
	</div>
</template>

<script>
import {insListDet,insUpImages,paySave,insListReceive} from "../../../config/getData";
import { mapState } from "vuex";

import Payment from "../../common/payment/Payment";
export default {
  components: {
    Payment
  },
  props: {
    imgDataArr: Object
  },
  data() {
    return {
      tip: "点击上传证明(医保/住院证明)",
      isA: false,
      input1: "",
      input2: "",
      isShoww: true,
      isShowx: false,
      penIndex: 0,
      ybIndex: 0,
      zyIndex: 0,
      Derdata: [
        { pen: "本人" },
        { pen: "配偶" },
        { pen: "父母" },
        { pen: "子女" }
      ],
      dateData: [],
      name: "",
      paymon: "",
      sureNo: [{ text: "否", val: "无医保" }, { text: "是", val: "有医保" }],
      yselected: 0,
      zselected: 0,
      timeIndex: 0,
      penIndex: 0,
      hospitalImgs: "",
      zyIndex: 1,
      ybIndex: 1,
      nDate: [],
      propsData: {},
      pageNum: 2,
      isShowPay: false,
      id: "",
      zData: ""
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  watch: {
    $route: function() {
      if (localStorage.ImgDataArr != undefined) {
        this.tip = "已上传";
      }
    }
  },
  methods: {
    // 理赔跳转
    lpBtn() {
		this.$router.push('/user/insuranceList/claims/' + this.zData.claimProcess)
    },
    //投保期限选择
    choose: function(index) {
      this.timeIndex = index;
      this.dayId = this.$refs.menuItem[index].innerText;
      this.paymon = this.$refs.itmeMon[index].innerText;
    },
    //角色选择
    pchoose: function(index) {
      this.penIndex = index;
      if (index == 0) {
        this.input1 = this.zData.actualName;
        this.input2 = this.zData.idNumber;
      } else {
        this.input1 = "";
        this.input2 = "";
      }
    },
    //医保选择
    ychoose: function(index) {
      this.ybIndex = index;
    },
    //住院选择
    zychoose: function(index) {
      this.zyIndex = index;
    },
    upData() {
      if (this.input1 == "") {
        this.$vux.toast.text("请填写姓名");
      } else if (this.input2.length != 18 && this.input2.length != 15) {
        this.$vux.toast.text("请填写身份证");
      } else if (this.isA == false) {
        this.$vux.toast.text("请阅读并同意投保条约");
      } else if (this.ybIndex == 1 && localStorage.ImgDataArr == undefined) {
        this.$vux.toast.text("请上传住院证明");
      } else {
        let userName = this.input1;
        let user_id_number = this.input2;
        let typeMen = this.penIndex;
        let isMc = this.ybIndex;
        let isHospital = this.zyIndex;
        let hospitalImgs;
        if (localStorage.ImgDataArr != undefined) {
          hospitalImgs = JSON.parse(localStorage.ImgDataArr);
          hospitalImgs = hospitalImgs.join("%##%");
        }
        let id = this.$route.params.id;
        let dayId = this.dayId;
        let paymon = this.paymon;
        let isUploadimg = this.zData.isUploadimg;
        if (dayId == undefined) {
          dayId = this.dateData[0].insuranceId;
        }
        this.propsData = {
          id,
          dayId,
          typeMen,
          userName,
          user_id_number,
          isMc,
          isHospital,
          hospitalImgs,
          paymon
        };
        this.getData();
      }
    },
    getData() {
      this.isShowPay = true;
    },
    gbsrc() {
      this.isA = !this.isA;
    }
  },
  mounted() {
    //保险天数选项初始值
    var id = this.$route.params.id;
    insListReceive(id).then(res => {
      this.dateData = res.rows.insuranceList;
      this.paymon = this.dateData[0].insuranceMoney;
      this.name = res.rows.name;
      this.zData = res.rows;
      this.input1 = res.rows.actualName;
      this.input2 = res.rows.idNumber;
    });
  },
  destroyed() {
    if (
      localStorage.ImgDataArr !== undefined ||
      localStorage.ImgThis !== undefined
    ) {
      localStorage.removeItem("ImgDataArr");
      localStorage.removeItem("ImgThis");
    }
  }
};
</script>

<style scoped>
body {
  background-color: #fff;
}
input,
select {
  border: none;
  outline: none;
}
.fr {
  float: right;
}
.fl {
  float: left;
}
.lp {
  margin-right: 20px;
  color: #666;
  font-size: 14px;
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.borbot {
  border-bottom: 1px solid #ddd;
}
.w96 {
  width: 96%;
  padding: 0 2%;
}
.insurDet {
  padding-bottom: 80px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
  overflow-y: auto;
  background-color: #f5f5f5;
}
.insurNameBot {
  color: #9b9b9b;
  line-height: 12px;
  font-size: 12px;
}
.insurDetName {
  background-color: #fff;
  overflow: hidden;
  padding: 0 2% 15px;
}
.insurName {
  font-size: 22px;
  font-weight: 100;
  color: #333;
  margin-top: 15px;
  margin-bottom: 8px;
  letter-spacing: 1px;
}
#insurDet .insurDetBan {
  width: 100%;
  height: 151px;
  background-color: #fff;
  position: relative;
}
#insurDet .insurHead {
  position: absolute;
  top: 0;
  left: 0;
  height: 44px;
  width: 100%;
}
#insurDet .hisReturn {
  position: absolute;
  left: 20px;
  top: 50%;
  margin-top: -8px;
  font-size: 16px;
}
#insurDet .insurHead h4 {
  width: 100%;
  line-height: 44px;
  color: #000;
  text-align: center;
  font-size: 15px;
}
#insurDet .insurF {
  margin-top: 10px;
  overflow: hidden;
  padding-bottom: 16px;
}
#insurDet .insurDetFw .insurF h4 {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 14px;
}
#insurDet .insurF div {
  text-indent: 1em;
  color: #999;
}
#insurDet .surybBox {
  margin-right: 20px;
}
#insurDet .surybw {
  width: 72px;
  text-align: center;
  margin-left: 8px;
  border: 1px solid #ececec;
  height: 28px;
  line-height: 28px;
  margin-top: 7px;
  border-radius: 15px;
  color: #888;
}
#insurDet .surybw.active {
  background-color: #ffeded;
  color: #f02b2b;
}
#insurDet .suryb {
  width: 49px;
  text-align: center;
  margin-left: 8px;
  border: 1px solid #ececec;
  height: 28px;
  line-height: 28px;
  margin-top: 7px;
  border-radius: 15px;
  color: #888;
}
#insurDet .suryb.active {
  background-color: #ffeded;
  color: #f02b2b;
}
#insurDet .insurUpImg {
  margin-top: 10px;
  background-color: #fff;
  line-height: 38px;
  margin-bottom: 95px;
}
#insurDet .insurUpImga {
  margin-right: 20px;
  color: #bbbbbb;
  font-size: 14px;
  text-align: right;
}
#insurDet .insurUpImga span {
  color: #666;
  font-size: 14px;
  margin-left: 14px;
  line-height: 38px;
}

#insurDet .insurDetFw {
  line-height: 20px;
  background-color: #fff;
}
#insurDet .insurDetFw h4 {
  font-size: 15px;
  line-height: 25px;
  color: #333;
  font-weight: 100;
  margin-top: 12px;
  text-indent: 0.6em;
}
#insurDet .insurDetFw h4 span {
  color: #888888;
  font-size: 13px;
}
#insurDet .insurDetQx label {
  display: inline-block;
  width: 23%;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  line-height: 28px;
  font-size: 14px;
  margin-left: 4px;
  background-color: #fff;
  height: 40px;
  line-height: 40px;
  border: 1px solid #ccc;
  border-radius: 20px;
  color: #888888;
  margin-top: 14px;
  margin-bottom: 21px;
}
#insurDet .insurDetQx label.active {
  background-color: #ffeded;
  color: #f02b2b;
}
#insurDet .insurDetQx label span {
  display: none;
}
#insurDet .DetFrom {
  margin-top: 10px;
}
#insurDet .DetUserName,
.DetSfz {
  width: 100%;
  border-bottom: 1px solid #f5f5f5;
  background-color: #fff;
  line-height: 44px;
}
#insurDet .DetUserName label,
.DetSfz label {
  margin-left: 12px;
  color: #333;
}
#insurDet .DetUserName input,
.DetSfz input {
  line-height: 38px;
  margin-left: 40px;
  letter-spacing: 0.3px;
}

#insurDet .DetChooseList select {
  width: 55px;
  height: 24px;
  line-height: 24px;
  margin-right: 21px;
  margin-top: 7px;
  border-radius: 7px;
  border: 1px solid #f5f5f5;
}
#insurDet .DetChooseList {
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
  line-height: 44px;
}

#insurDet .DetChooseTit {
  margin-left: 12px;
}
#insurDet .DetBot {
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  width: 100%;
}
.DetBotPrice {
  width: 60%;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
}
.inspan {
  color: #8b8b8;
  font-size: 16px;
}

#insurDet .DetBotSub {
  line-height: 50px;
  width: 40%;
  text-align: center;
  background-color: #bd2c00;
}
#insurDet .DetBotSub a {
  display: block;
  color: #fff;
  font-size: 16px;
}
.DetBotb {
  height: 50px;
}
.DetBotRead {
  font-size: 12px;
  color: #8b8b8b;
  line-height: 30px;
}
.DetBotRead .TY {
  color: #f02b2b;
}
.DetBotRead img {
  width: 16px;
  height: 16px;
  background-color: #fff;
  margin-top: 6px;
}
.inP {
  color: #f02b2b;
}
#insurDet .DetFrom .mint-button--default {
  color: #000;
  -webkit-box-shadow: none;
  box-shadow: none;
  background-color: #fff;
  margin-left: 30px;
  font-size: 14px;
  text-align: left;
}
.DetBotCheck {
  width: 16px;
  height: 30px;
  margin-right: 4px;
  display: inline-block;
  background: url(../../../assets/images/checkw.png) no-repeat 0 7px;
  background-size: 16px;
}
.DetBotCheckbox {
  background: url(../../../assets/images/checkBox.png) no-repeat 0 7px;
  background-size: 16px;
}
</style>
