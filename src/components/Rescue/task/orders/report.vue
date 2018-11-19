<template>
	<div class="report">
		<div class="time">
			<h2>{{zData.title}}</h2>
			<p><span>提交时间</span><i>|</i><span>{{zData.createDate}}</span></p>
		</div>
		<div class="con">
			<div class="box" v-for='item in zData.content'>
				<p>{{item.content}}</p>
				<img :src="item.contentImg" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	import { report } from '../../../../config/getData'
	export default {
		name:'report',
		data() {
			return {
				zData:''
			}
		},
		mounted() {
			let id = this.$route.params.id,
				status = this.$route.params.sta;
			report(id,status).then( res=> {
				if( res && res.code == 2) {
					this.zData = res.rows
				}
			})

		}
	}
</script>
<style lang="scss" scoped>
.report { background-color: #FFFFFF;
    .time { border-bottom: 1px solid #EEEEEE; color: #333333; font-size: 14px; padding: 12px;
        h2 { font-size: 20px; margin: 6px 0; text-align: center;}
        p { align-items: center; display: flex;
            i { display: block; margin: 0 4px; padding-bottom: 2px;}}}
    .con { padding: 12px;
        .box { margin-bottom: 20px;
            p { font-size: 16px; margin-bottom: 10px; text-indent: 2em;}
            img { height: auto; width: 100%;}}}}

</style>
