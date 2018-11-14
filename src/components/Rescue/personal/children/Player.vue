<template>
  <div class="player">
    <ul>
      <!-- <li v-for='item in dataArr'>
        <img :src="item.photo" alt="">
        <p>{{item.name}}</p>
        <i class="icon iconfont icon-dianhua"></i>
      </li> -->
      <router-link :to="{path: '/personal/playInfo',query:item}" v-for='(item,i) in dataArr' tag='li':key='i'>
        <p><img :src="item.photo" alt="">{{item.name}}</p>
        <i class="icon iconfont icon-dianhua info"></i>
      </router-link>
    </ul>
  </div>
</template>

<script>
  import { findMyJUserList } from '../../../../config/getData'
  import { sort } from '../../../../assets/js/sort'

  export default {
      data(){
          return {
              dataArr : []
          }
      },
      created(){
        findMyJUserList().then( res => {
          this.dataArr = res.rows;
          // console.log(res.rows)
          // console.log(this.pySort(res.rows))
          // var arr = res.rows;
          // arr.sort((i1,i2)=>{
          //   return i1.name - i2.name
          // })
          // console.log(arr)

        })
      },
      methods:{
          compare(property){
              return function(a,b){
                  var value1 = a[property];
                  var value2 = b[property];
                  return value1 - value2;
              }
          },
          pySort:function(arr,empty){

              var $this = this;
              if(!String.prototype.localeCompare)
                  return null;

              var letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split('');
              var zh ="啊把差大额发噶哈*级卡啦吗那哦爬器然撒他**哇西呀咋".split('');     //*占位没有i,u,v拼音开头的汉字

              var arrList = [];
              for(var m =0;m<arr.length;m++){
                  arrList.push(arr[m].name);
              }
              var result = [];
              var curr;
              for(var i=0;i<letters.length;i++){
                  curr = {letter: letters[i], data:[]};

                  if(i!=26){
                      for(var j =0;j<arrList.length;j++){
                          var initial = arrList[j].charAt(0);           //截取第一个字符
                          if(arrList[j].charAt(0)==letters[i]||arrList[j].charAt(0)==letters[i].toLowerCase()){   //首字符是英文的
                              curr.data.push(arrList[j]);
                          }else if(zh[i]!='*'&&$this.isChinese(initial)){      //判断是否是无汉字,是否是中文
                              if(initial.localeCompare(zh[i]) >= 0 &&(!zh[i+1]||initial.localeCompare(zh[i+1]) <0)) {   //判断中文字符在哪一个类别
                                  curr.data.push(arrList[j]);
                              }
                          }
                      }
                  }else{
                      for(var k =0;k<arrList.length;k++){
                          var ini = arrList[k].charAt(0);           //截取第一个字符
                          if(!$this.isChar(ini)&&!$this.isChinese(ini)){
                              curr.data.push(arrList[k]);
                          }
                      }
                  }

                  if(empty || curr.data.length) {
                      result.push(curr);
                      curr.data.sort(function(a,b){
                          return b.localeCompare(a);       //排序,英文排序,汉字排在英文后面
                      });
                  }
              }
              return result;
          },
          isChinese:function(temp){
              var re=/[^\u4E00-\u9FA5]/;
              if (re.test(temp)){return false  ;}
              return true ;
          },
          isChar:function(char){
              var reg = /[A-Za-z]/;
              if (!reg.test(char)){return false ;}
              return true ;
          }
      },
      mounted(){
          var brand = [
              {name: "AHY", count: 0, selected: 0},
              {name: "ITCH'S POUCH", count: 0, selected: 0},
              {name: "～U.R", count: 0, selected: 0},
              {name: "bonvivant", count: 0, selected: 0},
              {name: "dr. jart+", count: 0, selected: 0},
              {name: "nooni", count: 0, selected: 0},
              {name: "purplebox", count: 0, selected: 0},
              {name: "the saem得鲜", count: 0, selected: 0},
              {name: "农心", count: 0, selected: 0},
              {name: "可莱丝", count: 0, selected: 0},
              {name: "太平洋爱茉莉", count: 0, selected: 0},
              {name: "悦诗风吟", count: 0, selected: 0},
              {name: "悦诗风吟牌", count: 0, selected: 0},
              {name: "汤姆农场", count: 0, selected: 0},
              {name: "海太", count: 0, selected: 0},
              {name: "美美箱", count: 0, selected: 0},
              {name: "自然源露", count: 0, selected: 0},
              {name: "贵爱娘", count: 0, selected: 0}
          ]
// console.log(sort(brand))
      }
  } 
</script>


<style lang="scss" scoped>
@import '../../../../assets/css/all';

.player{@include screen;
  ul {
    width: 100%;
    li {
      background-color: #fff;
      display: flex;
      align-items:center;
      justify-content: space-between;
      padding: 8px 20px 8px 10px;
      p {
        display: flex;
        align-items:center;
        img {
          display: block;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      .info {
        font-size: 26px;
        color: red;
      }
    }
  }
}
</style>
