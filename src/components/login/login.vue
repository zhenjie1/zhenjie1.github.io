<template>
<div class="login">
	<div class="logo"><img src="" alt=""></div>
  <!-- <form action="http://t.tjh.homebank.shop:8080/jeesite/mobile/a/login?__ajax=true" method="post">
    <input type="text" name="username">
    <input type="text" name="password">
    <input type="text" name="mobileLogin" value="true">
    <input type="submit" value="提交">
  </form> -->
	<div class="form">
		<label><input type="text" placeholder="请输入手机号/天机卡号" v-model="username"></label>
		<label>
			<input :type="isLook ? 'text' : 'password'" placeholder="请输入登录密码" v-model="password">
			<i class="iconfont icon-Close" v-show="!isLook" @click='isLook = !isLook'></i>
			<i class="iconfont icon-yanjing" v-show="isLook" @click='isLook = !isLook'></i>
		</label>
		<div class="btn">
			<router-link to='/user/newUser'>新用户注册</router-link>
			<router-link to='/user/forgetPass'>忘记密码？</router-link>
		</div>
		<input type="submit" :disabled='!disabled' :class='{active:disabled}' @click='loginEv' class="submit" value="登录">
	</div>
</div>
</template>

<script>
import { login } from "../../config/getData.js";
import { mapActions, mapState, mapMutations } from "vuex";
import { getStore } from "../../config/mUtils";

export default {
  data() {
    return {
      isLook: false,
      username: "",
      password: ""
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    disabled() {
      return !!this.username && !!this.password;
    }
  },
  mounted() {},
  methods: {
    ...mapActions(["setUserInfo"]),
    loginEv() {
      login(this.username, this.password, true).then(res => {
        if (res.code == 2) {
          // console.log(res.code)
          res = res.rows;
          this.userInfo = res.rows;
          if (!res.id) {
            alert(res.msg);
          } else {
            this.setUserInfo(res);
            if (getStore("userInfo")["userType"] == 3)
              this.$router.push("/user/home");
            else this.$router.push("/rescue/task");
            //task
          }
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../assets/css/all";
input[type="text"]:focus,
input[type="password"]:focus,
textarea:focus {
  box-shadow: 0 0 0 1000px white inset;
  color: #333;
}

.login {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  .logo {
    @include wh(76px, 88px);
    display: block;
    margin: 90px auto 80px;
    background: url("../../assets/images/logo.png") no-repeat 0 0/100% 100%;
  }
  .form {
    width: 90%;
    margin: 0 auto;
    label {
      display: block;
      margin-top: 10px;
      position: relative;
      input {
        border: none;
        border-bottom: 1px solid $e6;
        width: 100%;
        height: 16px;
        line-height: 16px;
        padding: 15px 0;
        background-color: transparent;
        font-size: 16px;
      }
      .iconfont {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        padding: 10px;
      }
    }
    .btn {
      display: flex;
      justify-content: space-between;
      margin: 28px 0 37px;
    }
  }
}
</style>

