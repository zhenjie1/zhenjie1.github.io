<template>
	<div class="pos">
		<!-- 添加银行卡 -->
		<div class="tj" v-if='isBank'>
			<p>请先添加银行卡，<a href="javascript:;" @click="addBank">立即添加 ></a></p>
		</div>
		<!-- 提现申请 -->
		<div class="tx" v-if='!isBank'>
			<div class="tit">
				<p>提现到</p>
				<p>
					<span>{{editInfo.bank}}({{editInfo.bankcard}})</span>
					<span>无限额，工作日24小时内到账</span>
				</p>
			</div>
			<div class="num">
				<p>提现金额</p>
				<div class="sr">
					<span>￥</span>
					<input type="number" v-model='money'>
				</div>
				<p class="lp"><span>可用余额 {{bankInfo.money}}元</span><span @click='allTx'>全部提现</span></p>
			</div>
		</div>
		<button v-if='!isBank' class="submit" @click='txSubmit'>确认提现</button>
		<success v-show="sShow" :status=2></success>
	</div>
</template>

<script>
import { allMoney, withdrawals, userPass } from "../../../../config/getData";
import { MessageBox } from "mint-ui";
import success from "../../../common/success/success";
export default {
  name: "postal",
  data() {
    return {
      isBank: true,
      bankInfo: "",
      editInfo: { bank: "", bankcard: "" },
      money: "",
      sShow: false
    };
  },
  components: {
    success
  },
  created() {
    // 获取银行卡
    allMoney().then(res => {
      if (res && res.code == 2) {
        this.isBank = res.rows.isBinding == 1 ? false : true;
        this.bankInfo = res.rows;
        this.editInfo.bank = this.bankInfo.bank.replace("中国", "");
        this.editInfo.bankcard = this.bankInfo.bankcard.slice(-4);
      }
    });
  },
  methods: {
    addBank() {
      this.$router.replace("/personal/bindbank");
    },
    allTx() {
      this.money = this.bankInfo.money;
    },
    txSubmit() {
      let applyMoney = this.money,
        bankName = this.bankInfo.bank,
        bankCard = this.bankInfo.bankcard;
      if (Number(applyMoney) > Number(this.bankInfo.money)) {
        alert("您的余额不足");
        return;
      }
      MessageBox.prompt("请输入密码", {
        inputType: "password"
      }).then(({ value, action }) => {
        // 获取token
        userPass(value).then(res => {
          let token = res.rows.token;
          withdrawals(applyMoney, bankName, bankCard, token).then(res => {
            if (res && res.code == 2) {
              this.sShow = true;
            }
          });
        });
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.pos {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #f5f5f5;
  padding: 12px;
  box-sizing: border-box;
  .tj {
    background-color: #fff;
    padding: 30px 0;
    text-align: center;
    font-size: 15px;
    a {
      color: #fc2b2b;
    }
  }
  .tx {
    color: #333;
    background-color: #fff;
    padding: 10px 10px 0 10px;
    .tit {
      display: flex;
      margin-bottom: 10px;
      p:first-child {
        font-weight: 700;
        margin-right: 36px;
      }
      p:nth-child(2) {
        span {
          display: block;
          color: #555;
        }
        span:first-child {
          color: #fc2b2b;
          margin-bottom: 8px;
        }
      }
    }
    .num {
      padding: 10px;
      .sr {
        margin: 6px 0;
        display: flex;
        align-items: center;
        span {
          font-size: 24px;
        }
        input {
          outline-style: none;
          border: none;
          font-size: 30px;
          color: #fc2b2b;
          padding-left: 6px;
        }
      }
      .lp {
        display: flex;
        justify-content: space-between;
        padding: 6px;
        border-top: 1px solid #ddd;
        margin-top: 10px;
        span:first-child {
          color: #aaa;
        }
        span:nth-child(2) {
          color: #ff2c2c;
        }
      }
    }
  }
  .submit {
    margin-top: 20px;
  }
}
</style>
