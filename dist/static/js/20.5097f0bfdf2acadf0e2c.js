webpackJsonp([20],{"6Tpc":function(t,s){},rH8J:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=i("K2f2"),a={name:"cordInfo",props:["show","id"],data:function(){return{cont:{},jl:"",jlShow:!0,tbShow:!1}},methods:{isShow:function(){this.$emit("success",!1)},getData:function(){var t=this;this.id&&(Object(n.y)(this.id).then(function(s){2==s.code&&(t.cont=s.rows,t.tbShow="0"==s.rows.isRefund,t.tbShow="0"==s.rows.cancelInsurType)}),Object(n.I)(this.id).then(function(s){2==s.code&&(void 0!=s.rows.msg?t.jlShow=!1:(t.jlShow=!0,t.jl=s.rows.ofclaimslist))}))},checkd:function(){this.$router.push("/user/recordDet/"+this.id)}},mounted:function(){},watch:{id:"getData"}},c={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return t.show?i("div",{staticClass:"info"},[i("div",{staticClass:"cont"},[i("h3",[t._v(t._s(t.cont.insuranceName))]),t._v(" "),i("div",{staticClass:"list"},[i("span",[t._v("保险单号：")]),t._v(" "),i("p",[t._v(t._s(t.cont.uuid))])]),t._v(" "),i("div",{staticClass:"list"},[i("span",[t._v("保险范围：")]),t._v(" "),i("p",[t._v(t._s(t.cont.ranges))])]),t._v(" "),i("div",{staticClass:"list"},[i("span",[t._v("保       期：")]),t._v(" "),i("p",[t._v(t._s(t.cont.startDate)+"-"+t._s(t.cont.endDate))])]),t._v(" "),i("div",{staticClass:"jl"},[i("h3",[t._v("理赔记录")]),t._v(" "),t.jlShow?i("ul",t._l(t.jl,function(s){return i("li",[i("div",{staticClass:"top"},[i("span",[t._v("订单："+t._s(s.uuid))]),t._v(" "),i("span",{staticClass:"tr"},[t._v("-"+t._s(s.ofclaimsMoney))])]),t._v(" "),i("div",{staticClass:"top bot"},[i("span",[t._v(t._s(s.ofclaimsTime))]),t._v(" "),i("span",[t._v(t._s(s.ofclaimsReason))])])])})):t._e()]),t._v(" "),t.tbShow?i("div",{staticClass:"tb",on:{click:t.checkd}},[i("a",{attrs:{href:"javascript:;"}},[t._v("点击退保")])]):t._e(),t._v(" "),i("div",{staticClass:"btn",on:{click:t.isShow}},[t._v("我知道了")])])]):t._e()},staticRenderFns:[]};var o=i("C7Lr")(a,c,!1,function(t){i("6Tpc")},"data-v-b7d3e878",null);s.default=o.exports}});