webpackJsonp([36],{I7TW:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("4YfN"),n=e.n(s),i=e("yclV"),c=e("K2f2"),o=e("JGLT"),r=e("9rMa"),d=(n()({},Object(r.mapState)(["userInfo"])),o.a,{data:function(){return{detaData:[],status:"",userType:"",showCancel:!1,showCancelRefuse:!1}},computed:n()({},Object(r.mapState)(["userInfo"])),components:{Confirm:o.a},methods:{cancelRefuseEv:function(t){var a=this;""!=t?Object(c.g)(this.detaData.id,t).then(function(t){t&&2==t.code&&a.$router.go(-1)}):this.$vux.toast.text("请输入拒绝理由！")},localItem:function(t){setStore("viewCurrentData",t)},cancelEv:function(t){var a=this;""!=t?Object(c.h)(this.detaData.id,t).then(function(t){t&&2==t.code&&a.$router.go(-1)}):this.$vux.toast.text("请输入取消理由！")},qxorder:function(){this.showCancel=!0},jjorder:function(){this.showCancelRefuse=!0},enterMap:function(){sessionStorage.lngLat=this.detaData.jingwei}},created:function(){var t=this;switch(this.userType=this.userInfo.userType,this.detaData=Object(i.a)("viewCurrentData"),Object(c.B)(this.detaData.id).then(function(a){t.detaData=a.rows,t.detaData.stateId=parseInt(t.detaData.stateId)}),this.detaData.stateId){case 0:this.status="未接单";break;case 1:this.status="等待出发";break;case 2:this.status="在途中";break;case 3:this.status="施救中";break;case 4:this.status="已完成"}}}),l={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"details"},[e("div",{staticClass:"rescueInfo"},[e("div",{staticClass:"init"},[e("p",[t._v("救援单号："),e("span",[t._v(t._s(t.detaData.uuid))])]),t._v(" "),e("p",[t._v("救援类型："),e("span",[t._v(t._s(t._f("Rescue")(t.detaData.rangeId)))])]),t._v(" "),e("p",[t._v("呼救时间："),e("span",[t._v(t._s(t.detaData.createDate))])])]),t._v(" "),e("div",{staticClass:"rescueBtn"},[0!=t.detaData.stateId&&99!=t.detaData.stateId?e("router-link",{staticClass:"progress",attrs:{tag:"div",to:"progress"}},[t._v("救援进展")]):t._e(),t._v(" "),3==t.userType&&0==t.detaData.stateId?e("div",{staticClass:"cancel",on:{click:t.qxorder}},[t._v("取消订单")]):t._e(),t._v(" "),3!=t.userType&&0==t.detaData.stateId?e("div",{staticClass:"cancel",on:{click:t.jjorder}},[t._v("拒绝订单")]):t._e()],1)]),t._v(" "),e("div",{staticClass:"rescueDetails"},[e("div",{staticClass:"tit"},[e("img",{attrs:{src:"",alt:""}}),t._v(" "),e("div",{staticClass:"r"},[e("h3",[t._v(t._s(t.detaData.office.name)),e("span",[t._v(t._s(this.status))])]),t._v(" "),e("p",[t._v("接单时间："),e("span",[t._v(t._s(t.detaData.acceptDate))])])])]),t._v(" "),e("div",{staticClass:"content"},[e("ul",[e("li",[e("i",{staticClass:"iconfont icon-icon-test"}),t._v(" "),e("p",[e("b",[t._v("所需物品")]),t._v(" "),t._l(t.detaData.ordersPartsList,function(a,s){return e("span",{key:s},[t._v(t._s(a.name))])})],2)]),t._v(" "),e("li",[e("i",{staticClass:"iconfont icon-dingdan2"}),t._v(" "),e("p",[e("b",[t._v("详情")]),t._v(" "),e("span",[t._v(t._s(t.detaData.details||"无"))])])]),t._v(" "),e("li",[e("i",{staticClass:"iconfont icon-gantanhao"}),t._v(" "),e("p",[e("b",[t._v("备注")]),t._v(" "),e("span",[t._v(t._s(t.detaData.remarks||"无"))])])])]),t._v(" "),3!=t.userType?e("router-link",{staticClass:"map",attrs:{to:"/rescue/map",tag:"div"},on:{click:t.enterMap}},[e("i",{staticClass:"iconfont icon-weizhi"}),t._v(" "),e("span",[t._v(t._s(t.detaData.place))])]):e("div",{staticClass:"map"},[e("i",{staticClass:"iconfont icon-weizhi"}),t._v(" "),e("span",[t._v(t._s(t.detaData.place))])])],1)]),t._v(" "),3!=t.userType?e("div",{staticClass:"duiyuan"},[e("p",[t._v("参与救援的队员")]),t._v(" "),e("ul",t._l(t.detaData.rescueNames,function(a,s){return e("li",{key:s},[t._v(t._s(a.name))])}))]):t._e(),t._v(" "),e("confirm",{attrs:{"hide-on-blur":!0,"show-input":!0,placeholder:"请输入取消理由",title:"取消理由",theme:"android","confirm-text":"确定","cancel-text":"取消"},on:{"on-confirm":t.cancelEv},model:{value:t.showCancel,callback:function(a){t.showCancel=a},expression:"showCancel"}}),t._v(" "),e("confirm",{attrs:{"hide-on-blur":!0,"show-input":!0,placeholder:"请输入拒绝理由",title:"拒绝理由",theme:"android","confirm-text":"确定","cancel-text":"取消"},on:{"on-confirm":t.cancelRefuseEv},model:{value:t.showCancelRefuse,callback:function(a){t.showCancelRefuse=a},expression:"showCancelRefuse"}})],1)},staticRenderFns:[]};var u=e("C7Lr")(d,l,!1,function(t){e("TEgo")},"data-v-02410a35",null);a.default=u.exports},TEgo:function(t,a){}});