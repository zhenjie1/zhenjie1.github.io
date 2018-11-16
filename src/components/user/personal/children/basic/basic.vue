<template>
<div class="basic">
	<toast v-model="showPositionValue" type="text" :time="2000" width='auto' :text="seleceVal.avatarTxt" position="top"></toast>
	<ul class="infoDetail">
		<li class="AvatarBox" @click='show.avatar = true'>
			<div class="l">头像设置</div>
			<avatar v-model="show.avatar" @showOk='showOkInfo'></avatar>
			<div class="r">
				<img class="Avatar" :src='seleceVal.avatarUrl'>
			</div>
		</li>
		<li @click='show.sex = true'>
			<div class="l">性别</div>
			<div class="r">
				<span>{{seleceVal.sexVal | sex}}</span>
				<actionsheet @on-click-menu='sexEv' v-model="show.sex" theme='android' :menus='seleceVal.sex' :show-cancel='true'></actionsheet>
				<i class="iconfont icon-jiantou"></i>
			</div>
		</li>
		<li @click='show.bloodType = true'>
			<div class="l">血型</div>
			<div class="r">
				<span>{{seleceVal.bloodVal | bloodType}}</span>
				<actionsheet @on-click-menu='bloodTypeEv' :menus='seleceVal.bloodType' theme='android' :show-cancel='true' v-model="show.bloodType"></actionsheet>
				<i class="iconfont icon-jiantou"></i>
			</div>
		</li>
		<li>
			<div class="l">生日</div>
			<div class="r">
				<Datetime v-model="seleceVal.birthdayVal" :min-year='1900' :max-year='2018' placeholder='点击选择' confirm-text='确定' cancel-text='取消' @on-confirm='submit'></Datetime>
				<i class="iconfont icon-jiantou"></i>
			</div>
		</li>
		<li @click='showPositionValue = true,seleceVal.avatarTxt="手机号不可修改"'>
			<div class="l">联系方式</div>
			<div class="r">
				<span>{{seleceVal.phoneVal}}</span>
				<i class="iconfont icon-jiantou"></i>
			</div>
		</li>
		<li @click='show.nickname = true'>
			<div class="l">昵称</div>
			<div class="r">
				<span>{{seleceVal.nicknameVal}}</span>
				<confirm v-model="show.nickname" :hide-on-blur='true' :show-input='true' :placeholder='seleceVal.nicknameVal' @on-confirm='nicknameEv' :title='"昵称"' theme="android" confirm-text='确定' cancel-text='取消'></confirm>
				<i class="iconfont icon-jiantou"></i>
			</div>
		</li>
	</ul>
	<ul class="zhengshu" v-if='rescue'>
		<li>
			<div class="l">角色</div>
			<div class="r">
				{{userInfo.user_type}}
			</div>
		</li>
		<li>
			<div class="l">证书</div>
			<div class="r" @click='zsBtn'>{{zhengshu}}</div>
		</li>
		<li>
			<div class="l">擅长</div>
			<div class="r">{{userInfo.goodAt}}</div>
		</li>
	</ul>
	<ul class="verified" v-if='flag'>
		<router-link tag="li" to='verified'>
			<div class="l">实名认证</div>
			<div class="r">
				<i class="iconfont icon-jiantou"></i>
			</div>
		</router-link>
	</ul>
</div>
</template>

<script>
import Actionsheet from 'vux/src/components/actionsheet/'
import { mapState, mapActions } from 'vuex'
import Confirm from 'vux/src/components/confirm/'
import Datetime from 'vux/src/components/datetime/'
import Avatar from '../../../../common/avatar/avatar'
import Toast from 'vux/src/components/toast/'

import { getUserInfo, editUserInfo } from '@/config/getData'
import { setStore } from '../../../../../config/mUtils'


