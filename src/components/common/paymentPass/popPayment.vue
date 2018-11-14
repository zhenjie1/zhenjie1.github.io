<template>
	<div class="PaymentPass">
		<div class="bg" @click='hide'></div>

		<div class="container">
			<div class="title">
				<i class="iconfont icon-guanbi" @click='hide'></i>
				请输入支付密码
			</div>
			<div class="content">
				<form @submit.prevent="submit">
					<input type="password" v-model="paymentPass" placeholder="支付密码" ref="pass">
					<!-- <input type="button" value="确认购买"> -->
					<i class="iconfont icon-jiantou" @click='submit'></i>
				</form>
				<router-link to='/setting/payment/forget' tag='b'>忘记支付密码
				</router-link>
			</div>
		</div>
	</div>
</template>


<script>
import { rescueMoney, allMoney, userPass ,rescueInt} from "../../../config/getData";
export default {
  props: {
	value: Boolean,
	rescueId: String
  },
  data() {
    return {
      paymentPass: "",
	  token: "",
    };
  },
  watch: {
    value(val) {
      val && setTimeout(() => this.$refs.pass.focus(), 0);
    }
  },
  methods: {
    submit() {
      if (!this.paymentPass) {
        this.$vux.toast.text("请输入支付密码");
        return;
      } else if (this.paymentPass.length < 6) {
        this.$vux.toast.text("支付密码最少 6 位");
        return;
	  }
      userPass(this.paymentPass).then(res => {
        console.log(`id：${this.rescueId}  token：${res.rows.token}`);

        rescueMoney(this.rescueId, res.rows.token).then(res => {
          if (res.code == 2) {
            this.$vux.toast.text("购买成功");
            this.$emit("vipType", 1);
            this.$router.go(-1);
          } else {
            this.$vux.toast.text(res.msg);
          }
        });

      });
    },
    hide() {
      this.$emit("input", false);
    },
    getData() {
      allMoney().then(res => {
        this.money = res.rows.money;
        this.options[0]["txt"] = `可用余额 ${this.money} 元`;
      });
    }
  },
  created: function() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/all.scss";

.title {
  text-align: center;
  line-height: 45px;
  border-bottom: 1px solid #f5f5f5;
  font-size: 16px;
  i {
    float: left;
    font-size: 14px;
    display: block;
    width: 50px;
    position: absolute;
  }
}
.title,
.content {
  background-color: white;
}
.bg {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.PaymentPass {
  @include screen;
  background-color: transparent;
  .container {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    .content {
      padding: 40px 0;
      overflow: hidden;
      form {
        display: flex;
        width: 80%;
        margin: auto;
        align-items: center;
      }
      input[type="password"] {
        height: 20px;
        padding: 15px 10px;
        display: block;
        margin: 0 auto;
        flex: 1;
        border: none;
        border-bottom: 1px solid #f0f0f0;
      }
      i {
        background-color: white;
        border: 1px solid #f0f0f0;
        line-height: 40px;
        width: 40px;
        border-radius: 50%;
        font-weight: bold;
        height: 40px;
        margin-left: 10px;
      }

      b {
        line-height: 40px;
        display: block;
        float: right;
        padding: 0 20px;
        margin-top: 30px;
        color: $red;
        font-size: 14px;
        font-weight: normal;
      }
    }
  }
}
</style>
