webpackJsonp([26],{EV1k:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o=t("4YfN"),a=t.n(o),r=t("K2f2"),n=t("9rMa"),i=t("yclV"),c=(a()({},Object(n.mapState)(["userInfo","homeUrl"]),{disabled:function(){return!!this.username&&!!this.password}}),a()({},Object(n.mapActions)(["setUserInfo"]),{loginEv:function(){var e=this;Object(r.D)(this.username,this.password,!0).then(function(s){e.$vux.toast.text(s.msg),2==s.code&&(s=s.rows,e.setUserInfo(s),3==e.userInfo.userType?e.$router.replace(e.homeUrl):e.$router.replace("/rescue/task"))})}}),{data:function(){return{isLook:!1,username:"",password:""}},computed:a()({},Object(n.mapState)(["userInfo","homeUrl"]),{disabled:function(){return!!this.username&&!!this.password}}),created:function(){i.e.call(this)&&this.$router.go(1)},methods:a()({},Object(n.mapActions)(["setUserInfo"]),{loginEv:function(){var e=this;Object(r.D)(this.username,this.password,!0).then(function(s){e.$vux.toast.text(s.msg),2==s.code&&(s=s.rows,e.setUserInfo(s),3==e.userInfo.userType?e.$router.replace(e.homeUrl):e.$router.replace("/rescue/task"))})}})}),l={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"login"},[e._m(0),e._v(" "),t("form",{staticClass:"form",on:{submit:function(s){return s.preventDefault(),e.loginEv(s)}}},[t("label",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{type:"text",placeholder:"请输入手机号/天机卡号",name:"username"},domProps:{value:e.username},on:{input:function(s){s.target.composing||(e.username=s.target.value)}}})]),e._v(" "),t("label",["checkbox"==(e.isLook?"text":"password")?t("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{name:"password",placeholder:"请输入登录密码",type:"checkbox"},domProps:{checked:Array.isArray(e.password)?e._i(e.password,null)>-1:e.password},on:{change:function(s){var t=e.password,o=s.target,a=!!o.checked;if(Array.isArray(t)){var r=e._i(t,null);o.checked?r<0&&(e.password=t.concat([null])):r>-1&&(e.password=t.slice(0,r).concat(t.slice(r+1)))}else e.password=a}}}):"radio"==(e.isLook?"text":"password")?t("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{name:"password",placeholder:"请输入登录密码",type:"radio"},domProps:{checked:e._q(e.password,null)},on:{change:function(s){e.password=null}}}):t("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{name:"password",placeholder:"请输入登录密码",type:e.isLook?"text":"password"},domProps:{value:e.password},on:{input:function(s){s.target.composing||(e.password=s.target.value)}}}),e._v(" "),t("i",{directives:[{name:"show",rawName:"v-show",value:!e.isLook,expression:"!isLook"}],staticClass:"iconfont icon-Close",on:{click:function(s){e.isLook=!e.isLook}}}),e._v(" "),t("i",{directives:[{name:"show",rawName:"v-show",value:e.isLook,expression:"isLook"}],staticClass:"iconfont icon-yanjing",on:{click:function(s){e.isLook=!e.isLook}}})]),e._v(" "),t("div",{staticClass:"btn"},[t("router-link",{attrs:{to:"/user/newUser"}},[e._v("新用户注册")]),e._v(" "),t("router-link",{attrs:{to:"/user/forgetPass"}},[e._v("忘记密码？")])],1),e._v(" "),t("input",{staticClass:"submit",class:{active:e.disabled},attrs:{type:"submit",disabled:!e.disabled,value:"登录"}})])])},staticRenderFns:[function(){var e=this.$createElement,s=this._self._c||e;return s("div",{staticClass:"logo"},[s("img",{attrs:{src:"",alt:""}})])}]};var u=t("C7Lr")(c,l,!1,function(e){t("yaU7")},"data-v-682bf6a9",null);s.default=u.exports},yaU7:function(e,s){}});