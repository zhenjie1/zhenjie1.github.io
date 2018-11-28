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
body { background-color: #F5F5F5;}
.fr { float: right;}
.fl { float: left;}
.clearfix:after { clear: both; content: ""; display: block;}
.insuranceWarpHead { position: relative; border-bottom: 1px solid #E1E1E1; height: 42px;}
.insuranceListH4 { background-color: #FFFFFF; color: #333333; font-size: 16px; line-height: 42px; text-align: center;}
.insuranceNavBox { background-color: #FFFFFF; -webkit-overflow-x: scroll; overflow-x: scroll; width: 100%;}
.insuranceNavBox::-webkit-scrollbar { background-color: #FFFFFF; height: 0; width: 0;}
.insuranceWarp .hisReturn { position: absolute; font-size: 16px; left: 20px; margin-top: -8px; top: 50%;}
.insuranceNav { border-bottom: 1px solid #E3E5E9; display: flex; justify-content: flex-start; min-width: 590px;}
.insuranceNav li { position: relative; background-color: #FFFFFF; border-bottom: 2px solid #FFFFFF; display: inline-block; float: left; font-size: 14px; height: 40px; line-height: 40px; margin: 0px 16px; text-align: center; text-overflow: ellipsis; word-break: keep-all;}
.insuranceNav li.active { border-bottom: 2px solid red; color: red;}

</style>
