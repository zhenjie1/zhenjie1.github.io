<template>
<div>
	<ul class="sense">
		<router-link :to='"/user/home/article/" + item.id' tag='li' v-for="(item,index) in data" :key='index'>
			<div class="l">
				<h3 class="tit">{{item.title}}</h3>
				<div class="tag">
					<span></span>
					<b>{{item.createDate | time}}</b>
				</div>
			</div>
			<div class="r"><img :src="item.titleimg" alt=""></div>
		</router-link>
		<bottom-line></bottom-line>
	</ul>
	<router-view></router-view>
</div>
</template>

<script>
import BottomLine from '../../../common/bottomLine/BottomLine'
import { commonSense } from '../../../../config/getData'
import addScroll from '../../../../assets/js/scrollLoad'

export default {
	data(){
		return {
			data: [],
			pageNum:1,
			isShowLoading:false,
			total:0,
			currentView:'announcement'
		}
	},
	filters:{
		time(str){
			return str.substr(0,10)
		}
	},
	mounted(){
		addScroll(this);
		commonSense(this.pageNum,2).then( res => {
			this.data = res.rows;
			this.total = res.total;
		})
	},
	components: {
		BottomLine
	}
}
</script>
