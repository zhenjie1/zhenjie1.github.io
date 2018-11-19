<template>
  <div class="bBank">
    <h4>请绑定持卡人本人的银行卡</h4>
    <div class="card">
      <p class="p1">
        <span>持卡人</span>
        <input type="text" v-model='name' placeholder="请输入持卡人姓名">
      </p>
      <p class="p2">
        <span>卡号</span>
        <input type="number" v-model='card' placeholder="请输入银行卡号" @blur="fCard">
      </p>
    </div>
    <div class="lx">
      <p class="p3">
        <span>卡类型</span>
        <input type="text" v-model='cardLx' readonly>
      </p>
      <p class="p4">
        <span>手机号</span>
        <input type="number" v-model='phone' placeholder="请输入银行预留手机号">
      </p>
    </div>
    <button class="submit" @click='subBtn'>下一步</button>
    <my-code v-if='codeShow' :phoneStr='phone' @pass='reloadPass'></my-code>
    <success v-show='bingOk' :status='0'></success>
  </div>
</template>

<script>
import { findCard,bindingCard,bindingOk,userInf } from '../../../../config/getData'
import MyCode from '../../../login/newUser/code'
import success from '../../../common/success/success'
export default {
  name: 'bBank',
  data() {
  	return {
  		name:'',
      card:'',
      cardLx:'',
      phone:'',
      codeShow:false,
      bingOk:false
  	}
  },
  components:{
    MyCode,
    success
  },
  created() {
    userInf().then( res=> {
      if(res.code == 2) {
        this.name = res.rows.actualName
      }
    })
  },
  methods:{
  	fCard() {
      if(this.card.length > 16) {
        findCard(this.card).then( res => {
          if(res && res.code ==2 ){
            this.cardLx = res.rows.bank.slice(0,4)
          }
        })
      }
    },
    subBtn() {
      bindingCard(this.phone,this.card,this.name, this.cardLx).then( res=> {
        if(res && res.code == 2) {
          this.codeShow = true;
        }
      })
    },
    reloadPass(code) {
      bindingOk(code).then( res => {
        if(res.code == 2){
          this.$vux.toast.text('认证成功')
          this.codeShow = false;
          this.bingOk = true;
        }else{

        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../../assets/css/all';
  @import '../../../../assets/css/login';
  .bBank{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #f5f5f5;
    padding: 12px;
    box-sizing:border-box;
    color: #333;
    input {
      outline-style: none;
      border: none;
      font-size: 16px;
    }
    h4 {
      font-weight: 500;
      color: #666;
      margin-bottom: 6px;
    }
    .card{
      background-color: #fff;
      padding: 10px;
      font-size: 16px;
      margin-bottom: 14px;
      .p1{
        margin-bottom: 14px;
        input {
          color: #666;
        }
      }
      p {
        display: flex;
        align-items:center;
        span {
          display: block;
          width: 60px;
        }
      }
    }
    .lx{
      background-color: #fff;
      padding: 10px;
      font-size: 16px;
      margin-bottom: 14px;
      .p3{
        margin-bottom: 14px;
        input {
          color: #fc2b2b;
        }
      }
      p {
        display: flex;
        align-items:center;
        span {
          display: block;
          width: 60px;
        }
      }
    }
  }

</style>
