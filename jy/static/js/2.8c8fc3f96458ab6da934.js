webpackJsonp([2,22],{"2bfE":function(t,e,n){"use strict";var i=n("4YfN"),s=n.n(i),o=n("bBgq"),r=n.n(o),a=(n("K2f2"),n("9rMa")),c=(s()({},Object(a.c)(["geographicLocation","homeUrl","userInfo"])),{props:["checkIndex"],data:function(){return{start:0,isMenuShow:!1}},computed:s()({},Object(a.c)(["geographicLocation","homeUrl","userInfo"])),methods:{sosOrdersEv:function(){console.log(this.userInfo)},scrollEv:function(t){var e=Math.floor(t.targetTouches[0].clientY);e>this.start+10?this.isMenuShow=!1:e+10<this.start&&(this.isMenuShow=!0),this.start=e}},mounted:function(){window.addEventListener("touchstart",function(t){this.start=Math.floor(t.targetTouches[0].clientY)}),window.addEventListener("touchmove",r()(this.scrollEv,20,{leading:!0,trailing:!1}))}}),u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"menuBottom",class:{menuBottomHide:t.isMenuShow}},[n("ul",[n("router-link",{class:{checked:"1"==t.checkIndex},attrs:{to:t.homeUrl,tag:"li"}},[n("div",{staticClass:"icon"},[n("i",{staticClass:"iconfont icon-home"})]),t._v(" "),n("p",[t._v("首页")])]),t._v(" "),n("li",{staticClass:"middle",on:{click:t.sosOrdersEv}},[t._m(0),t._v(" "),n("p",[t._v("一键呼救")])]),t._v(" "),n("router-link",{class:{checked:"2"==t.checkIndex},attrs:{to:"/user/personal",tag:"li"}},[n("div",{staticClass:"icon"},[n("i",{staticClass:"iconfont icon-wode1"})]),t._v(" "),n("p",[t._v("个人")])])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"icon"},[e("i",{staticClass:"iconfont icon-dianhua"})])}]};var l=n("C7Lr")(c,u,!1,function(t){n("lbwy")},"data-v-0163f95a",null);e.a=l.exports},"5fyK":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,s,o=n("3cXf"),r=n.n(o),a=n("rVsN"),c=n.n(a),u=n("eyOy"),l=n("K2f2"),h="http://zj.tianjistar.com/icon/daohang.png",d=null,f=null,v=null;window.initialize=function(){Object(u.a)(s).then(function(t){f=t.Longitude,v=t.Latitude;var e=new BMap.Point(f,v);(i=new BMap.Map("map")).centerAndZoom(e,14),i.enableScrollWheelZoom(!0),i.addEventListener("touchstart",function(){document.getElementById("suggestId").blur()}),new c.a(function(t){var e={lng:f,lat:v};i.setCenter(e),t({lng:e.lng,lat:e.lat})}).then(function(t){if("home"==d)!function(t,e){var n=new BMap.Point(e.lng,e.lat),i=new BMap.Icon(h,new BMap.Size(30,30)),s=new BMap.Marker(n,{icon:i});t.addOverlay(s),(new BMap.Geocoder).getLocation(n,function(t){t=t.addressComponents.district,sessionStorage.district=t}),Object(l.r)().then(function(e){e=e.rows,sessionStorage.setRescue=r()(e),e instanceof Array&&e.forEach(function(e){var n=parseFloat(e.longitude),i=parseFloat(e.dimensions),s=new BMap.Point(n,i);!function(t,e){var n=new BMap.Marker(t);e.addOverlay(n)}(s,t)})})}(i,t),c=i,(u=new BMap.Autocomplete({input:"suggestId",location:c})).addEventListener("onhighlight",function(t){var e=t.fromitem.value;t.fromitem.index>-1&&(e.province,e.city,e.district,e.street,e.business),t.fromitem.index,t.toitem.index>-1&&((e=t.toitem.value).province,e.city,e.district,e.street,e.business),t.toitem.index}),u.addEventListener("onconfirm",function(t){var e=t.item.value;!function(t){c.clearOverlays();var e=new BMap.LocalSearch(c,{onSearchComplete:function(){var t=e.getResults().getPoi(0).point;c.centerAndZoom(t,18),c.addOverlay(new BMap.Marker(t))}});e.search(t)}(e.province+e.city+e.district+e.street+e.business)});else if("rescue"==d){var e=new BMap.Point(t.lng,t.lat),n=sessionStorage.lngLat.split(",")[1],s=sessionStorage.lngLat.split(",")[0],o=new BMap.Point(n,s),a=new BMap.DrivingRoute(i,{renderOptions:{map:i,autoViewport:!0}});a.search(e,o)}var c,u}).catch(function(t){console.log(t)}),i.setMapStyle({styleJson:[{featureType:"railway",elementType:"all",stylers:{color:"#ffffff08"}}]})})};var p=function(t){t=t.split(","),i.panTo(new BMap.Point(t[0],t[1]))};var m=function(t,e){s=e,d=t;for(var n="https://api.map.baidu.com/api?v=2.0&ak=FdnveqDZGzZHbnx08vngQUBH4BNkzi3C&callback=initialize",i=document.getElementsByTagName("script"),o=0;o<i.length;o++){if(i[o].getAttribute("src")==n)return initialize(),!1}var r=document.createElement("script");r.src=n,document.body.appendChild(r);var a=document.createElement("script");a.src="https://developer.baidu.com/map/jsdemo/demo/convertor.js",document.body.appendChild(a)};var _={data:function(){return{height:"270px",enter:-1!==window.location.href.indexOf("home")?"home":"rescue"}},props:["screen","lngLat"],watch:{lngLat:function(t){p(t)},screen:function(t){this.height=!0===t?document.documentElement.offsetHeight+"px":"270px",this.$emit("input",t)}},methods:{sosEv:function(){this.$emit("sos")},downScreen:function(){this.$emit("screen",!1)}},mounted:function(){"rescue"===this.enter&&(this.height=document.documentElement.offsetHeight+"px"),m(this.enter,this)}},g={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mapp",class:{screen:!0===t.screen},style:{height:t.height}},[n("div",{attrs:{id:"map"}}),t._v(" "),"home"==t.enter?n("div",{staticClass:"buttonStyle"},[n("div",{staticClass:"style"}),t._v(" "),t.screen?n("div",{staticClass:"btn"},[n("div",{staticClass:"menuTiao",on:{click:t.downScreen}},[n("p")]),t._v(" "),n("input",{staticClass:"sos",attrs:{type:"button",value:"一键呼救"},on:{click:t.sosEv}})]):t._e()]):t._e()])},staticRenderFns:[]};var w=n("C7Lr")(_,g,!1,function(t){n("KK+O")},"data-v-9dfa2dd2",null);e.default=w.exports},AA3o:function(t,e,n){"use strict";e.__esModule=!0,e.default=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},ERHr:function(t,e){},"KK+O":function(t,e){},WAr1:function(t,e){},XZZF:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("4YfN"),s=n.n(i),o=n("9rMa"),r=n("5fyK"),a={render:function(){var t=this.$createElement;return(this._self._c||t)("i",{staticClass:"weui-loading"})},staticRenderFns:[]};var c=n("C7Lr")({name:"inline-loading"},a,!1,function(t){n("ERHr")},null,null).exports,u=n("zG2y"),l=n("K2f2"),h=n("wEVy"),d=(u.a,{name:"sense",data:function(){return{data:[],isShowLoading:!1,pageNum:1,currentView:"sense",total:0}},filters:{time:function(t){return t.substr(0,10)}},mounted:function(){var t=this;Object(h.a)(this),Object(l.j)(this.pageNum,1).then(function(e){t.data=e.rows,t.total=e.total})},components:{BottomLine:u.a,InlineLoading:c}}),f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("ul",{staticClass:"sense"},[t._l(t.data,function(e,i){return n("router-link",{key:i,attrs:{to:"/user/home/article/"+e.id,tag:"li"}},[n("div",{staticClass:"l"},[n("h3",{staticClass:"tit"},[t._v(t._s(e.title))]),t._v(" "),n("div",{staticClass:"tag"},[n("span",[t._v(t._s(t._f("Rescue")(e.rangeId))+" | "+t._s(t._f("time")(e.createDate)))]),t._v(" "),n("b",[t._v(t._s(e.clickhit)+" 人阅读")])])]),t._v(" "),n("div",{staticClass:"r"},[n("img",{attrs:{src:e.titleimg,alt:""}})])])}),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowLoading,expression:"isShowLoading"}],staticClass:"loading"},[n("inline-loading"),n("span",[t._v("加载中")])],1),t._v(" "),n("bottom-line")],2),t._v(" "),n("router-view")],1)},staticRenderFns:[]};var v=n("C7Lr")(d,f,!1,function(t){n("amhY")},"data-v-dc0196b0",null).exports,p=n("3cXf"),m=n.n(p),_=n("AA3o"),g=n.n(_),w=n("xSur"),x=n.n(w),b=n("+Up5"),y=n.n(b),k=function(t){return Array.prototype.slice.call(t)},C=function(){function t(e){if(g()(this,t),this._default={container:".vux-swiper",item:".vux-swiper-item",direction:"vertical",activeClass:"active",threshold:50,duration:300,auto:!1,loop:!1,interval:3e3,height:"auto",minMovingDistance:0},this._options=y()(this._default,e),this._options.height=this._options.height.replace("px",""),this._start={},this._move={},this._end={},this._eventHandlers={},this._prev=this._current=this._goto=0,this._width=this._height=this._distance=0,this._offset=[],this.$box=this._options.container,this.$container=this._options.container.querySelector(".vux-swiper"),this.$items=this.$container.querySelectorAll(this._options.item),this.count=this.$items.length,this.realCount=this.$items.length,this._position=[],this._firstItemIndex=0,this._isMoved=!1,this.count)return this._init(),this._auto(),this._bind(),this._onResize(),this}return x()(t,[{key:"_auto",value:function(){var t=this;t.stop(),t._options.auto&&(t.timer=setTimeout(function(){t.next()},t._options.interval))}},{key:"updateItemWidth",value:function(){this._width=this.$box.offsetWidth||document.documentElement.offsetWidth,this._distance="horizontal"===this._options.direction?this._width:this._height}},{key:"stop",value:function(){this.timer&&clearTimeout(this.timer)}},{key:"_loop",value:function(){return this._options.loop&&this.realCount>=3}},{key:"_onResize",value:function(){var t=this;this.resizeHandler=function(){setTimeout(function(){t.updateItemWidth(),t._setOffset(),t._setTransform()},100)},window.addEventListener("orientationchange",this.resizeHandler,!1)}},{key:"_init",value:function(){this._height="auto"===this._options.height?"auto":this._options.height-0,this.updateItemWidth(),this._initPosition(),this._activate(this._current),this._setOffset(),this._setTransform(),this._loop()&&this._loopRender()}},{key:"_initPosition",value:function(){for(var t=0;t<this.realCount;t++)this._position.push(t)}},{key:"_movePosition",value:function(t){if(t>0){var e=this._position.splice(0,1);this._position.push(e[0])}else if(t<0){var n=this._position.pop();this._position.unshift(n)}}},{key:"_setOffset",value:function(){var t=this,e=t._position.indexOf(t._current);t._offset=[],k(t.$items).forEach(function(n,i){t._offset.push((i-e)*t._distance)})}},{key:"_setTransition",value:function(t){var e="none"===(t=t||this._options.duration||"none")?"none":t+"ms";k(this.$items).forEach(function(t,n){t.style.webkitTransition=e,t.style.transition=e})}},{key:"_setTransform",value:function(t){var e=this;t=t||0,k(e.$items).forEach(function(n,i){var s=e._offset[i]+t,o="translate3d("+s+"px, 0, 0)";"vertical"===e._options.direction&&(o="translate3d(0, "+s+"px, 0)"),n.style.webkitTransform=o,n.style.transform=o,e._isMoved=!0})}},{key:"_bind",value:function(){var t=this,e=this;e.touchstartHandler=function(t){e.stop(),e._start.x=t.changedTouches[0].pageX,e._start.y=t.changedTouches[0].pageY,e._setTransition("none"),e._isMoved=!1},e.touchmoveHandler=function(n){if(1!==e.count){e._move.x=n.changedTouches[0].pageX,e._move.y=n.changedTouches[0].pageY;var i=e._move.x-e._start.x,s=e._move.y-e._start.y,o=s,r=Math.abs(i)>Math.abs(s);"horizontal"===e._options.direction&&r&&(o=i),t._options.loop||t._current!==t.count-1&&0!==t._current||(o/=3),((e._options.minMovingDistance&&Math.abs(o)>=e._options.minMovingDistance||!e._options.minMovingDistance)&&r||e._isMoved)&&e._setTransform(o),r&&n.preventDefault()}},e.touchendHandler=function(t){if(1!==e.count){e._end.x=t.changedTouches[0].pageX,e._end.y=t.changedTouches[0].pageY;var n=e._end.y-e._start.y;"horizontal"===e._options.direction&&(n=e._end.x-e._start.x),0!==(n=e.getDistance(n))&&e._options.minMovingDistance&&Math.abs(n)<e._options.minMovingDistance&&!e._isMoved||(n>e._options.threshold?e.move(-1):n<-e._options.threshold?e.move(1):e.move(0),e._loopRender())}},e.transitionEndHandler=function(t){e._activate(e._current);var n=e._eventHandlers.swiped;n&&n.apply(e,[e._prev%e.count,e._current%e.count]),e._auto(),e._loopRender(),t.preventDefault()},e.$container.addEventListener("touchstart",e.touchstartHandler,!1),e.$container.addEventListener("touchmove",e.touchmoveHandler,!1),e.$container.addEventListener("touchend",e.touchendHandler,!1),e.$items[1]&&e.$items[1].addEventListener("webkitTransitionEnd",e.transitionEndHandler,!1)}},{key:"_loopRender",value:function(){var t=this;t._loop()&&(0===t._offset[t._offset.length-1]?(t.$container.appendChild(t.$items[0]),t._loopEvent(1)):0===t._offset[0]&&(t.$container.insertBefore(t.$items[t.$items.length-1],t.$container.firstChild),t._loopEvent(-1)))}},{key:"_loopEvent",value:function(t){var e=this;e._itemDestoy(),e.$items=e.$container.querySelectorAll(e._options.item),e.$items[1]&&e.$items[1].addEventListener("webkitTransitionEnd",e.transitionEndHandler,!1),e._movePosition(t),e._setOffset(),e._setTransform()}},{key:"getDistance",value:function(t){return this._loop()?t:t>0&&0===this._current?0:t<0&&this._current===this.realCount-1?0:t}},{key:"_moveIndex",value:function(t){0!==t&&(this._prev=this._current,this._current+=this.realCount,this._current+=t,this._current%=this.realCount)}},{key:"_activate",value:function(t){var e=this._options.activeClass;Array.prototype.forEach.call(this.$items,function(n,i){n.classList.remove(e),t===Number(n.dataset.index)&&n.classList.add(e)})}},{key:"go",value:function(t){var e=this;return e.stop(),t=t||0,t+=this.realCount,t%=this.realCount,t=this._position.indexOf(t)-this._position.indexOf(this._current),e._moveIndex(t),e._setOffset(),e._setTransition(),e._setTransform(),e._auto(),this}},{key:"next",value:function(){return this.move(1),this}},{key:"move",value:function(t){return this.go(this._current+t),this}},{key:"on",value:function(t,e){return this._eventHandlers[t]&&console.error("[swiper] event "+t+" is already register"),"function"!=typeof e&&console.error("[swiper] parameter callback must be a function"),this._eventHandlers[t]=e,this}},{key:"_itemDestoy",value:function(){var t=this;this.$items.length&&k(this.$items).forEach(function(e){e.removeEventListener("webkitTransitionEnd",t.transitionEndHandler,!1)})}},{key:"destroy",value:function(){if(this.stop(),this._current=0,this._setTransform(0),window.removeEventListener("orientationchange",this.resizeHandler,!1),this.$container.removeEventListener("touchstart",this.touchstartHandler,!1),this.$container.removeEventListener("touchmove",this.touchmoveHandler,!1),this.$container.removeEventListener("touchend",this.touchendHandler,!1),this._itemDestoy(),this._options.loop&&2===this.count){var t=this.$container.querySelector(this._options.item+"-clone");t&&this.$container.removeChild(t),(t=this.$container.querySelector(this._options.item+"-clone"))&&this.$container.removeChild(t)}}}]),t}(),L=n("hRKE"),E=n.n(L);function $(t,e){!/^javas/.test(t)&&t&&("object"===(void 0===t?"undefined":E()(t))||e&&"string"==typeof t&&!/http/.test(t)?"object"===(void 0===t?"undefined":E()(t))&&!0===t.replace?e.replace(t):"BACK"===t?e.go(-1):e.push(t):window.location.href=t)}Array,String,Boolean,Boolean,String,String,Boolean,Boolean,Number,Number,Number,String,Number,Number,Number;var S={name:"swiper",created:function(){this.index=this.value||0,this.index&&(this.current=this.index)},mounted:function(){var t=this;this.hasTwoLoopItem(),this.$nextTick(function(){t.list&&0===t.list.length||t.render(t.index),t.xheight=t.getHeight(),t.$emit("on-get-height",t.xheight)})},methods:{hasTwoLoopItem:function(){2===this.list.length&&this.loop?this.listTwoLoopItem=this.list:this.listTwoLoopItem=[]},clickListItem:function(t){$(t.url,this.$router),this.$emit("on-click-list-item",JSON.parse(m()(t)))},buildBackgroundUrl:function(t){return t.fallbackImg?"url("+t.img+"), url("+t.fallbackImg+")":"url("+t.img+")"},render:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.swiper&&this.swiper.destroy(),this.swiper=new C({container:this.$el,direction:this.direction,auto:this.auto,loop:this.loop,interval:this.interval,threshold:this.threshold,duration:this.duration,height:this.height||this._height,minMovingDistance:this.minMovingDistance,imgList:this.imgList}).on("swiped",function(e,n){t.current=n%t.length,t.index=n%t.length}),e>0&&this.swiper.go(e)},rerender:function(){var t=this;this.$el&&!this.hasRender&&(this.hasRender=!0,this.hasTwoLoopItem(),this.$nextTick(function(){t.index=t.value||0,t.current=t.value||0,t.length=t.list.length||t.$children.length,t.destroy(),t.render(t.value)}))},destroy:function(){this.hasRender=!1,this.swiper&&this.swiper.destroy()},getHeight:function(){var t=parseInt(this.height,10);return t?this.height:t?void 0:this.aspectRatio?this.$el.offsetWidth*this.aspectRatio+"px":"180px"}},props:{list:{type:Array,default:function(){return[]}},direction:{type:String,default:"horizontal"},showDots:{type:Boolean,default:!0},showDescMask:{type:Boolean,default:!0},dotsPosition:{type:String,default:"right"},dotsClass:String,auto:Boolean,loop:Boolean,interval:{type:Number,default:3e3},threshold:{type:Number,default:50},duration:{type:Number,default:300},height:{type:String,default:"auto"},aspectRatio:Number,minMovingDistance:{type:Number,default:0},value:{type:Number,default:0}},data:function(){return{hasRender:!1,current:this.index||0,xheight:"auto",length:this.list.length,index:0,listTwoLoopItem:[]}},watch:{auto:function(t){t?this.swiper&&this.swiper._auto():this.swiper&&this.swiper.stop()},list:function(t,e){m()(t)!==m()(e)&&this.rerender()},current:function(t){this.index=t,this.$emit("on-index-change",t)},index:function(t){var e=this;t!==this.current&&this.$nextTick(function(){e.swiper&&e.swiper.go(t)}),this.$emit("input",t)},value:function(t){this.index=t}},beforeDestroy:function(){this.destroy()}},M={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-slider"},[n("div",{staticClass:"vux-swiper",style:{height:t.xheight}},[t._t("default"),t._v(" "),t._l(t.list,function(e,i){return n("div",{staticClass:"vux-swiper-item",attrs:{"data-index":i},on:{click:function(n){t.clickListItem(e)}}},[n("a",{attrs:{href:"javascript:"}},[n("div",{staticClass:"vux-img",style:{backgroundImage:t.buildBackgroundUrl(e)}}),t._v(" "),t.showDescMask?n("p",{staticClass:"vux-swiper-desc"},[t._v(t._s(e.title))]):t._e()])])}),t._v(" "),t._l(t.listTwoLoopItem,function(e,i){return t.listTwoLoopItem.length>0?n("div",{staticClass:"vux-swiper-item vux-swiper-item-clone",attrs:{"data-index":i},on:{click:function(n){t.clickListItem(e)}}},[n("a",{attrs:{href:"javascript:"}},[n("div",{staticClass:"vux-img",style:{backgroundImage:t.buildBackgroundUrl(e)}}),t._v(" "),t.showDescMask?n("p",{staticClass:"vux-swiper-desc"},[t._v(t._s(e.title))]):t._e()])]):t._e()})],2),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showDots,expression:"showDots"}],class:[t.dotsClass,"vux-indicator","vux-indicator-"+t.dotsPosition]},t._l(t.length,function(e){return n("a",{attrs:{href:"javascript:"}},[n("i",{staticClass:"vux-icon-dot",class:{active:e-1===t.current}})])}))])},staticRenderFns:[]};var T=n("C7Lr")(S,M,!1,function(t){n("zxib")},null,null).exports,O={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"vux-swiper-item"},[this._t("default")],2)},staticRenderFns:[]},I=(n("C7Lr")({name:"swiper-item",mounted:function(){var t=this;this.$nextTick(function(){t.$parent.rerender()})},beforeDestroy:function(){var t=this.$parent;this.$nextTick(function(){t.rerender()})}},O,!1,null,null,null).exports,u.a,{data:function(){return{data:[],pageNum:1,isShowLoading:!1,total:0,currentView:"announcement"}},filters:{time:function(t){return t.substr(0,10)}},mounted:function(){var t=this;Object(h.a)(this),Object(l.j)(this.pageNum,2).then(function(e){t.data=e.rows,t.total=e.total})},components:{BottomLine:u.a}}),R={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("ul",{staticClass:"sense"},[t._l(t.data,function(e,i){return n("router-link",{key:i,attrs:{to:"/user/home/article/"+e.id,tag:"li"}},[n("div",{staticClass:"l"},[n("h3",{staticClass:"tit"},[t._v(t._s(e.title))]),t._v(" "),n("div",{staticClass:"tag"},[n("span"),t._v(" "),n("b",[t._v(t._s(t._f("time")(e.createDate)))])])]),t._v(" "),n("div",{staticClass:"r"},[n("img",{attrs:{src:e.titleimg,alt:""}})])])}),t._v(" "),n("bottom-line")],2),t._v(" "),n("router-view")],1)},staticRenderFns:[]},B=n("C7Lr")(I,R,!1,null,null,null).exports,j=n("eyOy"),H=n("2bfE"),N=n("yclV"),D=(s()({},Object(o.b)(["setGeographicLocation","setHomeUrl"]),{setLngLat:function(t){this.lngAndLat=t.longitude+","+t.dimensions},commonSenseEv:function(t){this.conLiIndex=t,this.currentView=1==t?"sense":"announcement"},screenEv:function(t){this.isScreen=t},screen:function(){this.isScreen=!0},sosOrdersEv:function(){var t=this;Object(j.a)(this).then(function(e){var n=[e.Longitude,e.Latitude],i=n[0],s=n[1];Object(l.Q)(i,s).then(function(e){t.$vux.toast.text(e.msg),2==e.code?window.location.href="tel:"+e.mobile:101==e.code?window.location.href="tel:"+e.mobile:600==e.code?t.$router.push("/user/home/userRescue"):601==e.code&&t.$router.push("/user/personal/verified")})})}}),s()({},Object(o.c)(["userInfo","homeUrl"]),{district:function(){return sessionStorage.district}}),r.default,H.a,{data:function(){return{start:0,searchTxt:"",showSearchResult:!1,lngAndLat:"",setRescue:[],isMenuShow:!1,conLiIndex:1,pageNum:1,isScreen:!1,currentView:"sense",imgList:[{img:"http://a.hiphotos.baidu.com/image/pic/item/14ce36d3d539b6006a6cc5d0e550352ac65cb733.jpg"},{img:"http://a.hiphotos.baidu.com/image/pic/item/14ce36d3d539b6006a6cc5d0e550352ac65cb733.jpg"}],classFlag:!1}},watch:{searchTxt:function(t){var e=[];JSON.parse(sessionStorage.setRescue).forEach(function(n){-1!==n.address.indexOf(t)?e.push(n):-1!==n.name.indexOf(t)&&e.push(n)}),this.setRescue=e}},methods:s()({},Object(o.b)(["setGeographicLocation","setHomeUrl"]),{setLngLat:function(t){this.lngAndLat=t.longitude+","+t.dimensions},commonSenseEv:function(t){this.conLiIndex=t,this.currentView=1==t?"sense":"announcement"},screenEv:function(t){this.isScreen=t},screen:function(){this.isScreen=!0},sosOrdersEv:function(){var t=this;Object(j.a)(this).then(function(e){var n=[e.Longitude,e.Latitude],i=n[0],s=n[1];Object(l.Q)(i,s).then(function(e){t.$vux.toast.text(e.msg),2==e.code?window.location.href="tel:"+e.mobile:101==e.code?window.location.href="tel:"+e.mobile:600==e.code?t.$router.push("/user/home/userRescue"):601==e.code&&t.$router.push("/user/personal/verified")})})}}),mounted:function(){var t=this;console.log(window.location.href);var e=N.b.call(this),n=window.location.href.split("#")[1];e&&this.setHomeUrl(n),N.d.call(this)&&3!=this.userInfo.userType&&this.$router.push("/rescue/task"),sessionStorage.setRescue&&(this.setRescue=JSON.parse(sessionStorage.setRescue));var i=this.$refs.con;window.addEventListener("scroll",function(e){var n=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;i.offsetTop<n?t.classFlag=!0:t.classFlag=!1})},computed:s()({},Object(o.c)(["userInfo","homeUrl"]),{district:function(){return sessionStorage.district}}),components:{Mapp:r.default,Sense:v,Announcement:B,Swiper:T,bottomNav:H.a}}),A={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("div",{staticClass:"map"},[n("mapp",{attrs:{screen:t.isScreen,lngLat:t.lngAndLat},on:{screen:t.screenEv,sos:t.sosOrdersEv}}),t._v(" "),n("div",{staticClass:"search",class:{screen:t.isScreen}},[n("div",{staticClass:"input"},[n("i",{staticClass:"iconfont icon-search"}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.searchTxt,expression:"searchTxt"}],ref:"inputMap",attrs:{type:"text",name:"",id:"suggestId",placeholder:"搜索地点或救援点"},domProps:{value:t.searchTxt},on:{focus:function(e){t.showSearchResult=!0},blur:function(e){t.showSearchResult=!1},input:function(e){e.target.composing||(t.searchTxt=e.target.value)}}}),t._v(" "),t.showSearchResult?n("ul",{staticClass:"searchResult"},t._l(t.setRescue,function(e,i){return n("li",{key:i,on:{click:function(n){t.setLngLat(e)}}},[n("h3",[t._v(t._s(e.name))]),t._v(" "),n("p",[t._v(t._s(e.address))])])})):t._e()]),t._v(" "),n("div",{staticClass:"position"},[n("span",[t._v(t._s(t.district))]),t._v(" "),n("i",{staticClass:"iconfont icon-jiantou_down"})])]),t._v(" "),n("div",{staticClass:"menuTiao",on:{click:t.screen}},[n("p")]),t._v(" "),n("div",{staticClass:"menuBtn"},[n("router-link",{staticClass:"rescue btn",attrs:{tag:"div",to:"home/userRescue"}},[n("i",{staticClass:"iconfont icon-yinhangqia"}),t._v(" "),n("span",[t._v("救援卡")])]),t._v(" "),n("router-link",{staticClass:"insurance btn",attrs:{to:"/user/insuranceList",tag:"div"}},[n("i",{staticClass:"iconfont icon-fenfabaoxian"}),t._v(" "),n("span",[t._v("保险理财")])])],1)],1),t._v(" "),n("div",{staticClass:"advertising"},[n("swiper",{attrs:{list:t.imgList}})],1),t._v(" "),n("div",{ref:"con",staticClass:"con",class:{fixed:t.classFlag}},[n("ul",{staticClass:"nav"},[n("li",{class:{checked:1==t.conLiIndex},on:{click:function(e){t.commonSenseEv(1)}}},[t._v("急救小常识")]),t._v(" "),n("li",{class:{checked:2==t.conLiIndex},on:{click:function(e){t.commonSenseEv(2)}}},[t._v("系统公告")])]),t._v(" "),n(t.currentView,{tag:"component"})],1),t._v(" "),n("bottom-nav",{attrs:{checkIndex:"1"}})],1)},staticRenderFns:[]};var z=n("C7Lr")(D,A,!1,function(t){n("whZG"),n("mw1w")},"data-v-418281a3",null);e.default=z.exports},amhY:function(t,e){},lbwy:function(t,e){},mw1w:function(t,e){},wEVy:function(t,e,n){"use strict";var i,s,o=n("lC5x"),r=n.n(o),a=n("J0Oq"),c=n.n(a),u=n("K2f2"),l=n("yclV"),h=(i=c()(r.a.mark(function t(e,n){var i,s,o;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(i=Object(l.a)("userInfo").userType,s=e.navIndex,o=[],3!=i){t.next=14;break}if(1!=s){t.next=9;break}return t.next=7,Object(u.Y)(n).then(function(t){o=t.rows});case 7:t.next=12;break;case 9:if(4!=s){t.next=12;break}return t.next=12,Object(u.X)(n).then(function(t){o=t.rows});case 12:t.next=17;break;case 14:if(2!=i){t.next=17;break}return t.next=17,Object(u.q)(n).then(function(t){o=t.rows});case 17:f(e,o,"infoData");case 18:case"end":return t.stop()}},t,this)})),function(t,e){return i.apply(this,arguments)}),d=(s=c()(r.a.mark(function t(e,n,i){var s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s=[],t.next=3,Object(u.j)(n,i).then(function(t){s=t.rows,e.isShowLoading=!1});case 3:f(e,s,"data");case 4:case"end":return t.stop()}},t,this)})),function(t,e,n){return s.apply(this,arguments)});function f(t,e,n){e.forEach(function(e){t[n].push(e)})}var v,p=n("bBgq"),m=n.n(p);e.a=function(t){v=t,window.addEventListener("scroll",m()(_,500))};function _(){if(function(){var t=0,e=0;document.body&&(t=document.body.scrollTop);document.documentElement&&(e=document.documentElement.scrollTop);return t-e>0?t:e}()+function(){var t=0;t="CSS1Compat"==document.compatMode?document.documentElement.clientHeight:document.body.clientHeight;return t}()==function(){var t=0,e=0;document.body&&(t=document.body.scrollHeight);document.documentElement&&(e=document.documentElement.scrollHeight);return t-e>0?t:e}())if(-1!==v.$route.path.indexOf("/rescue/task")){if(v.total<10*v.pageNum)return;v.pageNum++,h(v,v.pageNum)}else if(-1!==v.$route.path.indexOf("/user/home")){if(v.total<10*v.pageNum)return;v.isShowLoading=!0;var t="sense"==v.currentView?"1":"2";v.pageNum++,d(v,v.pageNum,t)}}},whZG:function(t,e){},xSur:function(t,e,n){"use strict";e.__esModule=!0;var i,s=n("liLe"),o=(i=s)&&i.__esModule?i:{default:i};e.default=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),(0,o.default)(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}()},zG2y:function(t,e,n){"use strict";var i={props:["text"],data:function(){return{txt:""}},mounted:function(){this.txt=void 0!==this.text?this.text:"我是有底线的"}},s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bottomLine"},[e("p",[this._v(this._s(this.txt))])])},staticRenderFns:[]};var o=n("C7Lr")(i,s,!1,function(t){n("WAr1")},"data-v-2935bb20",null);e.a=o.exports},zxib:function(t,e){}});