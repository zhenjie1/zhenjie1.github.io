<template>
<div class="remind">
	<dl>
		<dt class="time">{{time}}</dt>
		<dd v-for='(item,i) in dataArr' v-bind:key="i">
			<div class="title">
				<h2>{{item.logtext}}</h2>
				<p>{{date[i]}}</p>
			</div>
			<div class="price">
				<span>消费金额</span>
				<p>￥{{money[i]}}</p>
			</div>
			<ul>
				<li><span>交易时间：</span><b>{{date1[i]}}</b></li>
				<li><span>交易类型：</span><b>{{item.cztype}}</b></li>
				<li><span>交易账户：</span><b>{{item.loginName}}</b></li>
				<li><span>交易金额：</span><b>{{item.money}}</b></li>
			</ul>
		</dd>
	</dl>
</div>
</template>

<script>
	import { jRecord } from '../../../../config/getData'
	export default {
		data() {
			return {
				dataArr:[],
				money:[],
				date:[],
				date1:[],
				time:''
			}
		},
		methods:{
			formatDate(time,format='YY-MM-DD hh:mm:ss'){
		    var date = new Date(time);

		    var year = date.getFullYear(),
		        month = date.getMonth()+1,//月份是从0开始的
		        day = date.getDate(),
		        hour = date.getHours(),
		        min = date.getMinutes(),
		        sec = date.getSeconds();
		    var preArr = Array.apply(null,Array(10)).map(function(elem, index) {
		        return '0'+index;
		    });////开个长度为10的数组 格式为 00 01 02 03

		    var newTime = format.replace(/YY/g,year)
			.replace(/MM/g,preArr[month]||month)
			.replace(/DD/g,preArr[day]||day)
			.replace(/hh/g,preArr[hour]||hour)
			.replace(/mm/g,preArr[min]||min)
			.replace(/ss/g,preArr[sec]||sec);

		    return newTime;         
			}
		},
		created() {
			jRecord(1,100).then( res=> {
				if(res && res.code == 2) {
					this.dataArr = res.rows;
					for( let v of this.dataArr){
					// 修改金额
						this.money.push(v.money.replace('人民币','').replace('元',''));
						// 修改日期
						let y = v.addtime.slice(5,7),
							 day = v.addtime.slice(8,10),
							 time = v.addtime.slice(11,16);
						this.date.push(y+'月'+day+'日')
						this.date1.push(y+'月'+day+'日'+time)
					}
					// this.money = this.data
				}
			})
			this.time = this.formatDate(new Date().getTime())
			/*formatDate(new Date().getTime());//2017-05-12 10:05:44
			formatDate(new Date().getTime(),'YY年MM月DD日');//2017年05月12日
			formatDate(new Date().getTime(),'今天是YY/MM/DD hh:mm:ss');//今天是2017/05/12 10:07:45*/
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/all';

.remind{@include screen;min-height: 100%;overflow-y: auto;
	dl{line-height: 1;
		dt{text-align: center;padding-top:15px;width: 100%;height: auto;}
		dd{background-color: white;margin:15px;padding:18px 15px 40px;border:1px solid #efefef;
			.title{
				h2{font-size:18px;}
				p{font-size: 16px;margin-top:10px;}
			}
			.price{margin-top:34px;text-align: center;padding-bottom:25px;border-bottom:1px dashed #efefef;
				span{display: block;font-size: 16px;color:#929292;margin-bottom: 20px;}
				p{font-size:35px;}
			}
			ul{margin-top:15px;
				li{line-height: 30px;font-size:16px;
					b{font-weight: normal;}
				}
			}
		}
	}
}
</style>

