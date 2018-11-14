<template>
	<div class="bank">
		<div class="top">
			<img :src="data.photo" alt="">
			<span class="ka">{{data.bank}}</span>
			<span class="lx">{{data.type}}</span>
			<p class="card">
				<span>****</span>&nbsp
				<span>****</span>&nbsp
				<span>****</span>&nbsp
				<span class="num">{{bankCard}}</span>
			</p>
			<div class="nbind" @click='nbind'>
				解绑
			</div>
		</div>
		<!-- <router-link to='/personal/bindbank' class="bottom"> -->
		<div class="bottom" @click='ghBank'>
			<p><i class="icon iconfont icon-tianjia1"></i><span>更换银行卡</span></p>
			<i class="icon iconfont icon-jiantou"></i>
		</div>
		<!-- </router-link> -->
	</div>
</template>

<style lang="scss" scoped>
.bank {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #272c33;
  width: 100%;
  height: 100%;
  .top {
    width: 90%;
    height: 200px;
    margin: 20px auto;
    position: relative;
    .ka {
      position: absolute;
      color: #fff;
      top: 11%;
      left: 22%;
      font-size: 16px;
    }
    .lx {
      position: absolute;
      color: #fff;
      top: 23%;
      left: 22%;
    }
    .card {
      position: absolute;
      top: 42%;
      left: 22%;
      color: #ddd;
      font-size: 20px;
      .num {
        color: #fff;
        font-size: 24px;
        position: relative;
        top: -5px;
        font-family: "KaiTi";
      }
    }
    .nbind {
      position: absolute;
      bottom: 25%;
      right: 16%;
      color: #fff;
      border: 1px solid #fff;
      padding: 2px 8px;
    }
    img {
      width: 100%;
      background-color: transparent;
      display: block;
    }
  }
  .bottom {
    background-color: #343b45;
    color: #8c8c8d;
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    span {
      font-size: 15px;
    }
    i {
      padding: 0 8px;
    }
  }
}
</style>

<script>
import {
  AllDealForNJ,
  releaseCard,
  userPass
} from "../../../../config/getData";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      data: "",
      bankCard: ""
    };
  },
  created() {
    AllDealForNJ().then(res => {
      this.data = res.rows[0];
      this.data.bank = this.data.bank.replace("中国", "");
      this.bankCard = this.data.bankcard.slice(-4);
    });
  },
  mounted() {},
  methods: {
    // 解绑
    nbind() {
      MessageBox.prompt("请输入密码", {
        inputType: "password"
      }).then(({ value, action }) => {
        userPass(value).then(res => {
          let token = res.rows.token;
          releaseCard(this.data.bankcard).then(res => {
            this.$router.push("/user/personal/money");
          });
        });
      });
    },
    ghBank() {
      if (this.data) {
        alert("请先解绑银行卡");
      } else {
        this.$router.push("/personal/bindbank");
      }
    }
  }
};
</script>




