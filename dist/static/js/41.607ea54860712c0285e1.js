webpackJsonp([41],{"5fyK":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i,a,o=n("3cXf"),s=n.n(o),r=n("rVsN"),c=n.n(r),l=(n("eyOy"),n("K2f2")),d=(n("yclV"),null),u=null,p=null;window.initialize=function(){u=a.$store.state.geographicLocation.Longitude,p=a.$store.state.geographicLocation.Latitude;var e,t=new BMap.Point(u,p);(i=new BMap.Map("map")).centerAndZoom(t,14),i.enableScrollWheelZoom(!0),e=a,new c.a(function(e){var t={lng:u,lat:p};i.setCenter(t),e({lng:t.lng,lat:t.lat})}).then(function(t){if("home"==d)!function(e,t,n){var i=new BMap.Point(n.lng,n.lat),a=new BMap.Marker(i);t.addOverlay(a),(new BMap.Geocoder).getLocation(i,function(t){t=t.addressComponents.district,e.$store.dispatch("setDistrict",t)}),Object(l.r)().then(function(e){e=e.rows,sessionStorage.setRescue=s()(e),e instanceof Array&&e.forEach(function(e){var n=parseFloat(e.longitude),i=parseFloat(e.dimensions),a=new BMap.Point(n,i);!function(e,t){var n=new BMap.Marker(e);t.addOverlay(n)}(a,t)})})}(e,i,t),r=i,(c=new BMap.Autocomplete({input:"suggestId",location:r})).addEventListener("onhighlight",function(e){var t=e.fromitem.value;e.fromitem.index>-1&&(t.province,t.city,t.district,t.street,t.business),e.fromitem.index,e.toitem.index>-1&&((t=e.toitem.value).province,t.city,t.district,t.street,t.business),e.toitem.index}),c.addEventListener("onconfirm",function(e){var t=e.item.value;!function(e){r.clearOverlays();var t=new BMap.LocalSearch(r,{onSearchComplete:function(){var e=t.getResults().getPoi(0).point;r.centerAndZoom(e,18),r.addOverlay(new BMap.Marker(e))}});t.search(e)}(t.province+t.city+t.district+t.street+t.business)});else if("rescue"==d){var n=new BMap.Point(t.lng,t.lat),a=new BMap.Point(sessionStorage.lngLat.split(",")[1],sessionStorage.lngLat.split(",")[0]),o=new BMap.DrivingRoute(i,{renderOptions:{map:i,autoViewport:!0}});o.search(n,a)}var r,c}).catch(function(e){console.log(e)}),i.setMapStyle({styleJson:[{featureType:"railway",elementType:"all",stylers:{color:"#ffffff08"}}]})};var f=function(e){e=e.split(","),i.panTo(new BMap.Point(e[0],e[1]))};var m=function(e,t){a=t,d=e;for(var n="https://api.map.baidu.com/api?v=2.0&ak=FdnveqDZGzZHbnx08vngQUBH4BNkzi3C&callback=initialize",i=document.getElementsByTagName("script"),o=0;o<i.length;o++){if(i[o].getAttribute("src")==n)return initialize(),!1}var s=document.createElement("script");s.src=n,document.body.appendChild(s);var r=document.createElement("script");r.src="https://developer.baidu.com/map/jsdemo/demo/convertor.js",document.body.appendChild(r)};var v={data:function(){return{height:"270px",enter:-1!==window.location.href.indexOf("home")?"home":"rescue"}},props:["screen","lngLat"],watch:{lngLat:function(e){f(e)},screen:function(e){this.height=!0===e?document.documentElement.offsetHeight+"px":"270px",this.$emit("input",e)}},methods:{sosEv:function(){this.$emit("sos")},downScreen:function(){this.$emit("screen",!1)}},mounted:function(){"rescue"===this.enter&&(this.height=document.documentElement.offsetHeight+"px"),m(this.enter,this)}},h={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mapp",class:{screen:!0===e.screen},style:{height:e.height}},[n("div",{attrs:{id:"map"}}),e._v(" "),"home"==e.enter?n("div",{staticClass:"buttonStyle"},[n("div",{staticClass:"style"}),e._v(" "),e.screen?n("div",{staticClass:"btn"},[n("div",{staticClass:"menuTiao",on:{click:e.downScreen}},[n("p")]),e._v(" "),n("input",{staticClass:"sos",attrs:{type:"button",value:"一键呼救"},on:{click:e.sosEv}})]):e._e()]):e._e()])},staticRenderFns:[]};var g=n("C7Lr")(v,h,!1,function(e){n("KK+O")},"data-v-9dfa2dd2",null);t.default=g.exports},"KK+O":function(e,t){}});