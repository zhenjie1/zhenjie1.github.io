<template>
	<div class="login">
		<div class="loginContainer">
			<div class="left">
				<!-- <img class="cover" :src="jpg" /> -->
			</div>
			<p></p>
			<div class="blur loginContent">
				<p class="title">登录</p>
				<el-form class="form" :model="form">
					<el-form-item label="账号" name="user">
						<el-input v-model:value="form.user"></el-input>
					</el-form-item>
					<el-form-item label="密码" name="pass">
						<el-input v-model:value="form.pass"></el-input>
					</el-form-item>
					<el-form-item label=" " name="pass" class="notColon">
						<el-button type="primary" block>登录</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import jpg from 'images/login/bg.jpg'
console.log(jpg)
export default defineComponent({
	data() {
		return {
			jpg,
			form: {
				user: '',
				pass: '',
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.login {
	background-color: var(--bgColor);
	display: flex;
	width: 100%;
	.loginContainer {
		border-radius: 10px;
		overflow: hidden;
		width: 80%;
		height: 80%;
		margin: auto;
		display: flex;
		justify-content: space-between;
		position: relative;
		.left {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;

			// /src/assets/images/login/bg.jpg
			background: url('/src/assets/images/login/bg.jpg') no-repeat center;
			background-size: auto 100%;
		}
	}
	.loginContent {
		background-color: var(--C50);
		position: relative;
		float: right;
		width: 30%;
		padding: 20px;
		.title {
			color: var(--main);
			text-align: center;
			font-size: 20px;
			line-height: 2;
			margin-bottom: 6px;
		}
	}
}
</style>
