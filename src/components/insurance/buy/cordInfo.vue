<template>
	<div class="info" v-if='show'>
		<div class="cont">
			<h3>{{cont.insuranceName}}</h3>
			<div class="list">
				<span>保险单号：</span>
				<p>{{cont.uuid}}</p>
			</div>
			<div class="list">
				<span>保险范围：</span>
				<p>{{cont.ranges}}</p>
			</div>
			<div class="list">
				<span>保&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp期：</span>
				<p>{{cont.startDate}}-{{cont.endDate}}</p>
			</div>
			<!-- 理赔记录 -->
			<div class="jl">
				<h3>理赔记录</h3>
				<ul v-if='jlShow'>
					<li v-for='item in jl'>
						<div class="top">
							<span>订单：{{item.uuid}}</span>
							<span class="tr">-{{item.ofclaimsMoney}}</span>
						</div>
						<div class="top bot">
							<span>{{item.ofclaimsTime}}</span>
							<span>{{item.ofclaimsReason}}</span>
						</div>
					</li>
				</ul>
			</div>
			<div class="tb" @click='checkd' v-if='tbShow'>
				<!-- <router-link :to="'/user/recordDet/'+id">点击退保</router-link> -->
				<a href="javascript:;">点击退保</a>
			</div>
			<div class="btn" @click='isShow'>我知道了</div>
		</div>

	</div>
</template>

<script>
import { insRecordDet,checkR,queryIns } from "../../../config/getData.js";
	export default {
		name: 'cordInfo',
		props:['show','id'],
		data() {
			return {
				cont:{},
				jl:'',
				jlShow:true,
				tbShow:false
			}
		},
		methods:{
			isShow() {
				this.$emit('success',false);
			},
			getData() {
				if(this.id) {
					insRecordDet(this.id).then( res => {
						if(res.code == 2) {
							this.cont = res.rows
							this.tbShow = res.rows.isRefund == '0'?true:false
							this.tbShow = res.rows.cancelInsurType == '0'?true:false
						}
					})
					queryIns(this.id).then( res => {
						if(res.code == 2) {
							if(res.rows.msg != undefined ) {
								this.jlShow = false
							}else {
								this.jlShow = true
								this.jl = res.rows.ofclaimslist
							}
						}
					})
				}else {
				}
			},
			checkd() {
				this.$router.push('/user/recordDet/'+this.id)
			}
		},
		mounted() {
			
		},
		watch: {
			id:'getData'
		}
	}
</script>

<style lang="scss" scoped>
	.info {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.4);
		.cont {
			background-color: #fff;
			width: 86%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			border-radius: 10px;
			padding-top: 20px;
			overflow: hidden;
			h3 {
				font-size: 16px;
				text-align: center;
				margin-bottom: 20px;
			}
			.list {
				font-size: 14px;
				display: flex;
				align-items:top;
				margin-bottom: 16px;
				line-height: 20px;
				padding: 0 20px;
				color: #2a2a2d;
				p {
			    width: 66%;
			    word-wrap: break-word;
				}
			}
			.tb {
				width: 100px;
				height: 100px;
				background-color: #f02b2b;
				color: #fff;
				position: absolute;
				top: -50px;
			  right: -50px;
			  transform: rotate(45deg);
			  font-size: 12px;
				a {
			    position: absolute;
			    bottom: 9px;
			    left: 24px;
			    color: #fff;
				}
			}
			.btn {
				color: #f02b2b;
				font-size: 16px;
				text-align: center;
				padding: 14px 0;
				padding-top: 10px;
			}
			.jl {
				font-size: 14px;
				h3 {
					text-align: left;
					font-size: 14px;
					font-weight: 500;
					padding-left: 20px;
					margin-bottom: 10px;
				}
				ul {
					padding: 0 20px;
					li {
						border-bottom: 1px solid #ddd;
						margin-bottom: 5px;
						padding: 2px 0;
						.top {
							display: flex;
							justify-content: space-between;
							margin-bottom: 3px;
							.tr {
								color: #f02b2b;
							}
						}
						.bot {
							font-size: 12px;
							color: #999;
						}
					}
				}
			}
		}
	}
</style>