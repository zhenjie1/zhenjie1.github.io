webpackJsonp([39],{Kepi:function(t,s){},"a6d/":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});e("K2f2");var i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"personal"},[e("div",{staticClass:"info"},[e("img",{staticClass:"avatar",attrs:{src:t.userInfo.photo,alt:""}}),t._v(" "),e("div",{staticClass:"center"},[e("h3",[t._v("昵称："+t._s(t.userInfo.name))])])]),t._v(" "),e("ul",{staticClass:"options"},[e("li",[t._m(0),t._v(" "),e("div",{staticClass:"r"},[t._v(t._s(t.userInfo.birthday))])]),t._v(" "),e("li",[t._m(1),t._v(" "),e("div",{staticClass:"r"},[t._v(t._s(t.userInfo.mobile))])]),t._v(" "),e("li",[t._m(2),t._v(" "),e("div",{staticClass:"r"},[t._v(t._s(t.userInfo.goodAt))])]),t._v(" "),e("li",[t._m(3),t._v(" "),e("div",{staticClass:"r"},[t._v(t._s(t.userInfo.idNumber))])])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"l"},[s("span",[this._v("生日")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"l"},[s("span",[this._v("联系方式")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"l"},[s("span",[this._v("擅长")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"l"},[s("span",[this._v("实名认证")])])}]};var a=e("C7Lr")({name:"playInfo",data:function(){return{userInfo:""}},methods:{getData:function(){if(this.userInfo=this.$route.query,this.userInfo.idNumber){var t=this.userInfo.idNumber;this.userInfo.idNumber=t.substring(0,6)+"********"+t.substring(13,18)}}},created:function(){this.getData()},watch:{$route:"getData"}},i,!1,function(t){e("Kepi")},"data-v-95e56688",null);s.default=a.exports}});