<template>
  <div class="bingOk">
    <div class="box">
      <p><i class="iconfont icon-wancheng-yuanshijituantubiao"></i><span>{{text}}</span></p>
      <p class="tip" v-if='status==2'>{{tip}}</p>
      <p class="rz" v-if='status==1 && userType==3'>是否需要救援卡,<router-link to='/user/home/userRescue'>立即购买<i class="iconfont icon-shuangjiantouyou"></i></router-link></p>
    </div>
  </div>
</template>

<script>
import { getStore } from '../../../config/mUtils'
  export default {
    props:{
      status:Number
    },
    data() {
      return {
        text:'',
        tip:'',
        userType:''
      }
    },
    mounted() {
      this.userType = getStore('userInfo').userType;
      /*  0 绑卡成功
       *  1 认证成功
       *  2 提现成功
       */
      switch (this.status) {
        case 0:
          this.text = '绑定成功';
          this.tip = ''
        break;
        case 1:
          this.text = '认证成功';
          this.tip = ''
        break;
        case 2:
          this.text = '提现成功';
          this.tip = '申请提现成功，24小时（工作日）内到账（具体到账时间以银行到账时间为准）'
        break;
        
      }
    }
  }
</script>


<style lang="scss" scoped>
  .bingOk {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #f5f5f5;
    z-index: 2;
    .box {
      width: 90%;
      background-color: #fff;
      margin: 20px auto;
      padding: 30px 0;
      text-align: center;
      font-size: 18px;
      padding-bottom: 16px;
      p {
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          color: #fc2b2b;
          font-size: 24px;
        }
        span {
          padding-left: 5px;
        }
      }
      .tip {
        font-size: 14px;
        padding: 10px;
      }
      .rz {
        padding: 10px;color: #737373;font-size: 14px;
        a{font-style: normal;font-size: 14px;color: #F02B2B;
          .iconfont{font-size: 14px}
        }
      }
      
    }
    
  }
</style>  

