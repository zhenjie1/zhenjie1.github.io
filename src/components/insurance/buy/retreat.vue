<template>
	<div class="box">
		<div class="yy">
			<h3>退保原因</h3>
			<textarea name="" v-model='textar' maxlength="240"></textarea>
		</div>
		<avatar></avatar>
		<button class="submit" @click='submit'>确认提交</button>
	</div>
</template>

<script>
	import avatar from '../../../components/insurance/insuranceDet/imagesFlie'
	import { retreat } from '../../../config/getData'
	export default {
		name:'retreat',
		components:{
			avatar
		},
		data() {
			return {
				avatar:true,
				textar:'',
				flag:true,
				id:''
			}
		},
		destroyed() {
			if (localStorage.ImgDataArr !== undefined || localStorage.ImgThis !== undefined){
				localStorage.removeItem("ImgDataArr")
		    localStorage.removeItem("ImgThis")
			}
		},
		mounted() {
			this.id = this.$route.params.id
		},
		methods:{
			submit() {
				if(localStorage.ImgDataArr != undefined) {
					let imgArr = JSON.parse(localStorage.ImgDataArr)
					retreat(this.id,this.textar,imgArr).then( res => {
						if(res.code == 2){
							alert(res.msg)
							this.$router.replace('/user/buyRecord')
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		.yy {
			padding: 20px;
			h3 {
				margin-bottom: 16px;
				font-size: 15px;
			}
			textarea {
				width: 100%;
				height: 110px;
				font-size: 14px;
				border: none;
				padding: 10px;
				box-sizing:border-box;
			}
		}
		.hello {
			position: relative;
		}
		.submit {
			 background-color: #f02b2b;
			position: fixed;
			bottom: 0;
			left: 0;
		}
	}
</style>