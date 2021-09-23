<template>
	<div class="login">
		<div class="loginContainer">
			<div class="left">
				<!-- <img class="cover" :src="jpg" /> -->
			</div>
			<p></p>
			<div class="loginContent">
				<p class="title">登录</p>
				<el-form
					ref="formElement"
					class="form"
					:model="form"
					:rules="rules"
					@submit.prevent="submitEv"
				>
					<el-form-item prop="userName">
						<el-input v-model="form.userName"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input v-model="form.password" type="password" show-password></el-input>
					</el-form-item>
					<el-form-item prop="graphCode">
						<div class="flex code">
							<el-input
								v-model="form.graphCode"
								class="codeInput"
								placeholder="图形码"
								maxlength="4"
								show-word-limit
							></el-input>
							<img
								:src="form.img"
								class="ml-sm codeImg"
								alt="点击刷新图形码"
								@click="initImgCode"
							/>
						</div>
					</el-form-item>
					<el-form-item>
						<div class="flex operation">
							<el-checkbox v-model="remember" label="记住密码"></el-checkbox>
							<span class="seekPass">
								<router-link to="/login" class="loginTxt"> 找回密码 </router-link>
							</span>
						</div>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							native-type="submit"
							class="w-full"
							:loading="loading"
						>
							登录
						</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { api } from '@/api'
import { validatorPassword, validatorUsername } from 'js/formValidate'
import { defineComponent } from 'vue'
import useLogin from './useLogin'
import { debounce } from 'lodash'

export default defineComponent({
	setup() {
		const { form, remember, formElement, submitEv, loading } = useLogin()

		return {
			form,
			remember,
			loading,
			formElement,
			submitEv,
			rules: {
				userName: [
					{ required: true, message: '请输入账号', trigger: 'blur' },
					{ required: true, validator: validatorUsername, trigger: 'blur' },
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{
						required: true,
						validator: validatorPassword,
						trigger: 'blur',
						msg: '密码',
					},
				],
				graphCode: [
					{ required: true, message: '请输入图形码', trigger: 'blur' },
					{ min: 4, max: 4, message: '图形码为4个字符', trigger: 'blur' },
				],
			},
			initImgCode: debounce(() => {
				api.login.getImageCode()
			}, 300),
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
		box-shadow: var(--shadow);
		width: 320px;
		// height: 80%;
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
		}
	}
	.loginContent {
		background-color: var(--C90);
		position: relative;
		float: right;
		width: 400px;
		padding: 20px;
		.title {
			color: var(--main);
			text-align: center;
			font-size: 20px;
			line-height: 2;
			margin-bottom: 6px;
		}
		.code {
			display: flex;
			.codeImg {
				white-space: nowrap;
			}
		}
		.operation {
			justify-content: space-between;
		}
	}
}
</style>
