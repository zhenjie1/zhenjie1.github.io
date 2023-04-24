import{i as t}from"./vue-demi-71ba0ef2.js";import{e as s,r as a,m as e}from"./@vue-865cbc4e.js";
/*!
  * pinia v2.0.30
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const o=Symbol();var r,c;function i(){const r=s(!0),c=r.run((()=>a({})));let i=[],n=[];const p=e({install(t){p._a=t,t.provide(o,p),t.config.globalProperties.$pinia=p,n.forEach((t=>i.push(t))),n=[]},use(s){return this._a||t?i.push(s):n.push(s),this},_p:i,_a:null,_e:r,_s:new Map,state:c});return p}(c=r||(r={})).direct="direct",c.patchObject="patch object",c.patchFunction="patch function";export{i as c};
