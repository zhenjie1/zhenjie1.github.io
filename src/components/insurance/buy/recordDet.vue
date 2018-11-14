<template>
	<div class="rDet">
		<div class="tit w95">
			<img src="../../../assets/images/tb.png" height="455" width="1080" alt="" />
			<h1>{{recordDet.insuranceName}}</h1>
			<p>
				<span class="tl">{{recordDet.remarks}}</span>
				<span class="tr">天佑在线承诺</span>
			</p>
		</div>
		<div class="rDetFw w95">
			<h5>保障范围</h5>
			<div>{{recordDet.ranges}}</div>
		</div>

		<div class="list w95">
			<ul>
				<li>
					<span>被保人姓名</span>
					<span class="ls">{{recordDet.orderInsuranceUserName}}</span>
				</li>
				<li>
					<span>身份证号码</span>
					<span class="ls">{{recordDet.orderInsuranceUserIdNumber}}</span>
				</li>
				<li>
					<span>是否有医保（含新农合）</span>
					<span class="lsp">{{recordDet.isMc == 0?'无医保':'有医保'}}</span>
				</li>
				<li>
					<span>最近是否住院</span>
					<span class="lsp">{{recordDet.isHospital == 0? '无':'有'}}</span>
				</li>
			</ul>
		</div>
		<div class="w95">
			<div class="rDetTime">
				<h5>有效日期</h5>
				<div>{{recordDet.startDate}}-{{recordDet.endDate}}</div>
			</div>
			<div class="rDetTime" @click='zmBtn'>
				<h5>医保/住院证明</h5>
				<div>
				<span style="color:#999;">{{recordDet.hospitalImgs == ''?'无':'点击查看'}}</span>
				<span class=" iconfont icon-jiantou"></span>
				</div>
			</div>
			<a :href='recordDet.cover' class="rDetLc">
				<h5>理赔流程</h5>
				<span class=" iconfont icon-jiantou"></span>
			</a>
		</div>
		<!-- <button class="submit">申请退保</button> -->
		<!-- <router-link :to="'/user/recordDet/retreat/'+id" class='submit' :disabled="isDis"></router-link> -->
		<button class='submit' @click='tbBtn'>申请退保</button>
	</div>
</template>

<script>
	import { insRecordDet } from '../../../config/getData'
	import { plusXing } from '../../../config/mUtils'
	export default {
		name:'rDet',
		data(){
			return{
				recordDet:[],
				id:''
			}
		},
		methods:{
			// 图片显示
			zmBtn(){
				if(this.recordDet.hospitalImgs.length != 0) {
					this.$router.push({path:'/user/photo',query:{img:this.recordDet.hospitalImgs}})
				}

			},
			tbBtn() {
				if(this.recordDet.cancelInsurType == 0)
				this.$router.push('/user/recordDet/retreat/'+this.id)
			}
		},
		mounted (){
			this.id = this.$route.params.id;
			insRecordDet(this.id).then( res=>{
				this.recordDet = res.rows;
				this.recordDet.orderInsuranceUserIdNumber = plusXing(this.recordDet.orderInsuranceUserIdNumber,3, 4)
				// if(this.recordDet.hospitalImgs){
				// 	let str = this.recordDet.hospitalImgs;
				// 	str = str.replace(/\|/g, ',');
				// 	str = JSON.parse(str)
				// 	this.recordDet.hospitalImgs = str;
				// 	console.log(this.recordDet.hospitalImgs)
				// }else {
				// 	this.recordDet.hospitalImgs=''
				// }
			})

		}
	}
</script>

<style lang='scss' scoped>
@import '../../../assets/css/all.scss';
	.rDet {
		color: #333;
		padding-bottom:60px;
		.tit {
			padding-bottom: 15px;
			img {
				width: 100%;
				height: auto;
			}
			h1 {
				font-size: 22px;
				margin: 18px 0 12px 0;
				padding: 0 10px;
			}
			p {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #9b9b9b;
				padding: 0 10px;
			}
		}
		.w95 {
			font-size: 16px;
			background-color: #fff;
			margin-bottom: 10px;
			h5 {
				font-size: 16px;
				font-weight: 400;
			}
		}
		.rDetFw {
			padding: 16px 18px;
			h5 {
				margin-bottom: 16px;
				text-align: center;
			}
			div {
				text-indent:2em
			}
		}
		.rDetTime,.rDetLc {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 16px;
			padding: 10px 16px;
		}
		.list {
			ul {
				padding:0 16px;
				li {
					display: flex;
					justify-content:space-between;
					padding: 10px 0 ;
					.ls {
						color: #f02b2b;
					}
					.lsp {
						color: #f02b2b;
						background-color: rgba(240,43,43,0.2);
						border-radius: 14px;
						padding: 3px 8px;
					}
				}
			}
		}
		.submit {
			background-color: #f02b2b;
			position: fixed;
			bottom: 0;
			line-height: 50px;
			text-align: center;
			font-size: 16px;
		}
	}
</style>
