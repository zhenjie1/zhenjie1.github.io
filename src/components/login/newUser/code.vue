<template>
<div class="newUser">
	<div class="topTit">
		<h1>请输入验证码</h1>
		<p>验证码已发送至手机：<span>+86 {{phoneStr}}</span></p>
	</div>
	<div class="con">
		<label>
			<input type="text" placeholder="请您输入验证码" v-model="code" @keyup="codeWatch">
		</label>
		<p v-show="time != 60">00:{{time}} 秒后重发验证码</p>
		<p v-show="time == 60" @click='codeNum(true)'>重新发送</p>
	</div>
</div>
</template>

<style lang="scss" scoped>
.con{
	> p{margin-top:14px;}
}
.bBank {
	.newUser {
		.topTit {
			margin-bottom: 30px;
		}
    input {
      font-size: 16px;
      line-height: 16px;
      height: 16px;
      padding: 12px 0 12px 10px;
      border: none;
      border-bottom: 1px solid #ddd;
    }
    .topTit p {
    	margin-top: 10px;
    	span {
	      color: #F02B2B;
	    }
    }
    .con p {
      font-size: 12px;
    }
  }
}
</style>

<script>
export default {
	data(){
		return {
			code:'',
			time : 59
		}
	},
	props: ['phoneStr'],
	mounted () {
		this.codeNum(false);
		// console.log(this.phoneStr)
	},
	methods: {
		codeWatch(){
			let codeLen = this.code.length;
			if(codeLen >= 6) this.$emit('pass', this.code.toString())

		},
		codeNum(isJian){
			if(isJian) this.time--;
			var interval =  setInterval( () => {
				if(this.time <= 0){
					this.time = 60;
					clearInterval(interval)
				}else{
					this.time--;
				}
			},1000)
		}
	}
}
</script>




