<template>
	<div class="record">
		<ul class="recordNav clearfix">
			<li 
				class="recordNavLi fl" 
				v-for="(recorList,index) in recordNav"
				@click="navChoose(index)"
				:class="{active:index==recordIndex}"
				>
				<span class="recordNavLiText">{{recorList.text}}</span>
			</li>
		</ul>
		<ul class="recDfk">
			<li 
				class="recDfkList clearfix"
				v-for=" recDfkItme in initData"
				@click='tzBtn(recDfkItme.id,recDfkItme.type)'
				>
				<div class="recDfkDet fl">
					<div class="fl recDfkDetImg">
						<img src="" alt="" />
					</div>
					<div class="fl recDfkDetOth">
						<div class="recDfkDetOthTit">{{recDfkItme.insuranceName}}</div>
						<div class="recDfkDetOthDate" v-show='isShowListd'>期限：<span>{{recDfkItme.tnsurDay}}</span></div>
						<div class="recDfkDetOthDate" v-show='isShowListb'>保障时间：<span>{{recDfkItme.startDate}}-{{recDfkItme.endDate}}</span></div>
						<div class="recDfkDetOthDate" v-show='isShowListy'>截至时间：<span>{{recDfkItme.endDate}}</span></div>
					</div>
				</div>
				<div class="recDfkBtn fr " v-show='isShowListd' @click='payBtn(recDfkItme.id)'>立即支付</div>
				<div class="fr recDfkZindex" v-show='isShowListb'>
					<div class="fl recDfkDetTu">
						<img v-if='recDfkItme.cancelInsurType==0' src="../../../assets/images/bzz.png" alt="" />
						<img v-else='recDfkItme.cancelInsurType==1' src="../../../assets/images/sq.png" style='width:75%;margin-left:8px;' alt="">
					</div>
					<div class="fl recDfkDetJl" @click.stop='showInfo(recDfkItme.id)'>
						<img src="../../../assets/images/jl.png" alt="" />
					</div>
				</div>
				<div class="fr recDfkZindex" v-show='isShowListy'>
					<div class="fl recDfkDetTu">
						<img src="../../../assets/images/ygq.png" alt="" />
					</div>
					<div class="fl recDfkDetJl">
						<img src="../../../assets/images/jl.png" alt="" />
					</div>
				</div>
			</li>
		</ul>
		
		<cord-info :show='iflag' :id='id' v-on:success="success"></cord-info>
		<payment v-model='isShowPay' :show='isShowPay' :id='payId' :pageNum='pageNum' v-on:input="input" :showList='[0]'></payment>

		<div class="personal" v-if="userType != 3" @click='personal'><i class="iconfont icon-wode"></i></div>
		<div class="personal" v-else @click='personal'><i class="iconfont icon-home"></i></div>
	</div>
</template>

<script>
	import { insRecord } from '../../../config/getData'
	import cordInfo from '@/components/insurance/buy/cordInfo.vue'
	import Payment from '../../common/payment/Payment'
	import { getStore } from '../../../config/mUtils'
	export default {
		components:{
			cordInfo,
			Payment
		},
		name:'record',
		data(){
			return {
				userType:'',//用户类型
				isShowListd:false,
				isShowListb:false,
				isShowListy:false,
				arr:[],
				recordIndex:0,
				initData:[],
				recordList:[
					
				],
				securityList:[
				
				],
				endList:[
				],
				eId: '',
				recordNav:[
					{text:'待付款'},
					{text:'担保中'},
					{text:'历史保单'}
				],
				iflag:false,
				id:'',
				isShowPay:false,
				pageNum:1,
				payId:'',//支付id
			}
		},
		methods:{
			// 获取数据
			getData(type) {
				insRecord(0,100,type).then(res => {
					this.arr = res.rows;
					// if (this.recordIndex == 0) {
					// 	this.isShowListd = true
					// 	this.initData.length = 0
					// 	this.arr.find((data) => {
					// 		data.type = parseInt(data.type)
					// 		if(data.type === 0){
					// 			this.initData.push(data)
					// 		}
					// 	})
					// }else if (this.recordIndex == 1) {
					// 	this.isShowListd = false
					// 	this.isShowListb = true
					// 	this.isShowListy = false
					// 	this.initData.length = 0
					// 	this.arr.find((data) => {
					// 		data.type = parseInt(data.type)
					// 		if(data.type === 1){
					// 			this.initData.push(data)
					// 		}						
					// 	})
					// }
					if (this.recordIndex == 1) {
						this.isShowListd = false
						this.isShowListb = true
						this.isShowListy = false
						this.initData.length = 0
						this.arr.find((data) => {
							data.type = parseInt(data.type)
							if(data.type === 1){
								this.initData.push(data)
							}						
						})
					}else if (this.recordIndex == 2){
						this.isShowListd = false
						this.isShowListb = false
						this.isShowListy = true
						this.initData.length = 0
						this.arr.find((data) => {
							data.type = parseInt(data.type)
							if(data.type === 2){
								this.initData.push(data)
							}
						})
					}else if (this.recordIndex == 0){
						this.isShowListd = true
						this.isShowListb = false
						this.isShowListy = false
						this.initData.length = 0
						this.arr.find((data) => {
							data.type = parseInt(data.type)
							if(data.type === 0){
								this.initData.push(data)
							}
						})
					}
					try{
						this.userType = getStore('userInfo')['userType']
					}catch(e){
						this.$router.push('/user/login')
					}
				})
			},
			// 跳转详情
			tzBtn(id,type) {
				if(type == 1) {
					this.$router.push('/user/recordDet/'+id)
				}
			},
			personal(){
				if(this.userType == 3){
					this.$router.push('/user/home')
				}else{
					this.$router.push('/user/personal')
				}
			},
			navChoose:function(index){
				this.recordIndex = index
				this.getData(index)
			},
			// 点击图片显示具体内容
			showInfo(id) {
				this.iflag = true;
				this.id = id
			},
			success(){
        this.iflag = false;
     	},
     	input() {

     	},
			// 支付
			payBtn(id) {
				this.isShowPay = true;
				this.payId = id;
			}
		},
		mounted (){
			if(this.$route.params.status == 1) {
				this.recordIndex = 1;
			}
			this.getData(0);
		}
	}
