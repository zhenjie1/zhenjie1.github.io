<template>
	<div class="verification">
		<input type="password" class="text t1" v-model="password" placeholder="请输入原始密码">
		<input type="password" class="text t2" v-model="newPassword"  placeholder="请输入新的密码">
		<input type="password" class="text t2" v-model="newPassword1" placeholder="请再次输入新的密码"@input='yz'>
		<p v-show='flag'>*两次密码输入不一致</p>
		<input type="button" class="submit" value="完成" @click='ok'>
	</div>
</template>

<script>
import { updatePas } from "../../../config/getData"
export default {
	data(){
		return {
			checkIndex:0,
			password:'',
			newPassword:'',
			newPassword1:'',
			flag:false,
			titleTxt:['请输入密码，验证身份','请设置天佑登录密码，用于验证','请再次填写确认天佑登录密码'],
			btnTxt:['下一步','下一步','确认修改']
		}
	},
	methods:{
		yz() {
			if(this.newPassword === this.newPassword1) {
				this.flag = false;
			}
		},
		ok(){
			if(!this.flag && this.newPassword) {
				if(this.newPassword === this.newPassword1) {
					updatePas(this.password,this.newPassword).then(res => {
						console.log(res)
						if(res.code == 2) {
							alert('修改密码成功');
							localStorage.removeItem("userInfo")
							this.$router.push('/user/login');
						}
					})
				}else {
					this.flag = true
				}
				
			}
		}
	},
	mounted() {

	}
}
</script>


<style lang="scss" scoped>
@import '../../../assets/css/all';

.verification{@include screen;background-color: #fff;
	*{display: block;margin:0 auto;}
	.text{border:none;border-bottom:1px solid #e6e6e6;background-color: white;width:100%;height: 20px;padding:10px 2%;font-size:14px;margin: 10px 0;}
	.button{width:74%;border:1px solid $red;background-color: transparent;color:$red;height: 48px;margin-top:60px;font-size: 16px;border-radius: 3px;}
	p {text-align: center;color:#F02B2B;}
	.submit {margin-top: 80px;width: 90%;}
}
</style>


