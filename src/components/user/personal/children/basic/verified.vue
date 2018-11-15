<template>
	<div class="realName-wrap">
		<div class="realTitle">请按照提示操作</div>
		<div>
			<ul class="realName-list">
			<li>
				<label>姓名</label><input type="text" placeholder="请输入姓名" v-model="userName" autofocus>
			</li>
			<li>
				<label>身份证号</label><input type="text" placeholder="请输入身份证号" v-model="IDnumber">
			</li>
			</ul>
			<div class="realSure">
				<input type="button" :disabled='isDisabled' value="确认认证" @click='verified'>
			</div>
		</div>
		<success v-show='showVerified' :status=1></success>
	</div>
</template>

<script>
import success from '../../../../common/success/success'
import { mapState } from 'vuex'
import { verified } from '../../../../../config/getData'
import { setStore } from '../../../../../config/mUtils'

export default {
	data(){
		return {
			userName:'',
			IDnumber:'',
			isShow:true,
			showVerified: false
		}
	},
	computed:{
		...mapState([
			'userInfo'
		]),
		isDisabled(){
			//久的身份证是15位
			if(this.userName.length >= 1 && (this.IDnumber.length === 18 || this.IDnumber.length === 15) ) return false
			else return true
		}
	},
	methods:{
		verified(){
			let userInfo = this.userInfo
			verified(this.userName, this.IDnumber).then( res => {
				if(res && res.code == 2) {
					this.isShow = true;
					userInfo.realName = 1;
					setStore('userInfo',userInfo);
					alert(res.msg);
					this.$router.go(-1);
				}
			})
			// this.showVerified = true;
		}
	},
	components: {
		success
	}
}
</script>

<style lang="scss" scoped>
@import "../../../../../assets/css/all";

.realName-wrap {@include screen;background: #f5f5f5;font-size: 14px;}
.realTitle {padding: 20px 0 8px 11px;color: #888;}
.realName-list {background: #ffffff;border-top: 1px solid #e6e6e6;border-bottom: 1px solid #e6e6e6;
	li {margin-left: 20px;border-bottom: 1px solid #e5e5ee;line-height: 60px;
		label {color: #030303;display: inline-block;font-size: 16px;width: 90px;}
		input {-webkit-appearance: none;border: none;background: none;font-size: 16px;}
	}
	li:last-child {
		border-bottom: none;
	}
}
.realSure {margin-top: 30px;
	 input[type="button"] {background-color: $red;width: 96%;margin: 0 auto;display: block;color: #fff;border: none;line-height: 48px;font-size: 20px;border-radius: 6px;}
	 input:disabled{background-color: $redQ;}
}
</style>

