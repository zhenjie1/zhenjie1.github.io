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
@import "../../../../../assets/css/all"; $xian: #E3E5E9; $top: 14px;

.progress { @include screen; z-index: 11;

    .rescueInfo { position: relative; background-color: white; font-size: 13px; padding: 15px;
        .init p { line-height: 26px;}
        .rescueBtn { position: absolute; right: 15px; top: 50%; transform: translateY(-50%);
            div { border: 1px solid #333333; border-radius: 3px; padding: 6px 11px;}
            div + div { margin-top: 10px;}}}
    .progressCon { position: relative; background-color: white; margin: 15px 0; overflow: hidden; padding-left: 15px;
        &:after { position: absolute; background-color: $xian; content: ""; display: block; height: 100%; left: 20px; top: $top + 10; width: 1px;}
        dl { position: relative; color: #898989; margin-left: 26px; padding: 14px 0;
             > * { margin-right: 15px;}
            .leftXian { position: absolute; border-radius: 50%; display: flex; height: 20px; left: -30px; text-align: center; top: $top; width: 20px; z-index: 10;
                &:after { background-color: $xian; border-radius: 50%; content: ""; display: block; height: 8px; margin: auto; width: 8px;}}
            dd { margin-top: 10px;}}
        dl:first-child { color: #333333;
            .leftXian { background-color: #FBBFBF;
                &:after { background-color: #F02B2B; height: 12px; width: 12px;}}}
        dl:last-child::before { position: absolute; background-color: white; content: ""; height: 100%; left: -25px; top: 28px; width: 10px; z-index: 1;}
        dl + dl { border-top: 1px solid $xian;}}}

</style>

