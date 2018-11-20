<template>
	<div class="bank">
		<div class="top">
			<img :src="data.photo" alt="">
			<span class="ka">{{data.bank}}</span>
			<span class="lx">{{data.type}}</span>
			<p class="card">
				<span>****</span>
				<span>****</span>
				<span>****</span>
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
.bank { position: fixed; background-color: #272C33; height: 100%;left: 0; top: 0; width: 100%;
    .top {position: relative;height: 200px; margin: 20px auto;  width: 90%;
        .ka { position: absolute; color: #FFFFFF; font-size: 16px;left: 22%; top: 11%; }
        .lx { position: absolute; color: #FFFFFF; left: 22%;top: 23%; }
        .card { position: absolute; color: #DDDDDD; font-size: 20px;left: 22%; top: 42%;
            .num {position: relative;  color: #FFFFFF; font-family: "KaiTi";font-size: 24px; top: -5px; }}
        .nbind { position: absolute; border: 1px solid #FFFFFF; bottom: 25%; color: #FFFFFF; padding: 2px 8px;right: 16%; }
        img {background-color: transparent; display: block; width: 100%; }}
    .bottom { background-color: #343B45; color: #8C8C8D; display: flex; justify-content: space-between; padding: 10px 0;
        span { font-size: 15px;}
        i { padding: 0 8px;}}}

</style>

<script>
import { AllDealForNJ, releaseCard, userPass } from "../../../../config/getData";
import MessageBox from "mint-ui/packages/message-box/";
export default {
  data() {
    return {
      data: {},
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
			this.$vux.toast.text(res.msg)
            this.$router.push("/user/personal/money");
          });
        });
      });
    },
    ghBank() {
      if (this.data) {
        this.$vux.toast.text("请先解绑银行卡");
      } else {
        this.$router.push("/personal/bindbank");
      }
    }
  }
};
</script>




