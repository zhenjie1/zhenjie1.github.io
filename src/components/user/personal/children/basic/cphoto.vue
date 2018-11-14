<template>
  <div class="cp">
    <img :src="item.img" alt="" v-for='item in zsArr'>
  </div>
</template>

<script>
import { getUserInfo, editUserInfo } from '@/config/getData'
  export default {
    name:'cp',
    data() {
      return {
        zsArr:[]
      }
    },
    mounted() {
      getUserInfo().then( res=> {
        this.zsArr = res.rows.zhengshu
      })
    }
  }
</script>

<style lang="scss" scoped>
  .cp {
    position:fixed;
    background-color: #f5f5f5;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 10px;
    box-sizing: border-box;
    overflow-y: scroll;
    img {
      display: block;
      margin-bottom: 10px;
      width: 100%;
      height: auto;
      border-radius: 10px;
    }
  }
</style>

