const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./HelloWorld.stories-C4z8HQ1k.js","./__federation_expose_HelloWorld-Bb9q8JAd.js","./__federation_fn_import-DZuft5De.js","./__federation_expose_HelloWorld-CKzBKpBT.css","./entry-preview-BJazMlrM.js","./entry-preview-docs-DvKMfaXb.js","./toString-Col8VmJf.js","./compiler-core.esm-bundler-BOSEvuoP.js","./preview-BJPLiuSt.js","./index-D-8MO0q_.js","./preview-Djh1_Tal.js","./index-DrFu-skq.js","./preview-DB9FwMii.js","./preview-Biy7PTLd.js","./preview-J5HWQ7Xw.css"])))=>i.map(i=>d[i]);
import"../sb-preview/runtime.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const _ of r.addedNodes)_.tagName==="LINK"&&_.rel==="modulepreload"&&l(_)}).observe(document,{childList:!0,subtree:!0});function c(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(t){if(t.ep)return;t.ep=!0;const r=c(t);fetch(t.href,r)}})();const f="modulepreload",R=function(e,i){return new URL(e,i).href},p={},o=function(i,c,l){let t=Promise.resolve();if(c&&c.length>0){const r=document.getElementsByTagName("link"),_=document.querySelector("meta[property=csp-nonce]"),a=_?.nonce||_?.getAttribute("nonce");t=Promise.allSettled(c.map(n=>{if(n=R(n,l),n in p)return;p[n]=!0;const u=n.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(!!l)for(let m=r.length-1;m>=0;m--){const O=r[m];if(O.href===n&&(!u||O.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${d}`))return;const s=document.createElement("link");if(s.rel=u?"stylesheet":f,u||(s.as="script"),s.crossOrigin="",s.href=n,a&&s.setAttribute("nonce",a),document.head.appendChild(s),u)return new Promise((m,O)=>{s.addEventListener("load",m),s.addEventListener("error",()=>O(new Error(`Unable to preload CSS for ${n}`)))})}))}return t.then(r=>{for(const _ of r||[]){if(_.status!=="rejected")continue;const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=_.reason,window.dispatchEvent(a),!a.defaultPrevented)throw _.reason}return i()})},{createBrowserChannel:T}=__STORYBOOK_MODULE_CHANNELS__,{addons:L}=__STORYBOOK_MODULE_PREVIEW_API__,E=T({page:"preview"});L.setChannel(E);window.__STORYBOOK_ADDONS_CHANNEL__=E;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=E);const S={"./src/components/HelloWorld.stories.ts":async()=>o(()=>import("./HelloWorld.stories-C4z8HQ1k.js"),__vite__mapDeps([0,1,2,3]),import.meta.url)};async function P(e){return S[e]()}const{composeConfigs:y,PreviewWeb:I,ClientApi:w}=__STORYBOOK_MODULE_PREVIEW_API__,V=async(e=[])=>{const i=await Promise.all([e.at(0)??o(()=>import("./entry-preview-BJazMlrM.js").then(c=>c.a),__vite__mapDeps([4,2]),import.meta.url),e.at(1)??o(()=>import("./entry-preview-docs-DvKMfaXb.js"),__vite__mapDeps([5,2,6,7]),import.meta.url),e.at(2)??o(()=>import("./preview-BJPLiuSt.js"),__vite__mapDeps([8,9]),import.meta.url),e.at(3)??o(()=>import("./preview-B1ev8E43.js"),[],import.meta.url),e.at(4)??o(()=>import("./preview-FpHGYA1q.js"),[],import.meta.url),e.at(5)??o(()=>import("./preview-Djh1_Tal.js"),__vite__mapDeps([10,11]),import.meta.url),e.at(6)??o(()=>import("./preview-BnWGZYux.js"),[],import.meta.url),e.at(7)??o(()=>import("./preview-DaXeQf6O.js"),[],import.meta.url),e.at(8)??o(()=>import("./preview-DB9FwMii.js"),__vite__mapDeps([12,11]),import.meta.url),e.at(9)??o(()=>import("./preview-4Up_z4Em.js"),[],import.meta.url),e.at(10)??o(()=>import("./preview-COhBygk3.js"),[],import.meta.url),e.at(11)??o(()=>import("./preview-Biy7PTLd.js"),__vite__mapDeps([13,2,4,14]),import.meta.url)]);return y(i)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new I(P,V);window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;export{o as _};
