webpackJsonp([15],{gJNV:function(t,s,e){t.exports=e.p+"static/img/tb.png"},oI56:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r=e("K2f2"),i=e("yclV"),a={name:"rDet",data:function(){return{recordDet:[],id:""}},methods:{zmBtn:function(){0!=this.recordDet.hospitalImgs.length&&this.$router.push({path:"/user/photo",query:{img:this.recordDet.hospitalImgs}})},tbBtn:function(){0==this.recordDet.cancelInsurType&&this.$router.push("/user/recordDet/retreat/"+this.id)}},mounted:function(){var t=this;this.id=this.$route.params.id,Object(r.y)(this.id).then(function(s){t.recordDet=s.rows,t.recordDet.orderInsuranceUserIdNumber=Object(i.h)(t.recordDet.orderInsuranceUserIdNumber,3,4),window.sessionStorage.recordDet=t.recordDet.claimProcess})}},c={render:function(){var t=this,s=t.$createElement,r=t._self._c||s;return r("div",{staticClass:"rDet"},[r("div",{staticClass:"tit w95"},[r("img",{attrs:{src:e("gJNV"),height:"455",width:"1080",alt:""}}),t._v(" "),r("h1",[t._v(t._s(t.recordDet.insuranceName))]),t._v(" "),r("p",[r("span",{staticClass:"tl"},[t._v(t._s(t.recordDet.remarks))]),t._v(" "),r("span",{staticClass:"tr"},[t._v("天佑在线承诺")])])]),t._v(" "),r("div",{staticClass:"rDetFw w95"},[r("h5",[t._v("保障范围")]),t._v(" "),r("div",[t._v(t._s(t.recordDet.ranges))])]),t._v(" "),r("div",{staticClass:"list w95"},[r("ul",[r("li",[r("span",[t._v("被保人姓名")]),t._v(" "),r("span",{staticClass:"ls"},[t._v(t._s(t.recordDet.orderInsuranceUserName))])]),t._v(" "),r("li",[r("span",[t._v("身份证号码")]),t._v(" "),r("span",{staticClass:"ls"},[t._v(t._s(t.recordDet.orderInsuranceUserIdNumber))])]),t._v(" "),r("li",[r("span",[t._v("是否有医保（含新农合）")]),t._v(" "),r("span",{staticClass:"lsp"},[t._v(t._s(0==t.recordDet.isMc?"无医保":"有医保"))])]),t._v(" "),r("li",[r("span",[t._v("最近是否住院")]),t._v(" "),r("span",{staticClass:"lsp"},[t._v(t._s(0==t.recordDet.isHospital?"无":"有"))])])])]),t._v(" "),r("div",{staticClass:"w95"},[r("div",{staticClass:"rDetTime"},[r("h5",[t._v("有效日期")]),t._v(" "),r("div",[t._v(t._s(t.recordDet.startDate)+"-"+t._s(t.recordDet.endDate))])]),t._v(" "),r("div",{staticClass:"rDetTime",on:{click:t.zmBtn}},[r("h5",[t._v("医保/住院证明")]),t._v(" "),r("div",[r("span",{staticStyle:{color:"#999"}},[t._v(t._s(""==t.recordDet.hospitalImgs?"无":"点击查看"))]),t._v(" "),r("span",{staticClass:" iconfont icon-jiantou"})])]),t._v(" "),t._m(0)])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("a",{staticClass:"rDetLc",attrs:{href:"/#/user/insuranceList/claims/"}},[s("h5",[this._v("理赔流程")]),this._v(" "),s("span",{staticClass:" iconfont icon-jiantou"})])}]};var n=e("C7Lr")(a,c,!1,function(t){e("srVi")},"data-v-69e2d512",null);s.default=n.exports},srVi:function(t,s){}});