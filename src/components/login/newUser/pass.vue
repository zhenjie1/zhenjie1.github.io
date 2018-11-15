<template>
<div class="newUser">
	<div class="topTit">
		<h1>设置密码</h1>
		<p>请为 <span>{{ phoneHide }}</span> 账号设置{{text}}密码</p>
	</div>
	<div class="con">
		<label>
			<input type="password" placeholder="新密码" v-model="newPass">
		</label>
		<label>
			<input type="password" placeholder="确认新密码" v-model="confirmPass">
		</label>
		<input type="button" :value="btnVal" :disabled='!disabled' @click='registered' :class='{active: disabled}' class="submit">
	</div>
</div>
</template>

<script>
import { registered,settingsPayPass } from '../../../config/getData.js'

export default {
	data(){
		return {
			text:'',
			newPass:'',
			confirmPass:'',
			btnVal: '完成注册'
		}
	},
	props: ['phoneStr','codeStr','token'],
	computed: {
		disabled(){
			return !!this.newPass && !!this.confirmPass
		},
		phoneHide(){
			return this.phoneStr.substr(0,3) + '****' + this.phoneStr.substr(7,4)
		}
	},
	mounted () {
		let status = this.$route.params.status
		if(status == 1) {
			this.text = '支付';
			document.title='忘记支付密码'
		}else if(status == 2){
			this.text = '新';
			document.title='忘记登录密码'
		}else if(status == undefined){
			this.text = '登录'
		}
		if(this.$route.params.phone !== undefined){
			this.btnVal = '确认修改'
		}
	},
	methods: {
		registered(){
			var that = this;
			var status = this.$route.params.status
			if(this.newPass !== this.confirmPass) {
				alert('两次密码不一致！');
				return false;
			}
			//status == 1 支付密码
			//status == 2 忘记登录密码
			//status == undefind 注册密码
			if(status == 1) {
				settingsPayPass(this.token,this.newPass).then( res => {
					alert("修改成功")
					that.$router.push('/user/personal')
				})
			}else{
				registered(this.phoneStr,this.newPass,this.codeStr).then( res => {
					alert(res.msg)
					if(res.code == 2) that.$router.push('/user/login')
				})
			}

		}
	}
}
</script>


<style lang="scss" scoped>
.newUser{
	.topTit{margin-bottom: 76px;}
	.con{
		label + label{margin-top:20px;}
		.submit{margin-top:40px;}
	}
}
</style>



