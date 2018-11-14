<template>
	<div class="personnel">
		<div class="con">
			<div class="down" @click='down'><i class="iconfont icon-guanbi"></i></div>
			<div class="tit"><span>请选择出勤人员</span></div>
			<div class="pers">
				<!-- {{data}} -->
				<p v-for="(item,index) in data" v-if="item.status == 0" :class='{checked:item.check}' @click='item.check = !item.check' :key='index'>{{item.name}}</p>
			</div>
			<div class="okBtn" @click='ok'><span>选择好了</span></div>
		</div>
	</div>
</template>

<script>
import { findMyJUserList, acceptOrders } from '../../../../config/getData.js';

export default {
	data(){
		return {
			data:[]
		}
	},
	props: ['originaId'],
	methods: {
		ok(){
			var that = this;
			var users = [];
			this.data.forEach( v => {
				if( v.check ) users.push(v.id)
			})

			if(users.length === 0) {
				alert('请至少选择一人！');
				return false;
			}

			acceptOrders(this.originaId,users).then( res => {
				if( res.code == 2){
					that.$emit('down',true)
					alert('接单成功')
				}else{
					that.$emit('down',res.msg)
				}
			})
		},
		initData(){
			findMyJUserList().then( res => {
				this.data = res.rows;
			} )
		},
		down(){	//点击关闭按钮
			this.$emit('down',false)
		}
	},
	mounted () {
		this.initData();
	}
}
</script>


<style lang="scss" scoped>
@import '../../../../assets/css/all';

.personnel{position: fixed;left:0;top:0;width:100%;height:100%;background-color: rgba(0,0,0,.5);z-index:2;
	.con{overflow-y: auto;background-color: white;width:90%;position: absolute;left:50%;top:50%;transform: translate(-50%,-50%);box-sizing: border-box;border-radius:8px;
		.down{padding:10px;position: absolute;left:15px;top:10px;}
		.tit,.okBtn{height: 60px;width: 100%;text-align: center;line-height: 60px;font-size: 16px;}
		.okBtn{border-top:1px solid #e0e0e0;color:$red;}

		.pers{height: 400px;overflow-y: auto;width:90%;margin:0 auto;
			p{float:left;text-align: center;margin:10px 2%;border:1px solid #ddd;box-sizing: border-box;line-height: 30px;height: 30px;border-radius: 3px;padding: 0 6px;}
			p.checked{border-color:$redQ;background-color: $redQ;color:white;}
		}
	}
}
</style>

