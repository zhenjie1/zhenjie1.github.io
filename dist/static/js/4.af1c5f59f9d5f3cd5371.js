webpackJsonp([4],{"0MWk":function(t,e){},FhmD:function(t,e){},WAr1:function(t,e){},bBgq:function(t,e,n){(function(e){var n="Expected a function",a=NaN,i="[object Symbol]",o=/^\s+|\s+$/g,s=/^[-+]0x[0-9a-f]+$/i,r=/^0b[01]+$/i,c=/^0o[0-7]+$/i,u=parseInt,f="object"==typeof e&&e&&e.Object===Object&&e,l="object"==typeof self&&self&&self.Object===Object&&self,d=f||l||Function("return this")(),p=Object.prototype.toString,h=Math.max,v=Math.min,b=function(){return d.Date.now()};function m(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function y(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&p.call(t)==i}(t))return a;if(m(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=m(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(o,"");var n=r.test(t);return n||c.test(t)?u(t.slice(2),n?2:8):s.test(t)?a:+t}t.exports=function(t,e,a){var i,o,s,r,c,u,f=0,l=!1,d=!1,p=!0;if("function"!=typeof t)throw new TypeError(n);function _(e){var n=i,a=o;return i=o=void 0,f=e,r=t.apply(a,n)}function g(t){var n=t-u;return void 0===u||n>=e||n<0||d&&t-f>=s}function w(){var t=b();if(g(t))return k(t);c=setTimeout(w,function(t){var n=e-(t-u);return d?v(n,s-(t-f)):n}(t))}function k(t){return c=void 0,p&&i?_(t):(i=o=void 0,r)}function x(){var t=b(),n=g(t);if(i=arguments,o=this,u=t,n){if(void 0===c)return function(t){return f=t,c=setTimeout(w,e),l?_(t):r}(u);if(d)return c=setTimeout(w,e),_(u)}return void 0===c&&(c=setTimeout(w,e)),r}return e=y(e)||0,m(a)&&(l=!!a.leading,s=(d="maxWait"in a)?h(y(a.maxWait)||0,e):s,p="trailing"in a?!!a.trailing:p),x.cancel=function(){void 0!==c&&clearTimeout(c),f=0,i=u=o=c=void 0},x.flush=function(){return void 0===c?r:k(b())},x}}).call(e,n("9AUj"))},sFWC:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("hRKE"),i=n.n(a),o=n("4YfN"),s=n.n(o),r=n("JGLT"),c="wss://"+n("ij9N").b+"/a/tjSocket",u=function(t){var e=new WebSocket(c);e.onopen=function(t){console.log("连接成功"),e.send("Hello WebSockets!")},e.onmessage=function(e){var n="string"==typeof e.data?JSON.parse(e.data):e.data;t(n)},e.onclose=function(t){console.log("断开连接")}},f=n("K2f2"),l={data:function(){return{data:[]}},props:["originaId"],methods:{ok:function(){var t=this,e=[];if(this.data.forEach(function(t){t.check&&e.push(t.id)}),0===e.length)return alert("请至少选择一人！"),!1;Object(f.b)(this.originaId,e).then(function(e){2==e.code?(t.$emit("down",!0),alert("接单成功")):t.$emit("down",e.msg)})},initData:function(){var t=this;Object(f.p)().then(function(e){t.data=e.rows})},down:function(){this.$emit("down",!1)}},mounted:function(){this.initData()}},d={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"personnel"},[n("div",{staticClass:"con"},[n("div",{staticClass:"down",on:{click:t.down}},[n("i",{staticClass:"iconfont icon-guanbi"})]),t._v(" "),t._m(0),t._v(" "),n("div",{staticClass:"pers"},t._l(t.data,function(e,a){return 0==e.status?n("p",{key:a,class:{checked:e.check},on:{click:function(t){e.check=!e.check}}},[t._v(t._s(e.name))]):t._e()})),t._v(" "),n("div",{staticClass:"okBtn",on:{click:t.ok}},[n("span",[t._v("选择好了")])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tit"},[e("span",[this._v("请选择出勤人员")])])}]};var p,h,v=n("C7Lr")(l,d,!1,function(t){n("wRtY")},"data-v-3912c09a",null).exports,b=n("vgQg"),m=n("yclV"),y=n("rVsN"),_=n.n(y),g=n("lC5x"),w=n.n(g),k=n("J0Oq"),x=n.n(k),C=n("HzJ8"),I=n.n(C),D=(p=x()(w.a.mark(function t(e,n){return w.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:t.t0=n,t.next=1===t.t0?3:2===t.t0?5:3===t.t0?8:4===t.t0?11:5===t.t0?14:17;break;case 3:return Object(f.Y)(1).then(function(t){e.total=t.total,t=t.rows,e.infoData=t,e.originalData=t,j(e.infoData)}),t.abrupt("break",17);case 5:return t.next=7,Object(f.Z)().then(function(t){t=t.rows,e.infoData=t,e.originalData=t,j(e.infoData)});case 7:return t.abrupt("break",17);case 8:return t.next=10,Object(f.W)().then(function(t){t=t.rows,e.infoData=t,e.originalData=t,j(e.infoData)});case 10:return t.abrupt("break",17);case 11:return t.next=13,Object(f.X)(1).then(function(t){t=t.rows,e.infoData=t,e.originalData=t,j(e.infoData)});case 13:return t.abrupt("break",17);case 14:return t.next=16,Object(f.Y)(1,"99").then(function(t){t=t.rows,e.infoData=t,e.originalData=t,j(e.infoData)});case 16:return t.abrupt("break",17);case 17:e.$refs.li&&(e.liLength=e.$refs.li.length);case 18:case"end":return t.stop()}},t,this)})),function(t,e){return p.apply(this,arguments)});try{h=parseInt(Object(m.a)("userInfo").userType)}catch(t){}function j(t){var e=!0,n=!1,a=void 0;try{for(var i,o=I()(t);!(e=(i=o.next()).done);e=!0){var s=i.value;0==s.orderStautsList.length&&s.orderStautsList.push({content:"暂无进展"})}}catch(t){n=!0,a=t}finally{try{!e&&o.return&&o.return()}finally{if(n)throw a}}}var O=function(t,e){switch(e=parseInt(e)){case 2:Object(f.o)().then(function(e){e=e.rows,t.infoData=e,t.originalData=e,j(t.infoData)}).then(function(){t.isShow()});break;case 3:Object(f.Y)(1).then(function(e){t.total=e.total,e=e.rows,t.infoData=e,t.originalData=e,t.liLength=e.length,j(t.infoData)});break;case 4:Object(f.n)(1).then(function(e){e=e.rows,t.infoData=e,t.originalData=e,j(t.infoData)}).then(function(){t.isShow()})}},S=function(t,e,n,a,i){e=parseInt(e),t.clickObj=n,t.originaId=n.id,2===e?R(t,n,a,i):3===e?(0==a&&"救援进展"==i&&t.$router.push("/rescue/task/progress"),0==a&&-1!==i.indexOf("取消")&&(t.showCancel=!0)):4===e&&R(t,n,a,i)},E=function(t){var e=t.navIndex;3==h?D(t,e):function(t,e){new _.a(function(n,a){if(4!=e){var i=[];Array.isArray(t.originalData)&&(t.originalData.forEach(function(t,n){1==e?0!=t.stateId&&1!=t.stateId||i.push(t):e==t.stateId&&i.push(t)}),t.infoData=i,j(t.infoData),n())}else Object(f.q)(1,10).then(function(e){e=e.rows,t.infoData=e,j(t.infoData),n()})}).then(function(){setTimeout(function(){t.liLength=void 0==t.$refs.li?0:t.$refs.li.length},0)})}(t,e)},$=function(t,e){if(t=parseInt(t),2==h){var n=[[{name:"拒绝接单",type:"button"},{name:"确认接单",type:"button"}],[{name:"确认出发",type:"button"}],[{name:"拍摄",type:"file"},{name:"确认到达",type:"button"}],[{name:"拍摄",type:"file"},{name:"完成",type:"button"}],[{name:"0"===e.typeReport?"上传报告":"查看报告",type:"button"},{name:"0"===e.typeReturn?"上传回访":"查看回访",type:"button"}]];switch(t){case 0:t="等待接单",e.btn=n[0];break;case 1:t="等待出发",e.btn=n[1];break;case 2:t="已到达救援地点",e.btn=n[2];break;case 3:t="施救中",e.btn=n[3];break;case 4:t="完成",e.btn=n[4];break;default:t="未知状态"}}else if(3==h){n=[[{name:"取消订单",type:"button"}],[{name:"救援进展",type:"button"}],[{name:"救援进展",type:"button"}],[{name:"救援进展",type:"button"}],[{name:"救援进展",type:"button"}]];switch(t){case 0:t="等待接单",e.btn=n[0];break;case 1:t="等待出发",e.btn=n[1];break;case 2:t="已到达救援地点",e.btn=n[2];break;case 3:t="施救中",e.btn=n[2];break;case 4:t="已完成",e.btn=n[3];break;case 99:t="已取消",e.btn=n[4];break;default:t="未知状态"}}else if(4==h){n=[[{name:"拒绝接单",type:"button"},{name:"确认接单",type:"button"}],[{name:"确认出发",type:"button"}],[{name:"拍摄",type:"file"},{name:"确认到达",type:"button"}],[{name:"拍摄",type:"file"},{name:"完成",type:"button"}],[{name:"0"===e.typeReport?"上传报告":"查看报告",type:"button"},{name:"0"===e.typeReturn?"上传回访":"查看回访",type:"button"}]];switch(t){case 0:t="等待接单",e.btn=n[0];break;case 1:t="等待出发",e.btn=n[1];break;case 2:t="已到达救援地点",e.btn=n[2];break;case 3:t="施救中",e.btn=n[3];break;case 4:t="完成",e.btn=n[4];break;default:t="未知状态"}}return t};function R(t,e,n,a){switch(console.log(a),e.stateId=parseInt(e.stateId),e.stateId){case 0:1==n?(t.originaId=e.id,t.isShowPer=!0):t.showCancelRefuse=!0;break;case 2:case 3:1==n&&t.statusSet(e);break;case 4:0==n?"上传报告"==a?t.$router.push("/rescue/task/update/"+e.id+"/1"):"查看报告"==a&&t.$router.push("/rescue/report/"+e.id+"/1"):"上传回访"==a?t.$router.push("/rescue/task/update/"+e.id+"/0"):"查看回访"==a&&t.$router.push("/rescue/report/"+e.id+"/0"),console.log("不请求，而是跳转页面 --- 点击的是第 "+n+" 个"),-1!==a.indexOf("上传")&&console.log("点击的是上传·");break;default:console.log("报错了，快去看看代码吧！"),t.statusSet(e)}}var T=n("wEVy"),L=n("zG2y"),N=n("9rMa"),M=(s()({},Object(N.c)(["userInfo"])),L.a,r.a,{data:function(){return{showCancelRefuse:!1,showCancel:!1,navIndex:1,currentView:"orders",isShowPer:!1,infoData:[],pageNum:1,liLength:-1,userType:"",total:0,socketData:{},originalData:[],originaId:"",clickObj:"",test:"",RescueMenu:[]}},computed:s()({},Object(N.c)(["userInfo"])),filters:{office:function(t){return"object"==(void 0===t?"undefined":i()(t))?t.name:""==t||void 0==t?"救援机构未分配":t},status:function(t,e){return $(t,e)}},watch:{$route:"initData"},created:function(){console.log(this.userInfo),Object(T.a)(this)},methods:{cancelRefuseEv:function(t){var e=this;""!=t?Object(f.g)(this.originaId,t).then(function(t){e.clickObj.stateId="99"}):alert("请输入拒绝理由！")},localItem:function(t){Object(m.f)("viewCurrentData",t)},cancelEv:function(t){var e=this;""!=t?Object(f.h)(this.originaId,t).then(function(t){e.clickObj.stateId="99"}):alert("请输入拒绝理由！")},mapEv:function(t){sessionStorage.lngLat=t.jingwei},imgResult:function(t){t.target.files.length>0&&alert("拍摄成功")},listIsShow:function(t){return 3==this.userType||(1==this.navIndex?0==t.stateId||1==t.stateId:t.stateId==this.navIndex)},isShow:function(){E(this)},personal:function(){3==this.userType?this.$router.push("/user/home"):this.$router.push("/personal")},initData:function(){O(this,this.userType)},downEv:function(t){if(!0===t){for(var e=0;e<this.infoData.length;e++)if(this.infoData[e].id==this.originaId){this.infoData[e].stateId=1;break}this.isShowPer=!1}else!1===t?this.isShowPer=!1:alert(t)},statusSet:function(t){Object(f.F)(t.id,t.stateId+1).then(function(e){2==e.code&&(t.stateId=t.stateId+1)})},accept:function(t,e,n){S(this,this.userType,t,e,n)}},mounted:function(){var t=this;try{this.userType=this.userInfo.userType}catch(t){this.$router.push("/user/login")}this.RescueMenu=3==this.userType?b.c:b.a,this.initData();u(function(e){console.log(e),1==e.code?(alert("你有新的任务"),console.log(e.rows),t.infoData.splice(0,0,e.rows)):3==e.code||2==e.code&&(alert("你有新的任务"),t.infoData.splice(0,0,e.rows))})},components:{Personnel:v,BottomLine:L.a,Confirm:r.a}}),W={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"task"},[n("ul",{staticClass:"nav"},t._l(t.RescueMenu,function(e,a){return n("li",{key:a,class:{checked:a==t.navIndex-1},on:{click:function(e){t.navIndex=a+1,t.isShow()}}},[n("span",[t._v(t._s(e))])])})),t._v(" "),n("div",{staticClass:"ordersComm Orders"},[n("ul",t._l(t.infoData,function(e,a){return t.listIsShow(e)?n("li",{key:a,ref:"li",refInFor:!0,class:"order",on:{click:function(n){t.localItem(e)}}},[n("router-link",{attrs:{to:"/rescue/task/details"}},[n("div",{staticClass:"title"},[n("p",[t._v("救援单号："+t._s(e.uuid))]),t._v(" "),n("span",[t._v(t._s(t._f("status")(e.stateId,e)))])]),t._v(" "),3==t.userType?n("div",{staticClass:"track"},[n("i",{staticClass:"iconfont icon-che"}),t._v(" "),n("div",{staticClass:"r"},[n("h2",[t._v(t._s(e.orderStautsList[0].content))]),t._v(" "),n("span",[t._v(t._s(e.createDate))])])]):t._e(),t._v(" "),n("div",{staticClass:"info"},[n("img",{staticClass:"icon",attrs:{src:"",alt:""}}),t._v(" "),n("div",{staticClass:"con"},[n("h3",[t._v(t._s(t._f("office")(e.office)))]),t._v(" "),n("p",[n("span",[t._v(t._s(t._f("Rescue")(e.rangeId)))]),t._v(" "),n("b",[t._v(t._s(e.createDate))])])])])]),t._v(" "),""!==e.remarks?n("div",{staticClass:"note"},[n("i",{staticClass:"iconfont icon-jinggao"}),t._v(" "),n("span",[t._v("备注")]),t._v(" "),n("p",[t._v(t._s(e.remarks))])]):t._e(),t._v(" "),3!=t.userType?n("router-link",{attrs:{to:"/rescue/map"},nativeOn:{click:function(n){t.mapEv(e)}}},[n("div",{staticClass:"position"},[n("i",{staticClass:"iconfont icon-weizhi"}),t._v(" "),n("p",[t._v(t._s(e.place))]),t._v(" "),n("span",{staticStyle:{opacity:"0"}},[t._v("22.22km")]),t._v(" "),n("b",{attrs:{href:""}},[t._v("查看地图 "),n("i",{staticClass:"iconfont icon-shuangjiantouyou"})])])]):n("div",[n("div",{staticClass:"position"},[n("i",{staticClass:"iconfont icon-weizhi"}),t._v(" "),n("p",[t._v(t._s(e.place))])])]),t._v(" "),99!=e.stateId?n("div",{staticClass:"btn"},t._l(e.btn,function(a,i){return n("div",{key:i,class:{file:"file"==a.type}},["file"==a.type?n("span",[t._v(t._s(a.name))]):t._e(),t._v(" "),n("input",{attrs:{type:a.type,accept:"image/*",capture:"camera"},domProps:{value:"button"==a.type?a.name:""},on:{click:function(n){t.accept(e,i,a.name)},change:t.imgResult}})])})):t._e()],1):t._e()})),t._v(" "),n("transition",{attrs:{name:"breadcrumb"}},[n("router-view"),t._v(" "),t.isShowPer?n("personnel",{attrs:{originaId:t.originaId},on:{down:t.downEv}}):t._e()],1)],1),t._v(" "),n("confirm",{attrs:{"hide-on-blur":!0,"show-input":!0,placeholder:"请输入取消理由",title:"取消理由",theme:"android","confirm-text":"确定","cancel-text":"取消"},on:{"on-confirm":t.cancelEv},model:{value:t.showCancel,callback:function(e){t.showCancel=e},expression:"showCancel"}}),t._v(" "),n("confirm",{attrs:{"hide-on-blur":!0,"show-input":!0,placeholder:"请输入拒绝理由",title:"拒绝理由",theme:"android","confirm-text":"确定","cancel-text":"取消"},on:{"on-confirm":t.cancelRefuseEv},model:{value:t.showCancelRefuse,callback:function(e){t.showCancelRefuse=e},expression:"showCancelRefuse"}}),t._v(" "),t.liLength>0?n("bottom-line"):t._e(),t._v(" "),0==t.liLength?n("div",{staticClass:"Empty"},[n("i",{staticClass:"iconfont icon-icondd1"}),n("p",[t._v("暂无数据")])]):t._e(),t._v(" "),3!=t.userType?n("div",{staticClass:"personal",on:{click:t.personal}},[n("i",{staticClass:"iconfont icon-wode"})]):n("div",{staticClass:"personal",on:{click:t.personal}},[n("i",{staticClass:"iconfont icon-home"})])],1)},staticRenderFns:[]};var F=n("C7Lr")(M,W,!1,function(t){n("FhmD"),n("0MWk")},"data-v-a86ce0b8",null);e.default=F.exports},wEVy:function(t,e,n){"use strict";var a,i,o=n("lC5x"),s=n.n(o),r=n("J0Oq"),c=n.n(r),u=n("K2f2"),f=n("yclV"),l=(a=c()(s.a.mark(function t(e,n){var a,i,o;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a=Object(f.a)("userInfo").userType,i=e.navIndex,o=[],3!=a){t.next=14;break}if(1!=i){t.next=9;break}return t.next=7,Object(u.Y)(n).then(function(t){o=t.rows});case 7:t.next=12;break;case 9:if(4!=i){t.next=12;break}return t.next=12,Object(u.X)(n).then(function(t){o=t.rows});case 12:t.next=17;break;case 14:if(2!=a){t.next=17;break}return t.next=17,Object(u.q)(n).then(function(t){o=t.rows});case 17:p(e,o,"infoData");case 18:case"end":return t.stop()}},t,this)})),function(t,e){return a.apply(this,arguments)}),d=(i=c()(s.a.mark(function t(e,n,a){var i;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return i=[],t.next=3,Object(u.j)(n,a).then(function(t){i=t.rows,e.isShowLoading=!1});case 3:p(e,i,"data");case 4:case"end":return t.stop()}},t,this)})),function(t,e,n){return i.apply(this,arguments)});function p(t,e,n){e.forEach(function(e){t[n].push(e)})}var h,v=n("bBgq"),b=n.n(v);e.a=function(t){h=t,window.addEventListener("scroll",b()(m,500))};function m(){if(function(){var t=0,e=0;document.body&&(t=document.body.scrollTop);document.documentElement&&(e=document.documentElement.scrollTop);return t-e>0?t:e}()+function(){var t=0;t="CSS1Compat"==document.compatMode?document.documentElement.clientHeight:document.body.clientHeight;return t}()==function(){var t=0,e=0;document.body&&(t=document.body.scrollHeight);document.documentElement&&(e=document.documentElement.scrollHeight);return t-e>0?t:e}())if(-1!==h.$route.path.indexOf("/rescue/task")){if(h.total<10*h.pageNum)return;h.pageNum++,l(h,h.pageNum)}else if(-1!==h.$route.path.indexOf("/user/home")){if(h.total<10*h.pageNum)return;h.isShowLoading=!0;var t="sense"==h.currentView?"1":"2";h.pageNum++,d(h,h.pageNum,t)}}},wRtY:function(t,e){},zG2y:function(t,e,n){"use strict";var a={props:["text"],data:function(){return{txt:""}},mounted:function(){this.txt=void 0!==this.text?this.text:"我是有底线的"}},i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bottomLine"},[e("p",[this._v(this._s(this.txt))])])},staticRenderFns:[]};var o=n("C7Lr")(a,i,!1,function(t){n("WAr1")},"data-v-2935bb20",null);e.a=o.exports}});