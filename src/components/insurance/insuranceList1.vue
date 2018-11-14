<template>
	<div>
		<ul class="insTime">
			<li class="itemList clearfix"  v-for="(item, index) in inList" :key="index">
				<router-link :to="'/user/insuranceList/insuranceDet/' + item.id">
					<div class="fl listZt">
						<dl class="fl">
							<dt class="fl">
								<img v-bind:src="item.cover" alt="" />
							</dt>
							<dd class="fl listTitle"><span class="tuiJ" v-if='item.isRecom == 1'>推荐</span>{{item.name}}</dd>
							<dd class="fl listText">{{item.bstract}}</dd>
							<dd class="fl listYuan"><span>{{item.money}}</span>元起</dd>
						</dl>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	import { insListing } from '../../config/getData'
	export default{
		props:['list'],
		data(){
			return {
				inList:[
					
				],
				
			}
		},
		methods:{
			getData(type) {
				insListing(0,10,type).then(res => {
					this.inList=res.rows;
				})
			}
			
		},
		mounted () {
			this.getData(this.list)
		},
		watch:{
			list:'getData'
		}
	}
</script>

<style scoped>
	.fr {float: right;}
	.fl {float: left;}
	.clearfix:after {content: "";display: block;clear: both;}
	.insTime {margin-top: 10px; }
	.itemList {width: 92%;padding: 8px 4%;background-color: #fff;overflow: hidden;border-bottom: 1px solid #f5f5f5;letter-spacing: 0.5px;}
	.itemList dl {width: 100%;}
	dt {width: 103px;height: 77px;margin-right: 4%;}
	dt img {width: 103px;height: 77px;}
	.listTitle .tuiJ {background-color: #f02b2b;border-radius: 3px;display: inline-block;color: #fff;margin-right: 5px;font-size: 13px;padding: 0px 2px;}
	.listTitle {font-size: 16px;color: #3d4245;line-height: 20px;margin-bottom: 5px;font-weight: 600;}
	.listText {width: 60%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;color: #acacac;font-size: 12px;}
	.listZt {width: 100%;}
	.listJt {margin-top: 18px;}
	.listYuan {color: #f96268;font-size: 12px;margin-top: 17px;font-weight: 600;letter-spacing: 0.5px;}
	.listYuan span {font-size: 20px;}
</style>