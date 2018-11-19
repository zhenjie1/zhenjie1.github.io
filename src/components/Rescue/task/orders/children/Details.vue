<template>
	<div class="details">
		<div class="rescueInfo">
			<div class="init">
				<p>救援单号：<span>{{detaData.uuid}}</span></p>
				<p>救援类型：<span>{{detaData.rangeId | Rescue}}</span></p>
				<p>呼救时间：<span>{{detaData.createDate}}</span></p>
			</div>
			<div class="rescueBtn">
				<router-link tag='div' to='progress' class="progress" v-if="detaData.stateId != 0 && detaData.stateId !=99">救援进展</router-link>
				<div v-if='userType == 3 && detaData.stateId == 0' @click='qxorder' class="cancel" >取消订单</div>
				<div v-if='userType != 3 && detaData.stateId == 0' @click='jjorder' class="cancel">拒绝订单</div>
			</div>
		</div>
		<div class="rescueDetails">
			<div class="tit">
				<img src="" alt="">
				<div class="r">
					<h3>{{detaData.office.name}}<span>{{this.status}}</span></h3>
					<p>接单时间：<span>{{detaData.acceptDate}}</span></p>
				</div>
			</div>
			<div class="content">
				<ul>
					<li>
						<i class="iconfont icon-icon-test"></i>
						<p>
							<b>所需物品</b>
							<span v-for='(item,i) in detaData.ordersPartsList' :key="i">{{item.name}}</span>
						</p>
					</li>
					<li>
						<i class="iconfont icon-dingdan2"></i>
						<p>
							<b>详情</b>
							<span>{{detaData.details || '无'}}</span>
						</p>
					</li>
					<li>
						<i class="iconfont icon-gantanhao"></i>
						<p>
							<b>备注</b>
							<span>{{detaData.remarks || '无'}}</span>
						</p>
					</li>
				</ul>
				<router-link to="/rescue/map" @click="enterMap" tag='div' class="map" v-if='userType != 3'>
					<i class="iconfont icon-weizhi"></i>
					<span>{{detaData.place}}</span>
				</router-link>
				<div class="map" v-else>
					<i class="iconfont icon-weizhi"></i>
					<span>{{detaData.place}}</span>
				</div>
			</div>
		</div>
		<div class="duiyuan" v-if='userType != 3'>
			<p>参与救援的队员</p>
			<ul>
				<li v-for='(item,i) in detaData.rescueNames' :key="i">{{item.name}}</li>
			</ul>
		</div>
		<confirm v-model="showCancel" :hide-on-blur='true' :show-input='true' placeholder='请输入取消理由' @on-confirm='cancelEv' :title='"取消理由"' theme="android" confirm-text='确定' cancel-text='取消'></confirm>
		<confirm v-model="showCancelRefuse" :hide-on-blur='true' :show-input='true' placeholder='请输入拒绝理由' @on-confirm='cancelRefuseEv' :title='"拒绝理由"' theme="android" confirm-text='确定' cancel-text='取消'></confirm>
	</div>
</template>

<script>
import { getStore } from '../../../../../config/mUtils'
import { jiuorder,cancelOrder,cancelOffice } from '../../../../../config/getData'
import Confirm from 'vux/src/components/confirm/'
import { mapState } from 'vuex'

export default {
	data(){
		return {
			detaData:[],
			status:'',
			userType:'',
			showCancel:false,
			showCancelRefuse:false
		}
	},
	computed:{
		...mapState([
			'userInfo'
		])
	},
	components:{Confirm},
	methods:{
		cancelRefuseEv(val){
			if(val == ''){
				this.$vux.toast.text('请输入拒绝理由！')
				return ;
			}
			cancelOffice(this.detaData.id,val).then( res => {
				// this.clickObj.stateId = '99'
				if(res && res.code == 2) {
					this.$router.go(-1)
				}
			})
		},
		localItem(item){
			setStore('viewCurrentData',item)
		},
		cancelEv(val){
			if (val == '') {
				this.$vux.toast.text('请输入取消理由！')
				return ;
			}
			cancelOrder(this.detaData.id,val).then( res => {
				// this.clickObj.stateId = '99';
				if(res && res.code == 2) {
					this.$router.go(-1)
				}
			})
		},
		qxorder() {
			this.showCancel = true;
		},
		jjorder() {
			this.showCancelRefuse = true;
		},
		enterMap(){
			sessionStorage.lngLat = this.detaData.jingwei
		}
	},
	created(){
		this.userType = this.userInfo.userType
		this.detaData = getStore('viewCurrentData')
		jiuorder(this.detaData.id).then( res=>{
			this.detaData = res.rows
			this.detaData.stateId = parseInt(this.detaData.stateId)
		})

		switch(this.detaData.stateId){
			case 0:
				this.status = '未接单'
				break;
			case 1:
				this.status = '等待出发'
				break;
			case 2:
				this.status = '在途中'
				break;
			case 3:
				this.status = '施救中'
				break;
			case 4:
				this.status = '已完成'
				break;
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../../../../assets/css/all';

.details{@include screen;z-index: 11;
	.rescueInfo{background-color: white;position: relative;padding:15px;font-size: 13px;
		.init p{line-height: 26px;}
		.rescueBtn{position: absolute;right:15px;top:50%;transform: translateY(-50%);
			div{padding:6px 11px;border:1px solid #333;border-radius: 3px;}
			div + div{margin-top:10px;}
		}
	}
	.rescueDetails{margin:15px 0;background-color: white;
		.tit{display: flex;align-items:center;padding:15px 0;
			img{@include wh(70px,70px);display: block;margin:0 15px;}
			.r{flex: 1;margin-right:15px;
				h3{font-weight: normal;font-size:14px;
					span{float:right;color:$red;}
				}
				p{margin-top:15px;color:#838282;}
			}
		}
		.content{
			ul{
				li{border-top:1px solid #f0f0f0;padding:13px;display: flex;
					i{color:$red;}
					p{margin-left:11px;
					b{font-weight: normal;}
						span{display: block;color:#8B8B8B;margin-top:4px;}
					}
				}
			}
			.map{border-top:1px solid #f0f0f0;line-height: 40px;display:flex;padding:0 15px;
				span{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding-left: 10px;}
				b{font-weight: normal;}
			}
		}
	}
}
.duiyuan {
	font-size: 14px;
	background-color: #fff;
	p {
		text-align: center;
		position: relative;
	}
	p:after {
		position: absolute;
		content: '';
		width: 20px;
		height: 1px;
		left: 22%;
		top: 9px;
		background-color: #000;
	}
	p:before {
		position: absolute;
		content: '';
		width: 20px;
		height: 1px;
		right: 22%;
		top: 9px;
		background-color: #000;
	}
	ul {
		display: flex;
		padding: 10px;
		li {
			border: 1px solid #ccc;
			padding: 2px 4px;
			border-radius: 4px;
			margin: 6px;
		}
	}
}
</style>

