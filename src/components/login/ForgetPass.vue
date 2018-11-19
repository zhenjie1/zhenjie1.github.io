<template>
<div class="newUser">
	<div class="topTit">
		<h4>忘记登录密码？</h4>
		<h1>请输入要找回的天佑账号</h1>
	</div>
	<div class="con">
		<p>天佑账号</p>
		<label>
			<input type="number" placeholder="请您输入手机号" v-model="phone" oninput="if(value.length>11)value=value.slice(0,11)" >
		</label>
		<p>验证码</p>
		<div class="label">
			<input type="text" placeholder="请您输入验证码" v-model="code">
			<input type="button" :disabled='phone.length < 11 || codeIsSend' @click='sendCode()' :value="codeTxt" class="code">
		</div>
		<input type="button" value="确定" :disabled=' !isSubmit ' :class="{active: isSubmit }" class="submit" @click='next'>
	</div>

</div>
</template>

<script>
import { phoneSendCode, checkCode } from '../../config/getData.js'

export default {
	data(){
		return {
			phone:'',
			code:'',
			codeTxt:'验证码',
			num:60,
			codeIsSend: false
		}
	},
	computed: {
		isSubmit(){
			return this.phone.length >= 11 && this.code.length >= 6
		}
	},
	methods: {
		sendCode(){
			var that = this;
			this.codeIsSend = true
			phoneSendCode(this.phone).then( res => {
				if(res.code == 2){
					this.$vux.toast.text('发送成功')
					that.codeTxt = that.num + 's 重发';
					var codeInter = setInterval(function(){
						that.num--;
						that.codeTxt = that.num + 's 重发'
						if(that.num <= 0) {
							clearInterval(codeInter);
							that.codeIsSend = false;
							that.codeTxt = '再次获取';
							that.num = 60
						}
					},1000)
				}else{
					this.$vux.toast.text(res.msg);
					this.codeIsSend = false;
				}
			})
		},
		next(){
			checkCode(this.code).then( res => {
				if(res && res.code == 2){
					this.$router.push('/user/newUser/2/' + this.phone +'/token'+'/'+this.code)
				}
			})
		}
	}
}
</script>


<style lang="scss">
@import "../../assets/css/all";
@import "../../assets/css/login";

.newUser .con { p + label + p { margin-top: 20px;}
    .label .code { background-color: white; border: 1px solid #DDDDDD; float: right; font-size: 12px; height: 35px; padding: 0 15px;}}
</style>

