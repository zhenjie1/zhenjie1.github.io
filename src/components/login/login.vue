<template>
	<div class="login">
		<div class="logo"><img src="" alt=""></div>
		<form class="form" @submit.prevent='loginEv'>
			<label><input type="text" placeholder="请输入手机号/天机卡号" name='username' v-model="username"></label>
			<label>
				<input :type="isLook ? 'text' : 'password'" name='password' placeholder="请输入登录密码" v-model="password">
				<i class="iconfont icon-Close" v-show="!isLook" @click='isLook = !isLook'></i>
				<i class="iconfont icon-yanjing" v-show="isLook" @click='isLook = !isLook'></i>
			</label>
			<div class="btn">
				<router-link to='/user/newUser'>新用户注册</router-link>
				<router-link to='/user/forgetPass'>忘记密码？</router-link>
			</div>
			<input type="submit" :disabled='!disabled' :class='{active:disabled}' class="submit" value="登录">
		</form>
	</div>
</template>

<script type='text/javascript'>
import { login } from "../../config/getData.js";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
	data() {
		return {
			isLook: false,
			username: "",
			password: ""
		};
	},
	computed: {
		...mapState(["userInfo", "homeUrl"]),
		disabled() {
			return !!this.username && !!this.password;
		}
	},
	mounted() { },
	methods: {
		...mapActions(["setUserInfo"]),
		loginEv() {
			login(this.username, this.password, true).then(res => {
				this.$vux.toast.text(res.msg);
				if (res.code == 2) {
					res = res.rows;
					this.setUserInfo(res);
					this.userInfo["userType"] == 3 ? this.$router.push(this.homeUrl) : this.$router.push("/rescue/task");
				}
			});
		}
	}
};
</script>


<style lang="scss" scoped>
@import "../../assets/css/all";
input[type="text"]:focus, input[type="password"]:focus, textarea:focus { box-shadow: 0 0 0 1000px white inset; color: #333333;}

.login { position: absolute; background-color: white; height: 100%; left: 0; top: 0; width: 100%;
    .logo { @include wh(76px, 88px); background: url("../../assets/images/logo.png") no-repeat 0 0/100% 100%; display: block; margin: 90px auto 80px;}
    .form { margin: 0 auto; width: 90%;
        label { position: relative; display: block; margin-top: 10px;
            input { background-color: transparent; border: none; border-bottom: 1px solid $e6; font-size: 16px; height: 16px; line-height: 16px; padding: 15px 0; width: 100%;}
            .iconfont { position: absolute; padding: 10px; right: 0; top: 50%; transform: translateY(-50%);}}
        .btn { display: flex; justify-content: space-between; margin: 28px 0 37px;}}}

</style>

