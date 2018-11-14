<template>
<div>
	<ul class="sense">
		<router-link :to='"/user/home/article/" + item.id' tag='li' v-for="(item,index) in data" :key='index'>
			<div class="l">
				<h3 class="tit">{{item.title}}</h3>
				<div class="tag">
					<span>{{item.rangeId | Rescue}} | {{item.createDate | time}}</span>
					<b>{{item.clickhit}} 人阅读</b>
				</div>
			</div>
			<div class="r"><img :src="item.titleimg" alt=""></div>
		</router-link>
		<div class="loading" v-show="isShowLoading"><inline-loading></inline-loading><span>加载中</span></div>
		<bottom-line></bottom-line>
	</ul>
	<router-view></router-view>
</div>
</template>

<script>
import InlineLoading from 'vux/src/components/inline-loading/'
import BottomLine from '../../../common/bottomLine/BottomLine'
import { commonSense } from '../../../../config/getData'
import addScroll from '../../../../assets/js/scrollLoad'

export default {
	name:'sense',
	data(){
		return {
			data: [],
			isShowLoading:false,
			pageNum:1,
			currentView:'sense',
			total:0
		}
	},
	filters:{
		time(str){
			return str.substr(0,10)
		}
	},
	mounted(){
		addScroll(this);
		commonSense(this.pageNum,1).then( res => {
			this.data = res.rows
			this.total = res.total
		})
	},
	components: {
		BottomLine,
		InlineLoading
	}
}
</script>

<style lang="scss" scoped>
.loading{text-align: center;margin:20px 0;}
</style>
