webpackJsonp([8],{"8dyY":function(t,e){},SY0N:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("p2yL"),a=s("K2f2"),i={data:function(){return{text:"",newPass:"",confirmPass:"",btnVal:"完成注册"}},props:["phoneStr","codeStr","token"],computed:{disabled:function(){return!!this.newPass&&!!this.confirmPass},phoneHide:function(){return this.phoneStr.substr(0,3)+"****"+this.phoneStr.substr(7,4)}},mounted:function(){var t=this.$route.params.status;1==t?(this.text="支付",document.title="忘记支付密码"):2==t?(this.text="新",document.title="忘记登录密码"):void 0==t&&(this.text="登录"),void 0!==this.$route.params.phone&&(this.btnVal="确认修改")},methods:{registered:function(){var t=this,e=this.$route.params.status;if(this.newPass!==this.confirmPass)return alert("两次密码不一致！"),!1;1==e?Object(a.P)(this.token,this.newPass).then(function(e){alert("修改成功"),t.$router.push("/user/personal")}):Object(a.J)(this.phoneStr,this.newPass,this.codeStr).then(function(e){alert(e.msg),2==e.code&&t.$router.push("/user/login")})}}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"newUser"},[s("div",{staticClass:"topTit"},[s("h1",[t._v("设置密码")]),t._v(" "),s("p",[t._v("请为 "),s("span",[t._v(t._s(t.phoneHide))]),t._v(" 账号设置"+t._s(t.text)+"密码")])]),t._v(" "),s("div",{staticClass:"con"},[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newPass,expression:"newPass"}],attrs:{type:"password",placeholder:"新密码"},domProps:{value:t.newPass},on:{input:function(e){e.target.composing||(t.newPass=e.target.value)}}})]),t._v(" "),s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.confirmPass,expression:"confirmPass"}],attrs:{type:"password",placeholder:"确认新密码"},domProps:{value:t.confirmPass},on:{input:function(e){e.target.composing||(t.confirmPass=e.target.value)}}})]),t._v(" "),s("input",{staticClass:"submit",class:{active:t.disabled},attrs:{type:"button",value:t.btnVal,disabled:!t.disabled},on:{click:t.registered}})])])},staticRenderFns:[]};var r=s("C7Lr")(i,o,!1,function(t){s("YA6R")},"data-v-46f58a61",null).exports,c=(n.a,{data:function(){return{phone:"",childIndex:0,code:"",token:""}},components:{MyCode:n.a,Pass:r},mounted:function(){void 0!==this.$route.params.status&&(this.childIndex=this.$route.params.status),void 0!==this.$route.params.phone&&(this.phone=this.$route.params.phone,this.code=this.$route.params.code,this.token=this.$route.params.token,this.isReg=!1)},methods:{reloadPass:function(t){var e=this;Object(a.i)(t).then(function(s){2!=s.code?alert(s.msg):(e.code=t,e.childIndex=2)})},next:function(){var t=this;Object(a.H)(this.phone).then(function(e){e&&2==e.code&&(t.childIndex=1)})}}}),u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"newUser"},[t._m(0),t._v(" "),s("div",{staticClass:"con"},[s("p",[t._v("手机号码")]),t._v(" "),s("label",[s("span",[t._v("+86")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],attrs:{type:"text",placeholder:"请您输入手机号"},domProps:{value:t.phone},on:{input:function(e){e.target.composing||(t.phone=e.target.value)}}})]),t._v(" "),s("input",{staticClass:"submit",class:{active:""!=t.phone},attrs:{type:"button",value:"下一步",disabled:""==t.phone},on:{click:t.next}})]),t._v(" "),s("div",{staticClass:"prompt"},[s("p",[t._v("点击【下一步】即表示您同意协议：")]),t._v(" "),s("router-link",{attrs:{to:"/user/agree/0"}},[t._v("《服务协议》")])],1),t._v(" "),s("transition",{attrs:{name:"breadcrumb"}},[1==t.childIndex?s("my-code",{attrs:{phoneStr:t.phone},on:{pass:t.reloadPass}}):t._e(),t._v(" "),2==t.childIndex?s("pass",{attrs:{phoneStr:t.phone,codeStr:t.code,token:t.token}}):t._e()],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"topTit"},[e("h1",[this._v("新用户注册")])])}]};var d=s("C7Lr")(c,u,!1,function(t){s("UEDH")},null,null);e.default=d.exports},UEDH:function(t,e){},YA6R:function(t,e){},p2yL:function(t,e,s){"use strict";var n={data:function(){return{code:"",time:59}},props:["phoneStr"],mounted:function(){this.codeNum(!1)},methods:{codeWatch:function(){this.code.length>=6&&this.$emit("pass",this.code.toString())},codeNum:function(t){var e=this;t&&this.time--;var s=setInterval(function(){e.time<=0?(e.time=60,clearInterval(s)):e.time--},1e3)}}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"newUser"},[s("div",{staticClass:"topTit"},[s("h1",[t._v("请输入验证码")]),t._v(" "),s("p",[t._v("验证码已发送至手机："),s("span",[t._v("+86 "+t._s(t.phoneStr))])])]),t._v(" "),s("div",{staticClass:"con"},[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],attrs:{type:"text",placeholder:"请您输入验证码"},domProps:{value:t.code},on:{keyup:t.codeWatch,input:function(e){e.target.composing||(t.code=e.target.value)}}})]),t._v(" "),s("p",{directives:[{name:"show",rawName:"v-show",value:60!=t.time,expression:"time != 60"}]},[t._v("00:"+t._s(t.time)+" 秒后重发验证码")]),t._v(" "),s("p",{directives:[{name:"show",rawName:"v-show",value:60==t.time,expression:"time == 60"}],on:{click:function(e){t.codeNum(!0)}}},[t._v("重新发送")])])])},staticRenderFns:[]};var i=s("C7Lr")(n,a,!1,function(t){s("8dyY")},"data-v-5534e978",null);e.a=i.exports}});