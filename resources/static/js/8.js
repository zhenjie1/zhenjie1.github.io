webpackJsonp([8],{"5xAp":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("ZXFd"),s=n("K2f2"),o=n("yclV"),a={data:function(){return{testval:["666","112","333"],userType:Object(o.a)("userInfo").userType,isVerified:Object(o.a)("userInfo").realName,idNumber:Object(o.a)("userInfo").idNumber,logoutShow:!1,logoutMenu:{"title.noop":'确定退出?<br/><span style="color:#666;font-size:12px;">推出后某些功能将无法使用</span>',delete:'<span style="color:red">确认退出</span>'}}},computed:{},methods:{variety:function(t,e){this.testval[e]=t},logoutEv:function(){this.logoutShow=!0},inputEv:function(t){},onDelete:function(t){var e=this;Object(s.q)().then(function(t){2==t.code&&(alert("退出成功"),e.$router.push("/user/login"))})}},components:{Actionsheet:i.a}},c={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"setting"},[n("ul",[n("router-link",{attrs:{to:"setting/loginPass",tag:"li"}},[n("span",[t._v("修改密码")]),t._v(" "),n("div",{staticClass:"r"},[n("i",{staticClass:"iconfont icon-jiantou"})])]),t._v(" "),"0"===t.isVerified?n("router-link",{attrs:{tag:"li",to:"/user/personal/verified"}},[n("span",[t._v("实名认证")]),t._v(" "),n("div",{staticClass:"r"},[n("b",[t._v("点击认证")]),t._v(" "),n("i",{staticClass:"iconfont icon-jiantou"})])]):n("li",[n("span",[t._v("实名认证")]),t._v(" "),n("div",{staticClass:"r"},[n("b",[t._v(t._s(t.idNumber))])])]),t._v(" "),3==t.userType?n("router-link",{attrs:{to:"setting/payment",tag:"li"}},[n("span",[t._v("支付密码")]),t._v(" "),n("div",{staticClass:"r"},[n("i",{staticClass:"iconfont icon-jiantou"})])]):t._e()],1),t._v(" "),n("div",{staticClass:"logout",on:{click:t.logoutEv}},[t._v("退出登录")]),t._v(" "),n("actionsheet",{attrs:{"cancel-text":"取消",menus:t.logoutMenu,"show-cancel":""},on:{"on-click-menu-delete":t.onDelete},model:{value:t.logoutShow,callback:function(e){t.logoutShow=e},expression:"logoutShow"}}),t._v(" "),n("router-view")],1)},staticRenderFns:[]};var l=n("vSla")(a,c,!1,function(t){n("pC6r")},"data-v-c709e858",null);e.default=l.exports},ZXFd:function(t,e,n){"use strict";var i=n("3cXf"),s=n.n(i),o=n("hRKE"),a=n.n(o),c={name:"actionsheet",mounted:function(){var t=this;this.hasHeaderSlot=!!this.$slots.header,this.$nextTick(function(){t.$tabbar=document.querySelector(".weui-tabbar"),t.$refs.iOSMenu&&t.$refs.iOSMenu.addEventListener("transitionend",t.onTransitionEnd)})},props:{value:Boolean,showCancel:Boolean,cancelText:String,theme:{type:String,default:"ios"},menus:{type:[Object,Array],default:function(){return{}}},closeOnClickingMask:{type:Boolean,default:!0},closeOnClickingMenu:{type:Boolean,default:!0}},data:function(){return{hasHeaderSlot:!1,show:!1}},methods:{onTransitionEnd:function(){this.$emit(this.show?"on-after-show":"on-after-hide")},onMenuClick:function(t,e){"string"==typeof t?this.emitEvent("on-click-menu",e,t):"disabled"!==t.type&&"info"!==t.type&&(t.value||0===t.value?this.emitEvent("on-click-menu",t.value,t):(this.emitEvent("on-click-menu","",t),this.show=!1))},onClickingMask:function(){this.$emit("on-click-mask"),this.closeOnClickingMask&&(this.show=!1)},emitEvent:function(t,e,n){if("on-click-menu"===t&&!/.noop/.test(e)){var i=n;"object"===(void 0===i?"undefined":a()(i))&&(i=JSON.parse(s()(i))),this.$emit(t,e,i),this.$emit(t+"-"+e),this.closeOnClickingMenu&&(this.show=!1)}},fixIos:function(t){this.$el.parentNode&&-1!==this.$el.parentNode.className.indexOf("v-transfer-dom")||this.$tabbar&&/iphone/i.test(navigator.userAgent)&&(this.$tabbar.style.zIndex=t)}},watch:{show:function(t){var e=this;this.$emit("input",t),t?this.fixIos(-1):setTimeout(function(){e.fixIos(100)},200)},value:{handler:function(t){this.show=t},immediate:!0}},beforeDestroy:function(){this.fixIos(100),this.$refs.iOSMenu&&this.$refs.iOSMenu.removeEventListener("transitionend",this.onTransitionEnd)}},l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-actionsheet"},[n("transition",{attrs:{name:"vux-actionsheet-mask"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-mask weui-mask_transparent",on:{click:t.onClickingMask}})]),t._v(" "),"android"===t.theme?n("div",{staticClass:"weui-skin_android"},[n("transition",{attrs:{name:"vux-android-actionsheet"},on:{"after-enter":function(e){t.$emit("on-after-show")},"after-leave":function(e){t.$emit("on-after-hide")}}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-actionsheet"},[n("div",{staticClass:"weui-actionsheet__menu"},t._l(t.menus,function(e,i){return n("div",{staticClass:"weui-actionsheet__cell",domProps:{innerHTML:t._s(t.$t(e.label||e))},on:{click:function(n){t.onMenuClick(e,i)}}})}))])])],1):n("div",{ref:"iOSMenu",staticClass:"weui-actionsheet",class:{"weui-actionsheet_toggle":t.show}},[n("div",{staticClass:"weui-actionsheet__menu"},[t.hasHeaderSlot?n("div",{staticClass:"weui-actionsheet__cell"},[t._t("header")],2):t._e(),t._v(" "),t._l(t.menus,function(e,i){return n("div",{staticClass:"weui-actionsheet__cell",class:"vux-actionsheet-menu-"+(e.type||"default"),domProps:{innerHTML:t._s(t.$t(e.label||e))},on:{click:function(n){t.onMenuClick(e,i)}}})})],2),t._v(" "),t.showCancel?n("div",{staticClass:"weui-actionsheet__action",on:{click:function(e){t.emitEvent("on-click-menu","cancel")}}},[n("div",{staticClass:"weui-actionsheet__cell"},[t._v(t._s(t.cancelText||t.$t("cancel")))])]):t._e()])],1)},staticRenderFns:[]};var r=n("vSla")(c,l,!1,function(t){n("tJlT")},null,null);e.a=r.exports},pC6r:function(t,e){},tJlT:function(t,e){}});