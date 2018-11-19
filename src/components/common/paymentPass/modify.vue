<template>
	<div class="verification">
		<h4>{{ titleTxt[checkIndex] }}</h4>
		<input type="password" v-show="checkIndex != 2" class="text t1" v-model="inputTxt">
		<input type="password" v-show="checkIndex == 2" class="text t2" v-model="repeatTxt">
		<input type="button" class="button" :value="btnTxt[checkIndex]" @click='ok'>
	</div>
</template>

<script>
import { userPass,modifyPayPass } from '../../../config/getData'
export default {
	data(){
		return {
			checkIndex:0,
			inputTxt:'',
			paypsaa:'',
			repeatTxt:'',
			titleTxt:['请输入支付密码，验证身份','请设置天佑支付密码，用于支付验证','请再次填写确认天佑支付密码'],
			btnTxt:['下一步','下一步','确认修改']
		}
	},
	methods:{
		ok(){
			var ind = this.checkIndex;
			if(ind == 0){
				if(this.inputTxt)
				userPass(this.inputTxt).then(res=>{
					if(res && res.code == 2) {
						this.checkIndex = 1;
						this.paypsaa = this.inputTxt;
						this.inputTxt = '';
					}
				})
			}else if(ind == 1){
				if(this.inputTxt.length >= 6){
					this.checkIndex = 2;
				}else this.$vux.toast.text('支付密码最少 6 位！')
			}else if(ind == 2){
				if(this.inputTxt === this.repeatTxt){
					modifyPayPass(this.inputTxt,this.repeatTxt).then(res => {
						if(res.code == 2){
							this.$vux.toast.text('修改支付密码成功！');
							this.$router.push('/user/personal');
						}
					})
				}else{
					this.$vux.toast.text('两次输入的密码不一致！')
				}
			}
		}
	}
}
</script>


<style lang="scss" scoped>
@import '../../../assets/css/all';

.verification{@include screen;
	*{display: block;margin:0 auto;}
	h4{font-size: 14px;color:#737373;text-align: center;font-weight: normal;margin:85px 0 16px;}
	.text{border:1px solid #e6e6e6;background-color: white;width:70%;height: 20px;padding:13px 2%;font-size:20px;}
	.button{width:74%;border:1px solid $red;background-color: transparent;color:$red;height: 48px;margin-top:60px;font-size: 16px;border-radius: 3px;}
}
</style>


