webpackJsonp([7],{"2bfE":function(t,s,i){"use strict";var o=i("4YfN"),a=i.n(o),n=i("bBgq"),e=i.n(n),c=i("K2f2"),r=i("9rMa"),l=i("yclV"),u=(a()({},Object(r.mapState)(["geographicLocation","homeUrl","userInfo"])),{props:["checkIndex"],data:function(){return{start:0,isMenuShow:!1}},computed:a()({},Object(r.mapState)(["geographicLocation","homeUrl","userInfo"])),methods:{sosOrdersEv:function(){var t=this;if(!l.e)return this.$vux.toast.text("请先登录！"),void this.$router.push("/user/login");if(!this.geographicLocation)return this.$vux.toast.text("无法获取您的位置！");var s=[this.geographicLocation.Longitude,this.geographicLocation.Latitude],i=s[0],o=s[1];Object(c.Q)(i,o).then(function(s){t.$vux.toast.text(s.msg),2==s.code?window.location.href="tel:"+s.mobile:101==s.code?window.location.href="tel:"+s.mobile:600==s.code?t.$router.push("/user/home/userRescue"):601==s.code&&t.$router.push("/user/personal/verified")})},scrollEv:function(t){var s=Math.floor(t.targetTouches[0].clientY);s>this.start+10?this.isMenuShow=!1:s+10<this.start&&(this.isMenuShow=!0),this.start=s}},mounted:function(){window.addEventListener("touchstart",function(t){this.start=Math.floor(t.targetTouches[0].clientY)}),window.addEventListener("touchmove",e()(this.scrollEv,20,{leading:!0,trailing:!1}))}}),v={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"menuBottom",class:{menuBottomHide:t.isMenuShow}},[i("ul",[i("router-link",{class:{checked:"1"==t.checkIndex},attrs:{to:t.homeUrl,tag:"li"}},[i("div",{staticClass:"icon"},[i("i",{staticClass:"iconfont icon-home"})]),t._v(" "),i("p",[t._v("首页")])]),t._v(" "),i("li",{staticClass:"middle",on:{click:t.sosOrdersEv}},[t._m(0),t._v(" "),i("p",[t._v("一键呼救")])]),t._v(" "),i("router-link",{class:{checked:"2"==t.checkIndex},attrs:{to:"/user/personal",tag:"li"}},[i("div",{staticClass:"icon"},[i("i",{staticClass:"iconfont icon-wode1"})]),t._v(" "),i("p",[t._v("个人")])])],1)])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"icon"},[s("i",{staticClass:"iconfont icon-dianhua"})])}]};var f=i("C7Lr")(u,v,!1,function(t){i("Q2Pz")},"data-v-76beed6c",null);s.a=f.exports},Q2Pz:function(t,s){},WxaW:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o=i("4YfN"),a=i.n(o),n=i("9rMa"),e=i("K2f2"),c=i("2bfE"),r=i("yclV"),l=(a()({},Object(n.mapState)(["userInfo"])),c.a,a()({},Object(n.mapActions)(["setUserInfo"]),{getUserInfoEv:function(){var t=this;Object(e.s)().then(function(s){s=s.rows,t.setUserInfo(s)})}}),{data:function(){return{text:""}},computed:a()({},Object(n.mapState)(["userInfo"])),components:{bottomNav:c.a},methods:a()({},Object(n.mapActions)(["setUserInfo"]),{getUserInfoEv:function(){var t=this;Object(e.s)().then(function(s){s=s.rows,t.setUserInfo(s)})}}),created:function(){this.getUserInfoEv(),r.e.call(this)?this.text=1==this.userInfo.vipType?"保障中":"去购买":(this.$vux.toast.text("请先登录！"),this.$router.push("/user/login"))}}),u={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"personal"},[i("router-link",{staticClass:"info",attrs:{tag:"div",to:"personal/basic"}},[i("img",{staticClass:"avatar",attrs:{src:t.userInfo.photo,alt:""}}),t._v(" "),i("div",{staticClass:"center"},[i("h3",[t._v("昵称："+t._s(t.userInfo.name))]),t._v(" "),i("span",[t._v("查看或编辑个人信息")])]),t._v(" "),i("i",{staticClass:"iconfont icon-fenxiang"})]),t._v(" "),i("ul",{staticClass:"options"},[i("router-link",{attrs:{to:"/user/personal/money",tag:"li"}},[i("div",{staticClass:"l"},[i("i",{staticClass:"iconfont icon-weibiaoti-"}),t._v(" "),i("span",[t._v("我的钱包")])]),t._v(" "),i("div",{staticClass:"r"},[i("i",{staticClass:"iconfont icon-jiantou"})])])],1),t._v(" "),i("ul",{staticClass:"options"},[i("router-link",{attrs:{to:"/user/home/userRescue",tag:"li"}},[i("div",{staticClass:"l"},[i("i",{staticClass:"iconfont icon-yinhangqia"}),t._v(" "),i("span",[t._v("救援卡")])]),t._v(" "),i("div",{staticClass:"r"},[i("b",[t._v(t._s(t.text))]),t._v(" "),i("i",{staticClass:"iconfont icon-jiantou"})])]),t._v(" "),i("router-link",{attrs:{to:"/rescue",tag:"li"}},[i("div",{staticClass:"l"},[i("i",{staticClass:"iconfont icon-shijian"}),t._v(" "),i("span",[t._v("救援记录")])]),t._v(" "),i("div",{staticClass:"r"},[i("i",{staticClass:"iconfont icon-jiantou"})])]),t._v(" "),i("router-link",{attrs:{to:"/user/buyRecord"}},[i("li",[i("div",{staticClass:"l"},[i("i",{staticClass:"iconfont icon-jiaoyijilu"}),t._v(" "),i("span",[t._v("保险记录")])]),t._v(" "),i("div",{staticClass:"r"},[i("i",{staticClass:"iconfont icon-jiantou"})])])]),t._v(" "),i("router-link",{attrs:{to:"personal/remind",tag:"li"}},[i("div",{staticClass:"l"},[i("i",{staticClass:"iconfont icon-xiaoxi"}),t._v(" "),i("span",[t._v("我的消息")])]),t._v(" "),i("div",{staticClass:"r"},[i("i",{staticClass:"iconfont icon-jiantou"})])])],1),t._v(" "),i("ul",{staticClass:"options"},[i("router-link",{attrs:{to:"/setting",tag:"li"}},[i("div",{staticClass:"l"},[i("i",{staticClass:"iconfont icon-shezhi"}),t._v(" "),i("span",[t._v("设置")])]),t._v(" "),i("div",{staticClass:"r"},[i("i",{staticClass:"iconfont icon-jiantou"})])])],1),t._v(" "),i("bottom-nav",{attrs:{checkIndex:"2"}}),t._v(" "),i("transition",{attrs:{name:"breadcrumb"}},[i("router-view")],1)],1)},staticRenderFns:[]};var v=i("C7Lr")(l,u,!1,function(t){i("xCac")},"data-v-62f88ae6",null);s.default=v.exports},xCac:function(t,s){}});