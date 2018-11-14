<template>
  <div class="imgBox">
    <h4>医疗/社保证明照片</h4>
    <img v-for='item in imgArr' :src="item" alt="">
  </div>
</template>

<script>
  
  export default {
    name:'photo',
    data() {
      return {
        imgArr:[]
      }
    },
    mounted() {
      this.imgArr = this.$route.query.img
    },
  }
</script>

<style lang="scss" scoped>
.imgBox{
  padding: 10px;
  box-sizing:border-box;
  h4 {
    font-size: 16px;
    margin: 10px 0;
  }
  img{
    width: 100%;
    height: auto;
    border-radius: 20px;
    margin-bottom: 20px;
    // @include center;
  }
}
</style>

