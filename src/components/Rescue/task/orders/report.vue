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
	.report {
		background-color: #fff;
		.time {
			font-size: 14px;
			color: #333;
			padding: 12px;
			border-bottom: 1px solid #eee;
			h2 {
				font-size: 20px;
				text-align: center;
				margin: 6px 0;
			}
			p {
				display: flex;
				align-items:center;
				i {
					display: block;
					margin: 0 4px;
					padding-bottom: 2px;
				}
			}			
		}
		.con {
			padding: 12px;
			.box {
				margin-bottom: 20px;
				p {
					text-indent: 2em;
					font-size: 16px;
					margin-bottom: 10px;
				}
				img {
					width: 100%;
					height: auto;
				}
			}
		}
	}
</style>