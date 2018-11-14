<template>
	<div class="money">
		<div class="style">
			<p></p>
			<span></span>
		</div>
		<div class="con">
			<div class="top">
				<div class="border"></div>
				<p>您的天机卡余额(元)</p>
				<span>{{data.money}}</span>
				<p>元</p>
			</div>
			<div class="bottom" :class='userType == 3?"":"bottomNew"'>
				<p>{{data.content}}<router-link to='/user/personal/remind'>去查看></router-link>
				</p>
				<input type="button" value="充 值" @click='showPayment = true' v-if='userType == 3'>
				<input type="button" value="提 现" @click='txBtn' v-else>
				<input class="card" type="button" value="银行卡" @click='cardBtn' v-if='userType != 3'>
			</div>
		</div>
		<payment v-if='userType == 3' :showList='[0,1,2]' :show='showPayment' v-model="showPayment"></payment>
	</div>
</template>

<script>
import Payment from "@/components/common/payment/Payment";
import { allMoney } from "../../../../config/getData";
import { getStore } from "../../../../config/mUtils";
export default {
  data() {
    return {
      data: [],
      showPayment: false,
      userType: ""
    };
  },
  methods: {
    txBtn() {
      this.$router.push("/personal/postal");
    },
    cardBtn() {
      if (this.data.isBinding == 0) {
        this.$router.push("/personal/postal");
      } else if (this.data.isBinding == 1) {
        this.$router.push("/personal/bank");
      }
    }
  },
  created() {
    allMoney().then(res => {
      console.log(res.rows)
      this.data = res.rows;
    });
    this.userType = getStore("userInfo").userType;
  },
  components: {
    Payment
  }
};
</script>


<style lang="scss" scoped>
@import "../../../../assets/css/all";

.money {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: hidden;
  .style {
    position: absolute;
    z-index: 0;
    pointer-events: none;
    width: 100%;
    height: 100%;
    p {
      width: 0;
      height: 0;
      padding: 320px;
      background-color: #f34f4f;
      border-radius: 50%;
      position: absolute;
      left: -40px;
      bottom: -320px;
    }
    span {
      display: block;
      @include wh(0, 0);
      background-color: white;
      padding: 200px;
      border-radius: 50%;
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
      position: absolute;
      left: -80%;
      bottom: -280px;
    }
  }
  .con {
    color: #f12b2c;
    text-align: center;
    height: 100%;
    .top {
      padding-top: 43px;
      .border {
        width: 31px;
        height: 3px;
        border-radius: 10px;
        background-color: #333;
        margin: 0 auto 33px;
      }
      p {
        font-size: 16px;
      }
      span {
        font-size: 50px;
        font-weight: bold;
        margin: 6px 0;
        display: block;
      }
    }
    .bottom {
      position: absolute;
      left: 0;
      bottom: 80px;
      width: 80%;
      left: 10%;
      p {
        color: white;
        font-size: 16px;
        width: 100%;
        margin: 0 auto;
      }
      a {
        display: block;
        color: white;
        text-decoration: underline;
      }
      input {
        background-color: #fff35c;
        color: #f12b2c;
        border: none;
        width: 100%;
        height: 56px;
        border-radius: 100px;
        font-size: 20px;
        margin-top: 40px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      }
      .card {
        background-color: transparent;
        border: 1px solid #fff35c;
        color: #fff35c;
      }
    }
    .bottomNew {
      bottom: 30px;
      input {
        margin-top: 20px;
      }
    }
  }
}
</style>

