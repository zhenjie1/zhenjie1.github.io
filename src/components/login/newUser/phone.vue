<template>
<div class="newUser">
	<div class="topTit">
		<h1>新用户注册</h1>
	</div>
	<div class="con">
		<p>手机号码</p>
		<label>
			<span>+86</span>
			<input type="text" placeholder="请您输入手机号" v-model="phone">
		</label>
		<input type="button" value="下一步" :disabled=' phone == "" ' :class="{active: phone != '' }" class="submit" @click='next'>
	</div>
	<div class="prompt">
		<p>点击【下一步】即表示您同意协议：</p>
		<router-link to='/user/agree/0'>《服务协议》</router-link>
	</div>

    <transition name='breadcrumb'>
		<my-code v-if="childIndex == 1" :phoneStr='phone' @pass='reloadPass'></my-code>
		<pass v-if="childIndex == 2" :phoneStr='phone' :codeStr='code' :token='token'></pass>
    </transition>
</div>
</template>

<script>
import MyCode from './code'
import Pass from './pass'
import { phoneSendCode, checkCode, userCheck } from '../../../config/getData.js'
import { throws } from 'assert';

export default {
	data(){
		return {
			phone:'',
			childIndex: 0,
			code:'',
			token:''
		}
	},
	components: {
		MyCode,
		Pass
	},
	mounted () {
		if(this.$route.params.status !== undefined)
			this.childIndex = this.$route.params.status;

		if(this.$route.params.phone !== undefined){
			this.phone = this.$route.params.phone
			this.code = this.$route.params.code
			this.token = this.$route.params.token
			this.isReg = false
		}
	},
	methods: {

		//验证码验证
		reloadPass(code){
			checkCode(code).then( res => {
				if(res.code != 2){
					this.$vux.toast.text(res.msg)
				}else{
					this.code = code;
					this.childIndex = 2
				}
			} )
		},
		next(){
			//检查手机号是否注册过
			let phoneReg = /^1[3-9][0-9]{9}$/;
			if(!phoneReg.test(this.phone)) return this.$vux.toast.text('手机号格式不正确')

			userCheck(this.phone).then( res => {

				if( res.code != 2) {
					this.$vux.toast.text(res.msg)
					throw new Error(res.msg)
				}

			}).then( res => {
				phoneSendCode(this.phone).then( res => {

					if(res && res.code == 2){
						this.childIndex = 1
					}

				})
			})

		}
	}
}
</script>


<style lang="scss">
@import "../../../assets/css/all";
@import "../../../assets/css/login";

</style>

