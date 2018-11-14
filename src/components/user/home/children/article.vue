<template>
<div class="articlePan">
    <div class="title">
        <h1>{{data.title}}</h1>
        <p>
            <span class="label">{{data.rangeId | Rescue}}</span>
            <span class="time">{{data.createDate}}</span>
        </p>
    </div>
    <div class="time"></div>
    <div class="cont" v-html="data.content">
     
    </div>
</div>
</template>

<script>
import { articleDetails } from '../../../../config/getData'
export default {
	data(){
		return{
			data:[],
			textLen:0
		}
	},
	computed: {
		// speed(){
		// return (this.textLen / 308).toFixed(2)
		// }
	},
	mounted(){
		// this.textLen = document.getElementsByClassName('article')[0].innerText.length

		articleDetails(this.$route.params.id).then( res => {
			this.data = res.rows;
		})
        // 改变图片大小为100%
        // window.onload = this.init
	},
	methods:{
		// init(){
        //      var arr = document.querySelectorAll('.cont img')
        //      console.log(arr)
        //     for(let v of arr) {
        //         v.style.width = '100%';
        //     }
		// }
	}
}
</script>


<style lang="scss">
.articlePan{background-color: white;position: fixed;left:0;top:0;width:100%;height: 100%;overflow-y:auto;z-index:10;
    .title{padding:15px;
        h1{font-size: 22px;}
        p{line-height: 1;font-size: 0;margin-top:20px;color:#383838;}
        span{font-size:16px;}
        .time{display: inline-block;margin-left:5px;padding-left:5px;border-left:1px solid #e6e6e6;}
    }
    > .time{line-height: 43px;color:#929292;text-align: center;border-top:1px solid #eee;border-left:none;border-right: none;}

    .cont{padding:15px;color:#383838;
        img{width:100%!important;height:auto!important;min-height: 60px;background-color: #f5f5f5;display: block;margin:15px 0;}
        h1{font-size:18px;font-weight: normal;}
        p{margin:4px 0 15px;color: #636363;}
    }
    
}
</style>

