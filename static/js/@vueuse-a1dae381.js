import{c as e,r as t,g as n,o,a,b as i,n as r,u,w as s}from"./@vue-825b6421.js";var l;const c="undefined"!=typeof window,d=e=>"function"==typeof e;function f(e){var t;const n="function"==typeof(o=e)?o():u(o);var o;return null!=(t=null==n?void 0:n.$el)?t:n}c&&(null==(l=null==window?void 0:window.navigator)?void 0:l.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);const p=c?window:void 0,O=c?window.document:void 0;function v(e,n=!1){const o=t(),u=()=>o.value=Boolean(e());return u(),function(e,t=!0){a()?i(e):t?e():r(e)}(u,n),o}const w="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},b="__vueuse_ssr_handlers__";w[b]=w[b]||{};var y,I,m=Object.getOwnPropertySymbols,g=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable,Q=(e,t)=>{var n={};for(var o in e)g.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&m)for(var o of m(e))t.indexOf(o)<0&&E.call(e,o)&&(n[o]=e[o]);return n};function T(e,t,a={}){const i=a,{window:r=p}=i,u=Q(i,["window"]);let l;const c=v((()=>r&&"MutationObserver"in r)),d=()=>{l&&(l.disconnect(),l=void 0)},O=s((()=>f(e)),(e=>{d(),c.value&&r&&e&&(l=new MutationObserver(t),l.observe(e,u))}),{immediate:!0}),w=()=>{d(),O()};var b;return b=w,n()&&o(b),{isSupported:c,stop:w}}function h(n=null,o={}){var a,i;const{document:r=O}=o,l="function"==typeof(c=null!=(a=null!=n?n:null==r?void 0:r.title)?a:null)?e(c):t(c);var c;const f=n&&d(n);function p(e){if(!("titleTemplate"in o))return e;const t=o.titleTemplate||"%s";return d(t)?t(e):u(t).replace(/%s/g,e)}return s(l,((e,t)=>{e!==t&&r&&(r.title=p("string"==typeof e?e:""))}),{immediate:!0}),o.observe&&!o.titleTemplate&&r&&!f&&T(null==(i=r.head)?void 0:i.querySelector("title"),(()=>{r&&r.title!==l.value&&(l.value=p(r.title))}),{childList:!0}),l}(I=y||(y={})).UP="UP",I.RIGHT="RIGHT",I.DOWN="DOWN",I.LEFT="LEFT",I.NONE="NONE";var j=Object.defineProperty,P=Object.getOwnPropertySymbols,S=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable,C=(e,t,n)=>t in e?j(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;((e,t)=>{for(var n in t||(t={}))S.call(t,n)&&C(e,n,t[n]);if(P)for(var n of P(t))x.call(t,n)&&C(e,n,t[n])})({linear:function(e){return e}},{easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]});export{h as u};