export default {
	data(){
		return {
			rescue:false,
			flag:true,
			date:'',
			sex:'123',
			showPositionValue:false,
			show:{
				bloodType:false,
				avatar:false,
				phone:false,
				sex:false,
				nickname:false,
			},
			seleceVal:{
				id:'',
				avatarUrl:'',
				sex:['保密','男','女'],
				bloodType:['A','B','AB','O','Rh阳性','Rh阴性','MN','MNSs血型'],
				avatarTxt:'',

				birthdayVal:'点击选择',
				sexVal:'点击选择',
				bloodVal:'点击选择',
				phoneVal:'点击输入',
				nicknameVal:'点击输入'
			},
			zhengshu:''
		}
	},
	computed:{
		...mapState([
			'userInfo'
		])
	},
	created(){
		this.getUserInfoEv();
	},
	components :{
		Datetime,
		Actionsheet,
		Confirm,
		Avatar,
		Toast
	},
	methods:{
		...mapActions([
			'setUserInfo'
		]),
		getUserInfoEv(){
			getUserInfo().then( res => {
				res = res.rows
				this.setUserInfo(res)

				this.seleceVal.sexVal = res.sexId
				this.seleceVal.bloodVal = res.blood
				this.seleceVal.birthdayVal = res.birthday
				this.seleceVal.phoneVal = res.mobile == '点击输入'?'':res.mobile
				this.seleceVal.nicknameVal = res.name
				this.seleceVal.id = res.id
				this.seleceVal.avatarUrl = res.photo
				this.rescue = res.userType != 3?true:false
				this.zhengshu = res.zhengshu.length == 0?'未上传':'点击查看'
			})
		},
		getLoca(name,cont) {
			let obj = this.userInfo
			obj[name] = cont;
			setStore('userInfo',obj)
		},
		sendDealWith(){
			var data = this.seleceVal;
			for(let i in data){
				if(i == 'sexVal'){
					if(data[i] == '保密'){
						data[i] = '3'
					}else if(data[i] == '男'){
						data[i] = '1'
					}else if(data[i] == '女'){
						data[i] = '2'
					}
				}else if(i == 'bloodVal'){
					if(/^a$/i.test(data[i])){
						data[i] = '0'
					}else if(/^b$/i.test(data[i])){
						data[i] = '1'
					}else if(/^ab$/i.test(data[i])){
						data[i] = '2'
					}else if(data[i] == '保密'){
						data[i] = '3'
					}
				}
			}

			var sendData = {
				id: data.id,
				sexId: data.sexVal,
				catateBirthday: data.birthdayVal,
				mobile: data.phoneVal,
				name: data.nicknameVal,
				blood: data.bloodVal,
				phone: data.phoneVal,
				photo: data.avatarUrl
			}

			editUserInfo(sendData).then( res => {
				this.showPositionValue = true;
				this.seleceVal.avatarTxt = '修改成功'
			})
		},
		showOkInfo(val,url){
			this.showPositionValue = true;
			this.seleceVal.avatarTxt = val;
			this.show.avatar = false;
			this.seleceVal.avatarUrl = url;
			this.sendDealWith();
			this.getLoca('photo',url)
		},
		sexEv(val){
			this.seleceVal.sexVal = this.seleceVal.sex[val]
			this.sendDealWith();
		},
		bloodTypeEv(val){
			this.seleceVal.bloodVal = val
			// console.log(this.seleceVal.bloodType[val],val)

			this.sendDealWith()
		},
		submit(val){
			this.sendDealWith()
		},
		phoneEv(val){
			this.seleceVal.phoneVal = val
			this.sendDealWith()
		},
		nicknameEv(val){
			this.seleceVal.nicknameVal = val.substr(0, 10);
			this.sendDealWith()
			this.getLoca('name',val)
		},
		zsBtn() {
			if(this.zhengshu == '点击查看') {
				this.$router.push('/user/personal/cp')
			}
		}
	},
	mounted(){
		if(this.userInfo.realName == 1) this.flag = false
	}
}
</script>


<style>
.avatarStyle{position:absolute;left:0;top:0;width:100%;height:100%;opacity:0}
</style>
<style lang="scss">
	.basic {
		.r {
			.weui-cell {
				padding: 0;
				.weui-cell__ft {
					color: #666;
					.vux-cell-value {
						color: #666;
					}
				}
				.weui-cell__ft:after {
					display: none;
				}
			}
		}
	}
</style>
<style lang="scss" scoped>
@import '../../../../../assets/css/all.scss';

.basic{@include screen;
	ul{margin-bottom: 10px;
		li{display: flex;justify-content: space-between;background-color: white;line-height: 50px;padding:0 15px;
			a{display: block;box-sizing: border-box;}

			.l{font-size:15px;}
			.r{display: flex;justify-content: space-between;
				.Avatar{width:50px;height:50px;display: block;border-radius: 50%;overflow: hidden;}
				span{color:#666;}
				.iconfont{margin-left:10px;color:#919191;}
				// .vux-datetime{padding-left:180px;}
			}
		}
		li.AvatarBox{padding:10px 15px;}
		li + li{margin-top:1px;}
	}

}
</style>

