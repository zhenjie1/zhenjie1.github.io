<template>
	<div class="progress">
		<div class="rescueInfo">
			<div class="init">
				<p>救援单号：<span>{{detaData.uuid}}</span></p>
				<p>救援类型：<span>{{detaData.rangeId | Rescue}}</span></p>
				<p>呼救时间：<span>{{detaData.createDate}}</span></p>
			</div>
			<div class="rescueBtn">
				<div class="cancel" v-if="detaData.stateId == 0">取消订单</div>
			</div>
		</div>

		<div class="progressCon">

			<dl v-for="(item,index) in progressData" :key="index">
				<div class="leftXian"></div>
				<dt style="width: 100%;height: auto;">{{item.content}}</dt>
				<dd>{{item.createDate}}</dd>
			</dl>
		</div>
	</div>
</template>

<script>
import { getStore } from '../../../../../config/mUtils'
import { userProgress } from '../../../../../config/getData'
export default {
	data(){
		return {
			detaData:[],
			progressData:[]
		}
	},
	mounted(){
		this.detaData = getStore('viewCurrentData')
		let id = this.detaData.id;
		if (!id) return ;
		userProgress(id).then( res => {
			this.progressData = res.rows
		})
	}
}
</script>


<style lang="scss" scoped>
@import '../../../../../assets/css/all';
$xian: #E3E5E9;
$top: 14px;

.progress{@include screen;z-index: 11;

	.rescueInfo{background-color: white;position: relative;padding:15px;font-size: 13px;
		.init p{line-height: 26px;}
		.rescueBtn{position: absolute;right:15px;top:50%;transform: translateY(-50%);
			div{padding:6px 11px;border:1px solid #333;border-radius: 3px;}
			div + div{margin-top:10px;}
		}
	}
	.progressCon{background-color: white;margin:15px 0;padding-left:15px;position: relative;overflow: hidden;
		&:after{
			position: absolute;
			left:20px;
			top:$top + 10;
			width:1px;
			height: 100%;
			background-color: $xian;
			content:'';
			display: block;
		}
		dl{padding:14px 0;margin-left:26px;position: relative;color:#898989;
			> *{margin-right:15px;}
			.leftXian{position: absolute;left:-30px;top:$top;z-index:10;width:20px;height:20px;border-radius: 50%;text-align:center;display:flex;
				&:after{
					content:'';
					display: block;
					margin:auto;
					width:8px;height: 8px;
					background-color: $xian;
					border-radius: 50%;
				}
			}
			dd{margin-top:10px;}
		}
		dl:first-child{color:#333;
			.leftXian{background-color: #FBBFBF;
				&:after{background-color: #F02B2B;width:12px;height:12px;}
			}
		}
		dl:last-child::before{content:'';position: absolute;width:10px;height: 100%;left:-25px;top:28px;background-color: white;z-index: 1;}
		dl + dl{border-top: 1px solid $xian;}

	}
}
</style>

