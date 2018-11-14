<template>
	<div class="insuranceWarp">
		<div class="insuranceNavBox">
			<ul class="clearfix insuranceNav">
				<li  v-for="(item,index) in navList" 
		        @click="tabs(index)"
            :key="index"
		        :class="{active:index==nowIndex}"
		        >{{item.name}}</li>
			</ul>
		</div>
		<list :list="num"></list>
		<router-view></router-view>
		<!--<component :is="list"></component>-->
	</div>
</template>
<script>
import list from "@/components/insurance/insuranceList1";
import { insItmeNav } from "../../config/getData";
export default {
  components: {
    list
  },
  data() {
    return {
      navList: [],
      nowIndex: 0,
      num: 0
    };
  },
  methods: {
    tabs: function(index) {
      this.nowIndex = index;
      this.num = index;
    }
  },
  mounted() {
    insItmeNav().then(res => {
      this.navList = res.rows;
    });
  }
};
</script>
	
<style  lang="scss" scoped>
body {
  background-color: #f5f5f5;
}
.fr {
  float: right;
}
.fl {
  float: left;
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.insuranceWarpHead {
  position: relative;
  height: 42px;
  border-bottom: 1px solid #e1e1e1;
}
.insuranceListH4 {
  background-color: #fff;
  line-height: 42px;
  text-align: center;
  color: #333;
  font-size: 16px;
}
.insuranceNavBox {
  width: 100%;
  background-color: #fff;
  overflow-x: scroll;
  -webkit-overflow-x: scroll;
}
.insuranceNavBox::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: #fff;
}
.insuranceWarp .hisReturn {
  position: absolute;
  left: 20px;
  top: 50%;
  margin-top: -8px;
  font-size: 16px;
}
.insuranceNav {
  border-bottom: 1px solid #e3e5e9;
  min-width: 590px;
  display: flex;
  justify-content: flex-start;
}
.insuranceNav li {
  border-bottom: 2px solid #fff;
  background-color: #fff;
  float: left;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  margin: 0px 16px;
  height: 40px;
  line-height: 40px;
  position: relative;
  text-overflow: ellipsis;
  word-break: keep-all;
}
.insuranceNav li.active {
  border-bottom: 2px solid red;
  color: red;
}
</style>