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
				this.$vux.toast.text('请至少选择一人！');
				return false;
			}

			acceptOrders(this.originaId,users).then( res => {
				if( res.code == 2){
					that.$emit('down',true)
					this.$vux.toast.text('接单成功')
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
@import "../../../../assets/css/all";

.personnel { position: fixed; background-color: rgba(0,0,0,.5); height: 100%; left: 0; top: 0; width: 100%; z-index: 2;
    .con { position: absolute; background-color: white; border-radius: 8px; box-sizing: border-box; left: 50%; overflow-y: auto; top: 50%; transform: translate(-50%,-50%); width: 90%;
        .down { position: absolute; left: 15px; padding: 10px; top: 10px;}
        .tit, .okBtn { font-size: 16px; height: 60px; line-height: 60px; text-align: center; width: 100%;}
        .okBtn { border-top: 1px solid #E0E0E0; color: $red;}

        .pers { height: 400px; margin: 0 auto; overflow-y: auto; width: 90%;
            p { border: 1px solid #DDDDDD; border-radius: 3px; box-sizing: border-box; float: left; height: 30px; line-height: 30px; margin: 10px 2%; padding: 0 6px; text-align: center;}
            p.checked { background-color: $redQ; border-color: $redQ; color: white;}}}}

</style>