</script>

<style lang='scss' scoped>
	$size:44px;
	.personal{position: fixed;left:20px;bottom: 20px;background-color: white;border-radius: 100%;width:$size;height: $size;line-height:$size;box-shadow: 0 4px 10px rgba(0,0,0,.1);text-align:center;
		i{font-size:30px;font-weight: bold;}
	}
	.fr {float: right;}
	.fl {float: left;}
	.clearfix:after {content: "";display: block;clear: both;}
	.recordHead {line-height: 42px;font-size: 16px;color: #333;position: relative;background-color: #fff;border-bottom: 1px solid #e1e1e1;}
	.recordReturn {position: absolute;left: 20px;font-size: 16px;}
	.recordTit {text-align: center;}
	.recordWrap {width: 94%;padding: 0 3%;}
	.recordList {border-bottom: 1px solid #ddd;}
	.recordList h5 {line-height: 30px;font-size: 14px;}
	.recordNav {background: #fff;}
	.recordNavLi {line-height: 41px;color: #686868;font-size: 13px;width: 33.3%;text-align: center;letter-spacing: 1px;}
	.recordNavLi.active {color: #f02b2b;border-bottom: 2px solid #F02B2B;}
	.recDfkList {height: 68px;background-color: #fff;padding: 6px 0 7px;margin-top: 10px;position: relative;}
	.recDfkDet {margin-left: 15px;position: absolute;}
	.recDfkDetImg {width: 68px;height: 68px;}
	.recDfkDetImg img {width: 100%;height: 100%;}
	.recDfkDetOth {margin-left: 10px;}
	.recDfkDetOthTit {line-height: 30px;font-size: 14px;color: #252525;}
	.recDfkDetOthDate {font-size: 12px;color: #252525;}
	.recDfkDetOthDate span {color: #838282;}
	.recDfkBtn {width: 70px;height: 27px;line-height: 27px;text-align: center;margin-right: 29px;margin-top: 20px; border: 1px solid #f02b2b;border-radius: 5px;color: #f02b2b;}
	.recDfkDetTu {width: 77px;height: 58px;margin-top: 3px;}
	.recDfkDetTu img {width: 100%;height: 100%;background-color: #fff;}
	.recDfkDetJl {width: 13px;height: 17px;margin-right: 20px;margin-left: 7px;margin-top: 19px;}
	.recDfkDetJl img {width: 100%;height: 100%;background-color: #fff;}
	.recDfkZindex {z-index: 99;}
	
	.leftWrap {width: 70%;}
	.leftWrap div {line-height: 20px;}
	.rBuy {background-color: #BD2C00;color: #fff;padding: 3px 4px;margin: 5px 0 10px 8px;border-radius: 6px; display: inline-block;font-size: 12px;}
	.rightWrap {position: relative;}
	.rightWrap a{width:70px;height: 40px;line-height:40px;text-align: center; display: inline-block;background-color: #F12B2C;color: #fff;border-radius: 10px;}
	.rightWrap span {display: none;}
	.state {margin-top: 22px;}
	.rightWrapTit {font-size: 12px;color: #12A6FF;margin-top: 5px;}
	

	
	
	
</style>