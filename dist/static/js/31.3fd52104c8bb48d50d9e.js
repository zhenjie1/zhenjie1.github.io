webpackJsonp([31],{tqxn:function(e,t){},xTtc:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("K2f2"),a={data:function(){return{name:"",doc:"",phone:""}},computed:{meets:function(){var e=[this.name,this.doc,this.phone];return""!==e[0]&&""!==e[1]&&e[2].length,!0}},methods:{submit:function(){var e=this;Object(o._0)(this.name,this.doc,this.phone).then(function(t){if(t&&2==t.code){var n=t.rows.token;Object(o.H)(e.phone).then(function(t){t&&2==t.code&&e.$router.push("/user/newUser/1/"+e.phone+"/"+n)})}})}}},s={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"forget"},[n("h3",[e._v("请填写相关信息")]),e._v(" "),n("ul",{staticClass:"ulCon"},[n("li",[n("p",[e._v("姓名")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],attrs:{type:"text",placeholder:"输入完整的姓名"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})]),e._v(" "),e._m(0),e._v(" "),n("li",[n("p",[e._v("证件号")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.doc,expression:"doc"}],attrs:{type:"text",placeholder:"请输入证件号"},domProps:{value:e.doc},on:{input:function(t){t.target.composing||(e.doc=t.target.value)}}})])]),e._v(" "),n("ul",{staticClass:"ulCon"},[n("li",[n("p",[e._v("手机号")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],attrs:{type:"number",maxlength:"11",placeholder:"请输入银行预留手机号"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}})])]),e._v(" "),n("input",{staticClass:"submit",attrs:{type:"button",disabled:!e.meets,value:"下一步"},on:{click:e.submit}})])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("li",[t("p",[this._v("证件类型")]),this._v(" "),t("b",[this._v("身份证")])])}]};var i=n("C7Lr")(a,s,!1,function(e){n("tqxn")},"data-v-16211175",null);t.default=i.exports}});