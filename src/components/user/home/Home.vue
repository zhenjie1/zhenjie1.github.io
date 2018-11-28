<template>
	<div class="home">
		<!-- <div class="startMap" @click='startMap'>唤起地图</div> -->
		<div class="map">
			<mapp :screen='isScreen' :lngLat='lngAndLat' @screen='screenEv' @sos='sosOrdersEv'></mapp>
			<div class="search" :class="{screen: isScreen}">
				<div class="input">
					<i class="iconfont icon-search"></i>
					<input type="text" name="" id="suggestId" placeholder='搜索地点或救援点' ref="inputMap" v-model="searchTxt" @focus="showSearchResult = true" @blur="showSearchResult = false">
					<!-- <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div> -->
					<ul class="searchResult" v-if="showSearchResult">
						<li v-for="(item,index) in setRescue" :key='index' @click='setLngLat(item)'>
							<h3>{{item.name}}</h3>
							<p>{{item.address}}</p>
						</li>
					</ul>
				</div>
				<div class="position">
					<span>{{district}}</span>
					<i class="iconfont icon-jiantou_down"></i>
				</div>
			</div>
			<div class="menuTiao" @click='screen'><p></p></div>
			<div class="menuBtn">
				<router-link tag="div" class="rescue btn" to='home/userRescue'>
					<i class="iconfont icon-yinhangqia"></i>
					<span>救援卡</span>
				</router-link>
				 <router-link to='/user/insuranceList' tag='div' class="insurance btn">
					<i class="iconfont icon-fenfabaoxian"></i>
					<span>保险理财</span>
				</router-link>
			</div>
		</div>
		<div class="advertising">
			<!-- <img src="" alt=""> -->
			<swiper height='130px' :list='imgList'></swiper>
		</div>
		<div class="con" ref='con' :class='{"fixed":classFlag}'>
			<ul class="nav">
				<li :class='{checked: conLiIndex == 1}' @click='commonSenseEv(1)'>急救小常识</li>
				<li :class='{checked: conLiIndex == 2}' @click='commonSenseEv(2)'>系统公告</li>
			</ul>
			<!-- <transition name='breadcrumb'> -->
				<component :is='currentView'></component>
			<!-- </transition> -->
		</div>
		<bottom-nav checkIndex='1' />
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Mapp from '../../../components/common/mapp/mapp'
import Sense from './children/sense.vue'
import { Swiper } from 'vux/src/components/swiper/'
import Announcement from './children/announcement.vue'
import { sosOrders } from '@/config/getData'
import mapLngLat from '../../../assets/js/LatAndLon'
import bottomNav from '../../common/bottomNav/bottomNav'
import { isLogin, isGeographicLocation } from '../../../config/mUtils.js'

import banner1 from '../.././../assets/images/banner1.png'
import banner2 from '../.././../assets/images/banner2.png'


