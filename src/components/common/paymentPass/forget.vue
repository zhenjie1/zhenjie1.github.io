<template>
	<div class="forget">
		<h3>请填写相关信息</h3>
		<ul class="ulCon">
			<li>
				<p>姓名</p>
				<input type="text" placeholder="输入完整的姓名" v-model="name">
			</li>
			<li>
				<p>证件类型</p>
				<b>身份证</b>
			</li>
			<li>
				<p>证件号</p>
				<input type="text" placeholder="请输入证件号" v-model="doc">
			</li>
		</ul>
		<ul class="ulCon">
			<li>
				<p>手机号</p>
				<input type="number" maxlength="11" placeholder="请输入银行预留手机号" v-model="phone">
			</li>
		</ul>

		<input type="button" :disabled='!meets' value="下一步" class="submit" @click='submit'>
	</div>
</template>

<script>
import { phoneSendCode,verifMessage } from '@/config/getData'

export default {
	data(){
		return {
			name:'',
			doc:'',
			phone:''
		}
	},
	computed:{
		meets(){
			var [name, doc, phone] = [this.name, this.doc, this.phone]
			if(name !== '' && doc !== '' && phone.length == 11){
				return true
			}
			return true
		}
	},
	methods:{
		submit(){
			verifMessage(this.name,this.doc,this.phone).then(res => {
				if(res && res.code == 2){
					let token = res.rows.token
					phoneSendCode(this.phone).then( res => {
						if(res && res.code == 2)
						this.$router.push('/user/newUser/1/' + this.phone +'/'+ token)
					})
				}
			})
		}
	}
}
</script>


<style lang="scss" scoped>
@import '../../../assets/css/all';

.forget{@include screen;
	h3{color:#888;font-weight: normal;margin:20px 0 4px 15px;}
	.ulCon{border:1px solid #f0f0f0;border-left:none;border-right:none;
		li{display: flex;background-color:white;padding:0 15px;
			p{width:96px;font-size:16px;line-height: 46px;}

			b,input{flex:1;border:none;height: 20px;font-size:16px;padding:13px 0;}
		}
		li + li{border-top:1px solid #f0f0f0;}
	}
	.ulCon + .ulCon{margin:10px 0;}
	.submit{width:94%;margin:50px auto;height: 48px;display: block;background-color: $red;}
	.submit:disabled{background-color: #F79595;}
}
</style>

