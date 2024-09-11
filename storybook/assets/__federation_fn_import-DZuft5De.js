const S="[0-9A-Za-z-]+",P=`(?:\\+(${S}(?:\\.${S})*))`,_="0|[1-9]\\d*",b="[0-9]+",Z="\\d*[a-zA-Z-][a-zA-Z0-9-]*",X=`(?:${b}|${Z})`,N=`(?:-?(${X}(?:\\.${X})*))`,q=`(?:${_}|${Z})`,F=`(?:-(${q}(?:\\.${q})*))`,x=`${_}|x|X|\\*`,d=`[v=\\s]*(${x})(?:\\.(${x})(?:\\.(${x})(?:${F})?${P}?)?)?`,U=`^\\s*(${d})\\s+-\\s+(${d})\\s*$`,D=`(${b})\\.(${b})\\.(${b})`,J=`[v=\\s]*${D}${N}?${P}?`,g="((?:<|>)?=?)",Q=`(\\s*)${g}\\s*(${J}|${d})`,k="(?:~>?)",W=`(\\s*)${k}\\s+`,B="(?:\\^)",Y=`(\\s*)${B}\\s+`,A="(<|>)?=?\\s*\\*",j=`^${B}${d}$`,m=`(${_})\\.(${_})\\.(${_})`,ee=`v?${m}${F}?${P}?`,re=`^${k}${d}$`,ne=`^${g}\\s*${d}$`,te=`^${g}\\s*(${ee})$|^$`,se="^\\s*>=\\s*0.0.0\\s*$";function o(e){return new RegExp(e)}function u(e){return!e||e.toLowerCase()==="x"||e==="*"}function G(...e){return t=>e.reduce((i,r)=>r(i),t)}function E(e){return e.match(o(te))}function z(e,t,i,r){const n=`${e}.${t}.${i}`;return r?`${n}-${r}`:n}function ie(e){return e.replace(o(U),(t,i,r,n,s,$,c,f,a,l,R,p)=>(u(r)?i="":u(n)?i=`>=${r}.0.0`:u(s)?i=`>=${r}.${n}.0`:i=`>=${i}`,u(a)?f="":u(l)?f=`<${+a+1}.0.0-0`:u(R)?f=`<${a}.${+l+1}.0-0`:p?f=`<=${a}.${l}.${R}-${p}`:f=`<=${f}`,`${i} ${f}`.trim()))}function $e(e){return e.replace(o(Q),"$1$2$3")}function ue(e){return e.replace(o(W),"$1~")}function ce(e){return e.replace(o(Y),"$1^")}function fe(e){return e.trim().split(/\s+/).map(t=>t.replace(o(j),(i,r,n,s,$)=>u(r)?"":u(n)?`>=${r}.0.0 <${+r+1}.0.0-0`:u(s)?r==="0"?`>=${r}.${n}.0 <${r}.${+n+1}.0-0`:`>=${r}.${n}.0 <${+r+1}.0.0-0`:$?r==="0"?n==="0"?`>=${r}.${n}.${s}-${$} <${r}.${n}.${+s+1}-0`:`>=${r}.${n}.${s}-${$} <${r}.${+n+1}.0-0`:`>=${r}.${n}.${s}-${$} <${+r+1}.0.0-0`:r==="0"?n==="0"?`>=${r}.${n}.${s} <${r}.${n}.${+s+1}-0`:`>=${r}.${n}.${s} <${r}.${+n+1}.0-0`:`>=${r}.${n}.${s} <${+r+1}.0.0-0`)).join(" ")}function ae(e){return e.trim().split(/\s+/).map(t=>t.replace(o(re),(i,r,n,s,$)=>u(r)?"":u(n)?`>=${r}.0.0 <${+r+1}.0.0-0`:u(s)?`>=${r}.${n}.0 <${r}.${+n+1}.0-0`:$?`>=${r}.${n}.${s}-${$} <${r}.${+n+1}.0-0`:`>=${r}.${n}.${s} <${r}.${+n+1}.0-0`)).join(" ")}function le(e){return e.split(/\s+/).map(t=>t.trim().replace(o(ne),(i,r,n,s,$,c)=>{const f=u(n),a=f||u(s),l=a||u($);return r==="="&&l&&(r=""),c="",f?r===">"||r==="<"?"<0.0.0-0":"*":r&&l?(a&&(s=0),$=0,r===">"?(r=">=",a?(n=+n+1,s=0,$=0):(s=+s+1,$=0)):r==="<="&&(r="<",a?n=+n+1:s=+s+1),r==="<"&&(c="-0"),`${r+n}.${s}.${$}${c}`):a?`>=${n}.0.0${c} <${+n+1}.0.0-0`:l?`>=${n}.${s}.0${c} <${n}.${+s+1}.0-0`:i})).join(" ")}function oe(e){return e.trim().replace(o(A),"")}function pe(e){return e.trim().replace(o(se),"")}function w(e,t){return e=+e||e,t=+t||t,e>t?1:e===t?0:-1}function de(e,t){const{preRelease:i}=e,{preRelease:r}=t;if(i===void 0&&r)return 1;if(i&&r===void 0)return-1;if(i===void 0&&r===void 0)return 0;for(let n=0,s=i.length;n<=s;n++){const $=i[n],c=r[n];if($!==c)return $===void 0&&c===void 0?0:$?c?w($,c):-1:1}return 0}function v(e,t){return w(e.major,t.major)||w(e.minor,t.minor)||w(e.patch,t.patch)||de(e,t)}function C(e,t){return e.version===t.version}function _e(e,t){switch(e.operator){case"":case"=":return C(e,t);case">":return v(e,t)<0;case">=":return C(e,t)||v(e,t)<0;case"<":return v(e,t)>0;case"<=":return C(e,t)||v(e,t)>0;case void 0:return!0;default:return!1}}function Re(e){return G(fe,ae,le,oe)(e)}function ve(e){return G(ie,$e,ue,ce)(e.trim()).split(/\s+/).join(" ")}function be(e,t){if(!e)return!1;const n=ve(t).split(" ").map(p=>Re(p)).join(" ").split(/\s+/).map(p=>pe(p)),s=E(e);if(!s)return!1;const[,$,,c,f,a,l]=s,R={operator:$,version:z(c,f,a,l),major:c,minor:f,patch:a,preRelease:l?.split(".")};for(const p of n){const y=E(p);if(!y)return!1;const[,K,,L,O,I,h]=y,M={operator:K,version:z(L,O,I,h),major:L,minor:O,patch:I,preRelease:h?.split(".")};if(!_e(M,R))return!1}return!0}const T={vue:{get:()=>()=>we(new URL("__federation_shared_vue-Bdl6GKKV.js",import.meta.url).href),import:!0}},V=Object.create(null);async function he(e,t="default"){return V[e]?new Promise(i=>i(V[e])):await Te(e,t)||Ve(e)}async function we(e){return import(e)}async function Te(e,t){let i=null;if(globalThis?.__federation_shared__?.[t]?.[e]){const r=globalThis.__federation_shared__[t][e],n=Object.keys(r)[0],s=Object.values(r)[0];T[e]?.requiredVersion?be(n,T[e].requiredVersion)?i=await(await s.get())():console.log(`provider support ${e}(${n}) is not satisfied requiredVersion(\${moduleMap[name].requiredVersion})`):i=await(await s.get())()}if(i)return H(i,e)}async function Ve(e){if(T[e]?.import){let t=await(await T[e].get())();return H(t,e)}else console.error("consumer config import=false,so cant use callback shared module")}function H(e,t){return typeof e.default=="function"?(Object.keys(e).forEach(i=>{i!=="default"&&(e.default[i]=e[i])}),V[t]=e.default,e.default):(e.default&&(e=Object.assign({},e.default,e)),V[t]=e,e)}export{he as importShared,Ve as importSharedLocal,Te as importSharedRuntime};