export default {
	data(){
		return {
			start: 0,
			searchTxt:'',
			showSearchResult:false,//搜索结果显示
			lngAndLat:'',//保存搜索出来的经纬
			setRescue:[],
			isMenuShow:false,
			conLiIndex:1,
			pageNum:1,
			isScreen:false,//地图是否全屏
			currentView: 'sense',
			imgList:[{
				img: banner1,
			}, {
				img: banner2,
			}],
			classFlag:false
		}
	},
	watch:{
		searchTxt(val){
			var rescueArr = JSON.parse(sessionStorage.setRescue)
			var temporaryArr = [];
			rescueArr.forEach( v => {
				if(v.address.indexOf(val) !== -1){
					temporaryArr.push(v)
				}else if(v.name.indexOf(val) !== -1){
					temporaryArr.push(v)
				}
			})
			this.setRescue = temporaryArr
		}
	},
	methods: {
		...mapActions([
			'setGeographicLocation',
			'setHomeUrl',
		]),
		startMap(){
			window.startMap.call(this)
		},
		setLngLat(item){
			this.lngAndLat = item.longitude + ',' + item.dimensions
		},
		commonSenseEv(index){
			this.conLiIndex = index
			this.currentView = index == 1 ? 'sense' : 'announcement';
		},
		screenEv(val){
			this.isScreen = val
		},
		screen(){
			this.isScreen = true
		},
		sosOrdersEv(){
			mapLngLat(this).then( res => {
				var [x,y] = [res.Longitude,res.Latitude];

				sosOrders(x,y).then( res => {
					this.$vux.toast.text(res.msg)
					if(res.code == 2){
						window.location.href = 'tel:' + res.mobile
					}else if(res.code == 101){
						window.location.href = 'tel:' + res.mobile
					}else if( res.code == 600 ) {
						this.$router.push('/user/home/userRescue')
					}
					else if( res.code == 601 ) {
						this.$router.push('/user/personal/verified')
					}
				})
			})
		},
	},
	mounted(){

		//保存首页url
		let isJW = isGeographicLocation.call(this)
		const url = window.location.href.split('#')[1]
		if( isJW ) this.setHomeUrl(url)

		//如果已经登录,区分救援端与客户端
		let isLogins = isLogin.call(this);
		if((isLogins && this.userInfo['userType'] != 3) || (this.$route.query.type && this.$route.query.type != '3') ) {
			this.$router.push('/rescue/task')
			return
		}

		if(sessionStorage.setRescue){
			this.setRescue = JSON.parse(sessionStorage.setRescue)
		}

		let con = this.$refs.con
		window.addEventListener('scroll',(event)=> {
			let tpScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
			if(con.offsetTop < tpScrollTop) {
				this.classFlag = true;
			}else {
				this.classFlag = false;
			}
		});
	},
	computed:{
		...mapState([
			'userInfo',
			'homeUrl',
			'district',
			'geographicLocation'
		])
	},
	components: {
		Mapp,
		Sense,
		Announcement,
		Swiper,
		bottomNav
	}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/all';

.search input::-ms-input-placeholder {color:white;}
.search input::-webkit-input-placeholder {color:white;}
.search input:-moz-placeholder { color: white;}
.search input::-moz-placeholder { color: white;}
.search input:-ms-input-placeholder { color: white;}

.startMap{position: fixed;left:50%;bottom:120px;transform: translateX(-50%);z-index: 1000;background-color: #3cc523;font-size: 16px;padding:10px 15px;color:white;}
.home{position: relative;
	.map{height: 370px;}
	.fixed {
		padding-top: 45px;
		ul {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
		}
	}
	.con{
		ul.nav{overflow: hidden;background-color: white;
			li{float:left;width:50%;text-align: center;font-size:17px;line-height: 45px;color:#939393;position: relative;}
			li:after{position: absolute;left:50%;bottom: 6px;transform: translateX(-50%);content: '';display: block;width:30px;height: 3px;border-radius: 10px;background-color: transparent;}
			li.checked{color: #333;font-weight: bold;}
			li.checked:after{background-color: $red;}
		}
	}
	.search{display: flex;z-index:1;justify-content: space-between;margin:0 3%;position: absolute;left:0;top:10px;width:94%;
		div.input{display: block;width:70%;position: relative;
			input{background-color: rgba(0,0,0,.2);border:none;width: 100%;height: 38px;padding:9px 0 9px 32px;font-size:14px;color:white;border-radius: 4px;box-sizing: border-box;}
			i{position: absolute;left:10px;top:50%;transform: translateY(-50%);color:white;}
		}
		.searchResult{background-color: white;box-shadow: 0 2px 10px rgba(0,0,0,.1);width:100%;position: absolute;top:45px;box-sizing: border-box;padding:0 15px;border-radius:2px;overflow-y: auto;max-height:500px;
			li{padding: 10px 0;
				h3{font-size:14px;font-weight: normal;}
				p{font-size: 12px;color:#999;}
			}
			li + li{border-top: 1px solid #f5f5f5;}
		}
	}
	.position{
		*{color:#908F8D;}
		span{font-size: 16px;line-height: 38px;}
	}
	.menuTiao{background-color: white;padding:13px 0;
		p{width:40px;height: 5px;background-color: #C4C5C2;border-radius: 100px;margin:0 auto;}
	}



	.menuBtn{display: flex;justify-content: space-around;background-color:white;padding:0 0 20px;
		box-shadow:0 4px 8px rgba(0,0,0,.05);
		.btn{height: 50px;line-height: 50px;border-radius: 100px;width:140px;text-align:center;
			i{font-size:26px;margin-right: 6px;vertical-align: middle;}
			span{font-size: 16px;}
		}
		.rescue{background-color: #E7F6FF;color:#5E8AA6;
			i{color:#12A6FF;}
		}
		.insurance{background-color: #FEEFE8;color:#967363;
			i{color:#F89666;}
		}
	}
	.advertising{margin:10px 0;
		img{width:100%;height: 140px;display: block;}
	}
}
</style>

<style lang="scss">
@import '../../../assets/css/all';

.sense{
	li{background-color: white;padding:15px 15px;border-top: 1px solid #f5f5f5;display: flex;justify-content: space-between;
		.l{flex:1;
			.tit{font-size:16px;font-weight:normal;height:44px;}
			.tag{display: flex;justify-content: space-between;margin-top:2px;color:#929292;}
			b{font-weight: normal;}
		}
		.r{margin-left:10px;
			img{@include wh(64px,64px);display: block;}
		}
	}
}

.map .posBox{
	.menuTiao,.help{display:none;}
}
.search.screen{position:fixed !important;}
.map.screen{position: fixed;left:0;top:0;width:100%;height: 100%;z-index: 1;
	.hello{height:100%;}
	#map{position: absolute;left:0;top:0;z-index:11;width:100%;height: 100%;
	}
	.posBox{
		.menuTiao,.help{display:block;}
	}
}
</style>

