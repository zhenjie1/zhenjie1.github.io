webpackJsonp([25],{"8a55":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("K2f2"),n={data:function(){return{data:[],textLen:0}},computed:{},mounted:function(){var t=this;Object(s.d)(this.$route.params.id).then(function(a){t.data=a.rows})},methods:{}},i={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"articlePan"},[e("div",{staticClass:"title"},[e("h1",[t._v(t._s(t.data.title))]),t._v(" "),e("p",[e("span",{staticClass:"label"},[t._v(t._s(t._f("Rescue")(t.data.rangeId)))]),t._v(" "),e("span",{staticClass:"time"},[t._v(t._s(t.data.createDate))])])]),t._v(" "),e("div",{staticClass:"time"}),t._v(" "),e("div",{staticClass:"cont",domProps:{innerHTML:t._s(t.data.content)}})])},staticRenderFns:[]};var c=e("C7Lr")(n,i,!1,function(t){e("eRfa")},null,null);a.default=c.exports},eRfa:function(t,a){}});