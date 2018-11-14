<template>
 <div class="realNameSuccess-wrap">
	<div class="realNameSuccess">
		<p><i class="iconfont icon-wancheng-yuanshijituantubiao"></i><span>认证成功</span></p>
		<p>是否需要救援卡,<em>立即购买<i class="iconfont icon-shuangjiantouyou"></i></em></p>
	</div>
 </div>
</template>

<script>
</script>

<style lang="scss" scoped>
@import '../../../../../assets/css/all';

.realNameSuccess-wrap {@include screen;background: #f5f5f5;font-size: 14px;}

.realNameSuccess{margin: 10px 10px 0 10px;background: #ffffff;text-align: center;
  p:first-child{padding: 35px 0 0px 0;color: #F02B2B;font-size: 20px;
    .iconfont{font-size: 20px;padding-right: 5px;}
  }
   p:last-child{padding: 20px 0 35px 0;color: #737373;font-size: 14px;
    em{font-style: normal;font-size: 14px;color: #F02B2B;
      .iconfont{font-size: 14px}
    }
  }

}

</style>

