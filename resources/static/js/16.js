webpackJsonp([16],{RY7D:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("K2f2"),s={data:function(){return{phone:"",code:"",codeTxt:"验证码",num:60,codeIsSend:!1}},computed:{isSubmit:function(){return this.phone.length>=11&&this.code.length>=6}},methods:{sendCode:function(){var e=this,t=this;this.codeIsSend=!0,Object(o.t)(this.phone).then(function(n){if(2==n.code){t.codeTxt=t.num+"s 重发";var o=setInterval(function(){t.num--,t.codeTxt=t.num+"s 重发",t.num<=0&&(clearInterval(o),t.codeTxt="再次获取")},1e3)}else alert(n.msg),e.codeIsSend=!1;console.log(n)})},next:function(){var e=this;Object(o.d)(this.code).then(function(t){t&&2==t.code&&e.$router.push("/user/newUser/2/"+e.phone+"/"+e.code)})}}},i={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"newUser"},[e._m(0),e._v(" "),n("div",{staticClass:"con"},[n("p",[e._v("天佑账号")]),e._v(" "),n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],attrs:{type:"number",placeholder:"请您输入手机号",oninput:"if(value.length>11)value=value.slice(0,11)"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}})]),e._v(" "),n("p",[e._v("验证码")]),e._v(" "),n("div",{staticClass:"label"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],attrs:{type:"text",placeholder:"请您输入验证码"},domProps:{value:e.code},on:{input:function(t){t.target.composing||(e.code=t.target.value)}}}),e._v(" "),n("input",{staticClass:"code",attrs:{type:"button",disabled:e.phone.length<11||e.codeIsSend,value:e.codeTxt},on:{click:function(t){e.sendCode()}}})]),e._v(" "),n("input",{staticClass:"submit",class:{active:e.isSubmit},attrs:{type:"button",value:"确定",disabled:!e.isSubmit},on:{click:e.next}})])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"topTit"},[t("h4",[this._v("忘记登录密码？")]),this._v(" "),t("h1",[this._v("请输入要找回的天佑账号")])])}]};var c=n("vSla")(s,i,!1,function(e){n("hWIE")},null,null);t.default=c.exports},hWIE:function(e,t){}});