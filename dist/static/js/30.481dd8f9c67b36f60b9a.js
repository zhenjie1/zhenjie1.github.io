webpackJsonp([30],{b7md:function(t,e){},vup0:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("K2f2"),s={data:function(){return{checkIndex:0,inputTxt:"",paypsaa:"",repeatTxt:"",titleTxt:["请输入支付密码，验证身份","请设置天佑支付密码，用于支付验证","请再次填写确认天佑支付密码"],btnTxt:["下一步","下一步","确认修改"]}},methods:{ok:function(){var t=this,e=this.checkIndex;0==e?this.inputTxt&&Object(a.U)(this.inputTxt).then(function(e){e&&2==e.code&&(t.checkIndex=1,t.paypsaa=t.inputTxt,t.inputTxt="")}):1==e?this.inputTxt.length>=6?this.checkIndex=2:this.$vux.toast.text("支付密码最少 6 位！"):2==e&&(this.inputTxt===this.repeatTxt?Object(a.E)(this.inputTxt,this.repeatTxt).then(function(e){2==e.code&&(t.$vux.toast.text("修改支付密码成功！"),t.$router.push("/user/personal"))}):this.$vux.toast.text("两次输入的密码不一致！"))}}},i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"verification"},[n("h4",[t._v(t._s(t.titleTxt[t.checkIndex]))]),t._v(" "),n("input",{directives:[{name:"show",rawName:"v-show",value:2!=t.checkIndex,expression:"checkIndex != 2"},{name:"model",rawName:"v-model",value:t.inputTxt,expression:"inputTxt"}],staticClass:"text t1",attrs:{type:"password"},domProps:{value:t.inputTxt},on:{input:function(e){e.target.composing||(t.inputTxt=e.target.value)}}}),t._v(" "),n("input",{directives:[{name:"show",rawName:"v-show",value:2==t.checkIndex,expression:"checkIndex == 2"},{name:"model",rawName:"v-model",value:t.repeatTxt,expression:"repeatTxt"}],staticClass:"text t2",attrs:{type:"password"},domProps:{value:t.repeatTxt},on:{input:function(e){e.target.composing||(t.repeatTxt=e.target.value)}}}),t._v(" "),n("input",{staticClass:"button",attrs:{type:"button",value:t.btnTxt[t.checkIndex]},on:{click:t.ok}})])},staticRenderFns:[]};var o=n("C7Lr")(s,i,!1,function(t){n("b7md")},"data-v-b0220540",null);e.default=o.exports}});