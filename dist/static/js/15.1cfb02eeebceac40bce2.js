webpackJsonp([15],{"5Y1F":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n("yvAY");var s=n("fc0N"),i=n.n(s),o=n("K2f2"),a=n("0I+a"),c=(Boolean,String,{props:{value:Boolean,rescueId:String},data:function(){return{paymentPass:"",token:""}},watch:{value:function(t){var e=this;t&&setTimeout(function(){return e.$refs.pass.focus()},0)}},methods:{submit:function(){var t=this;this.paymentPass?this.paymentPass.length<6?this.$vux.toast.text("支付密码最少 6 位"):Object(o.U)(this.paymentPass).then(function(e){console.log("id："+t.rescueId+"  token："+e.rows.token),Object(o.N)(t.rescueId,e.rows.token).then(function(e){2==e.code?(t.$vux.toast.text("购买成功"),t.$emit("vipType",1),t.$router.go(-1)):t.$vux.toast.text(e.msg)})}):this.$vux.toast.text("请输入支付密码")},hide:function(){this.$emit("input",!1)},getData:function(){var t=this;Object(o.c)().then(function(e){t.money=e.rows.money,t.options[0].txt="可用余额 "+t.money+" 元"})}},created:function(){this.getData()}}),r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"PaymentPass"},[n("div",{staticClass:"bg",on:{click:t.hide}}),t._v(" "),n("div",{staticClass:"container"},[n("div",{staticClass:"title"},[n("i",{staticClass:"iconfont icon-guanbi",on:{click:t.hide}}),t._v("\n\t\t\t请输入支付密码\n\t\t")]),t._v(" "),n("div",{staticClass:"content"},[n("form",{on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.paymentPass,expression:"paymentPass"}],ref:"pass",attrs:{type:"password",placeholder:"支付密码"},domProps:{value:t.paymentPass},on:{input:function(e){e.target.composing||(t.paymentPass=e.target.value)}}}),t._v(" "),n("i",{staticClass:"iconfont icon-jiantou",on:{click:t.submit}})]),t._v(" "),n("router-link",{attrs:{to:"/setting/payment/forget",tag:"b"}},[t._v("忘记支付密码\n\t\t\t")])],1)])])},staticRenderFns:[]};var u=n("C7Lr")(c,r,!1,function(t){n("ygXg")},"data-v-1fceb440",null).exports,l=(n("ij9N"),n("yclV")),p=(a.a,{components:{Payment:a.a,popPayment:u},data:function(){return{showPayment:!1,jyId:"",pageNum:0,cont:"",img:"",price:"",isShow:!0,userInfo:""}},methods:{paymentHide:function(t){this.showPayment=t},rechargeEv:function(t){2==t&&(window.location.href="http://zjlist0226.oicp.io:29037/a/pay/MobilePay?price=0.05")},upData:function(){var t=this;if(!Object(l.a)("userInfo"))return this.$vux.toast.text("请先登录!"),this.$router.push("/user/login");1==Object(l.a)("userInfo").realName?this.showPayment=!0:i.a.confirm("请先进行实名认证，为您更好的提供救援帮助").then(function(e){t.$router.push("/user/personal/verified")})},vip:function(t){t&&1==t&&(this.userInfo.vipType=t,Object(l.e)("userInfo",this.userInfo))}},mounted:function(){var t=this;this.userInfo=Object(l.a)("userInfo"),this.userInfo?1==this.userInfo.vipType&&(this.isShow=!1):this.isShow=!0,Object(o.M)().then(function(e){t.jyId=e.rows[0].id,t.cont=e.rows[0].content,t.price=e.rows[0].price})}}),v={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Rescue"},[t._m(0),t._v(" "),n("div",{staticClass:"conText"},[n("div",{staticClass:"title"},[t._v("救援卡使用说明")]),t._v(" "),t._l(t.cont,function(e){return n("dl",[n("dt",[t._v(t._s(e.title))]),t._v(" "),n("dd",[t._v(t._s(e.content))])])})],2),t._v(" "),t.isShow?n("div",{staticClass:"bottomBtn"},[n("span",[t._v("价格：￥"+t._s(t.price))]),t._v(" "),n("input",{attrs:{type:"button",value:"立即购买>"},on:{click:t.upData}})]):n("div",{staticClass:"bottomBtn"},[n("button",{staticClass:"button"},[t._v("已购买")])]),t._v(" "),t.showPayment?n("pop-payment",{attrs:{rescueId:t.jyId},on:{input:t.paymentHide},model:{value:t.showPayment,callback:function(e){t.showPayment=e},expression:"showPayment"}}):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"topImg"},[e("img",{attrs:{src:"https://wx4.sinaimg.cn/mw690/0062fb6Qly1fqoy9sxat2j309j0630w7.jpg",alt:""}})])}]};var f=n("C7Lr")(p,v,!1,function(t){n("jC1q")},"data-v-21d5c728",null);e.default=f.exports},jC1q:function(t,e){},ygXg:function(t,e){}});