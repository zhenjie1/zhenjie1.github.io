webpackJsonp([19],{"5fyK":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i,o=n("3cXf"),a=n.n(o),s=n("rVsN"),r=n.n(s),c=n("eyOy"),l=n("K2f2"),u="http://zj.tianjistar.com/icon/daohang.png",d=null,p=null,f=null;window.initialize=function(){Object(c.a)().then(function(e){p=e.Longitude,f=e.Latitude;var t=new BMap.Point(p,f);function n(e){0===e.status&&new r.a(function(t,n){i.setCenter(e.points[0]),t({lng:e.points[0].lng,lat:e.points[0].lat})}).then(function(e){if("home"==d)!function(e,t){var n=new BMap.Point(t.lng,t.lat),i=new BMap.Icon(u,new BMap.Size(30,30)),o=new BMap.Marker(n,{icon:i});e.addOverlay(o),(new BMap.Geocoder).getLocation(n,function(e){e=e.addressComponents.district,sessionStorage.district=e}),Object(l.r)().then(function(t){t=t.rows,sessionStorage.setRescue=a()(t);t instanceof Array&&t.forEach(function(t){var n=parseFloat(t.longitude),i=parseFloat(t.dimensions),o=new BMap.Point(n,i);!function(e,t){var n=new BMap.Marker(e);t.addOverlay(n)}(o,e)})})}(i,e),function(e){var t=new BMap.Autocomplete({input:"suggestId",location:e});t.addEventListener("onhighlight",function(e){var t=e.fromitem.value,n="";e.fromitem.index>-1&&(n=t.province+t.city+t.district+t.street+t.business),e.fromitem.index,e.toitem.index>-1&&(t=e.toitem.value,n=t.province+t.city+t.district+t.street+t.business),e.toitem.index}),t.addEventListener("onconfirm",function(t){var n=t.item.value;!function(t){e.clearOverlays();var n=new BMap.LocalSearch(e,{onSearchComplete:function(){var t=n.getResults().getPoi(0).point;e.centerAndZoom(t,18),e.addOverlay(new BMap.Marker(t))}});n.search(t)}(n.province+n.city+n.district+n.street+n.business)})}(i);else if("rescue"==d){var t=new BMap.Point(e.lng,e.lat),n=sessionStorage.lngLat.split(",")[1],o=sessionStorage.lngLat.split(",")[0],s=new BMap.Point(n,o);new BMap.DrivingRoute(i,{renderOptions:{map:i,autoViewport:!0}}).search(t,s)}}).catch(function(e){console.log(e)})}(i=new BMap.Map("map")).centerAndZoom(t,14),i.enableScrollWheelZoom(!0),i.addEventListener("touchstart",function(){document.getElementById("suggestId").blur()}),setTimeout(function(){var e=new BMap.Convertor,i=[];i.push(t),e.translate(i,1,5,n)},0),i.setMapStyle({styleJson:[{featureType:"railway",elementType:"all",stylers:{color:"#ffffff08"}}]})})};var m=function(e){e=e.split(","),i.panTo(new BMap.Point(e[0],e[1]))};var v=function(e){d=e;for(var t="https://api.map.baidu.com/api?v=2.0&ak=FdnveqDZGzZHbnx08vngQUBH4BNkzi3C&callback=initialize",n=document.getElementsByTagName("script"),i=0;i<n.length;i++){if(n[i].getAttribute("src")==t)return initialize(),!1}var o=document.createElement("script");o.src=t,document.body.appendChild(o);var a=document.createElement("script");a.src="https://developer.baidu.com/map/jsdemo/demo/convertor.js",document.body.appendChild(a)};var h={data:function(){return{height:"270px",enter:-1!==window.location.href.indexOf("home")?"home":"rescue"}},props:["screen","lngLat"],watch:{lngLat:function(e){m(e)},screen:function(e){this.height=!0===e?document.documentElement.offsetHeight+"px":"270px",this.$emit("input",e)}},methods:{sosEv:function(){console.log(123),this.$emit("sos")},downScreen:function(){this.screen=!1,this.$emit("screen",!1)}},mounted:function(){"rescue"===this.enter&&(this.height=document.documentElement.offsetHeight+"px"),v(this.enter)}},g={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mapp",class:{screen:!0===e.screen},style:{height:e.height}},[n("div",{attrs:{id:"map"}}),e._v(" "),"home"==e.enter?n("div",{staticClass:"buttonStyle"},[n("div",{staticClass:"style"}),e._v(" "),e.screen?n("div",{staticClass:"btn"},[n("div",{staticClass:"menuTiao",on:{click:e.downScreen}},[n("p")]),e._v(" "),n("input",{staticClass:"sos",attrs:{type:"button",value:"一键呼救"},on:{click:e.sosEv}})]):e._e()]):e._e()])},staticRenderFns:[]};var w=n("C7Lr")(h,g,!1,function(e){n("BpgP")},"data-v-d2e079b0",null);t.default=w.exports},BpgP:function(e,t){}});