webpackJsonp([39],{EV1k:function(e,s,o){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var t=o("4YfN"),r=o.n(t),a=o("K2f2"),n=o("9rMa"),i=o("yclV"),c=(r()({},Object(n.c)(["userInfo","homeUrl"]),{disabled:function(){return!!this.username&&!!this.password}}),r()({},Object(n.b)(["setUserInfo"]),{loginEv:function(){var e=this;Object(a.C)(this.username,this.password,!0).then(function(s){e.$vux.toast.text(s.msg),2==s.code&&(s=s.rows,e.setUserInfo(s),3==e.userInfo.userType?e.$router.push(e.homeUrl):e.$router.push("/rescue/task"))})}}),{data:function(){return{isLook:!1,username:"",password:""}},computed:r()({},Object(n.c)(["userInfo","homeUrl"]),{disabled:function(){return!!this.username&&!!this.password}}),created:function(){i.e.call(this)&&this.$router.go(1)},methods:r()({},Object(n.b)(["setUserInfo"]),{loginEv:function(){var e=this;Object(a.C)(this.username,this.password,!0).then(function(s){e.$vux.toast.text(s.msg),2==s.code&&(s=s.rows,e.setUserInfo(s),3==e.userInfo.userType?e.$router.push(e.homeUrl):e.$router.push("/rescue/task"))})}})}),u={render:function(){var e=this,s=e.$createElement,o=e._self._c||s;return o("div",{staticClass:"login"},[e._m(0),e._v(" "),o("form",{staticClass:"form",on:{submit:function(s){return s.preventDefault(),e.loginEv(s)}}},[o("label",[o("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{type:"text",placeholder:"请输入手机号/天机卡号",name:"username"},domProps:{value:e.username},on:{input:function(s){s.target.composing||(e.username=s.target.value)}}})]),e._v(" "),o("label",["checkbox"==(e.isLook?"text":"password")?o("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{name:"password",placeholder:"请输入登录密码",type:"checkbox"},domProps:{checked:Array.isArray(e.password)?e._i(e.password,null)>-1:e.password},on:{change:function(s){var o=e.password,t=s.target,r=!!t.checked;if(Array.isArray(o)){var a=e._i(o,null);t.checked?a<0&&(e.password=o.concat([null])):a>-1&&(e.password=o.slice(0,a).concat(o.slice(a+1)))}else e.password=r}}}):"radio"==(e.isLook?"text":"password")?o("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{name:"password",placeholder:"请输入登录密码",type:"radio"},domProps:{checked:e._q(e.password,null)},on:{change:function(s){e.password=null}}}):o("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{name:"password",placeholder:"请输入登录密码",type:e.isLook?"text":"password"},domProps:{value:e.password},on:{input:function(s){s.target.composing||(e.password=s.target.value)}}}),e._v(" "),o("i",{directives:[{name:"show",rawName:"v-show",value:!e.isLook,expression:"!isLook"}],staticClass:"iconfont icon-Close",on:{click:function(s){e.isLook=!e.isLook}}}),e._v(" "),o("i",{directives:[{name:"show",rawName:"v-show",value:e.isLook,expression:"isLook"}],staticClass:"iconfont icon-yanjing",on:{click:function(s){e.isLook=!e.isLook}}})]),e._v(" "),o("div",{staticClass:"btn"},[o("router-link",{attrs:{to:"/user/newUser"}},[e._v("新用户注册")]),e._v(" "),o("router-link",{attrs:{to:"/user/forgetPass"}},[e._v("忘记密码？")])],1),e._v(" "),o("input",{staticClass:"submit",class:{active:e.disabled},attrs:{type:"submit",disabled:!e.disabled,value:"登录"}})])])},staticRenderFns:[function(){var e=this.$createElement,s=this._self._c||e;return s("div",{staticClass:"logo"},[s("img",{attrs:{src:"",alt:""}})])}]};var l=o("C7Lr")(c,u,!1,function(e){o("K1mo")},"data-v-117e151d",null);s.default=l.exports},K1mo:function(e,s){}});