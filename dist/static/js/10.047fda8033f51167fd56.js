webpackJsonp([10],{Og0x:function(t,s,n){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=n("K2f2"),a={props:["list"],data:function(){return{inList:[]}},methods:{getData:function(t){var s=this;Object(i.w)(0,10,t).then(function(t){s.inList=t.rows})}},mounted:function(){this.getData(this.list)},watch:{list:"getData"}},e={render:function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",[n("ul",{staticClass:"insTime"},t._l(t.inList,function(s,i){return n("li",{key:i,staticClass:"itemList clearfix"},[n("router-link",{attrs:{to:"/user/insuranceList/insuranceDet/"+s.id}},[n("div",{staticClass:"fl listZt"},[n("dl",{staticClass:"fl"},[n("dt",{staticClass:"fl"},[n("img",{attrs:{src:s.cover,alt:""}})]),t._v(" "),n("dd",{staticClass:"fl listTitle"},[1==s.isRecom?n("span",{staticClass:"tuiJ"},[t._v("推荐")]):t._e(),t._v(t._s(s.name))]),t._v(" "),n("dd",{staticClass:"fl listText"},[t._v(t._s(s.bstract))]),t._v(" "),n("dd",{staticClass:"fl listYuan"},[n("span",[t._v(t._s(s.money))]),t._v("元起")])])])])],1)}))])},staticRenderFns:[]};var c=n("C7Lr")(a,e,!1,function(t){n("ttJJ")},"data-v-b29931ea",null).exports,r={components:{list:c},data:function(){return{navList:[],nowIndex:0,num:0}},methods:{tabs:function(t){this.nowIndex=t,this.num=t}},mounted:function(){var t=this;Object(i.t)().then(function(s){t.navList=s.rows})}},l={render:function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"insuranceWarp"},[n("div",{staticClass:"insuranceNavBox"},[n("ul",{staticClass:"clearfix insuranceNav"},t._l(t.navList,function(s,i){return n("li",{key:i,class:{active:i==t.nowIndex},on:{click:function(s){t.tabs(i)}}},[t._v(t._s(s.name))])}))]),t._v(" "),n("list",{attrs:{list:t.num}}),t._v(" "),n("router-view")],1)},staticRenderFns:[]};var u=n("C7Lr")(r,l,!1,function(t){n("gZX9")},"data-v-4d7e5626",null);s.default=u.exports},gZX9:function(t,s){},ttJJ:function(t,s){}});