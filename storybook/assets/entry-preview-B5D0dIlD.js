import{importShared as h}from"./__federation_fn_import-CvvKoHVJ.js";var w=Object.defineProperty,v=(e,r)=>{for(var t in r)w(e,t,{get:r[t],enumerable:!0})};const{h:l,createApp:N,reactive:_,isVNode:I,isReactive:j}=await h("vue"),{sanitizeStoryContextUpdate:A}=__STORYBOOK_MODULE_PREVIEW_API__;var E={};v(E,{applyDecorators:()=>b,mount:()=>P,parameters:()=>U,render:()=>y,renderToCanvas:()=>O});var y=(e,r)=>{let{id:t,component:o}=r;if(!o)throw new Error(`Unable to render story ${t} as the component annotation is missing from the default export`);return()=>l(o,e,C(e,r))},G=e=>{globalThis.PLUGINS_SETUP_FUNCTIONS??=new Set,globalThis.PLUGINS_SETUP_FUNCTIONS.add(e)},F=async(e,r)=>{globalThis&&globalThis.PLUGINS_SETUP_FUNCTIONS&&await Promise.all([...globalThis.PLUGINS_SETUP_FUNCTIONS].map(t=>t(e,r)))},d=new Map;async function O({storyFn:e,forceRemount:r,showMain:t,showException:o,storyContext:n,id:a},s){let p=d.get(s);if(p&&!r){let u=e(),c=T(u,n);return L(p.reactiveArgs,c),()=>{g(p.vueApp,s)}}p&&r&&g(p.vueApp,s);let i=N({setup(){n.args=_(n.args);let u=e(),c=T(u,n),f={vueApp:i,reactiveArgs:_(c)};return d.set(s,f),()=>l(u)}});return i.config.errorHandler=(u,c,f)=>{window.__STORYBOOK_PREVIEW__?.storyRenders.some(S=>S.id===a&&S.phase==="playing")?setTimeout(()=>{throw u},0):o(u)},await F(i,n),i.mount(s),t(),()=>{g(i,s)}}function C(e,r){let{argTypes:t}=r,o=Object.entries(e).filter(([n])=>t[n]?.table?.category==="slots").map(([n,a])=>[n,typeof a=="function"?a:()=>a]);return Object.fromEntries(o)}function T(e,r){return e.props&&I(e)?e.props:r.args}function L(e,r){if(Object.keys(r).length===0)return;let t=j(e)?e:_(e);Object.keys(t).forEach(o=>{o in r||delete t[o]}),Object.assign(t,r)}function g(e,r){e?.unmount(),d.has(r)&&d.delete(r)}function R(e){return typeof e=="function"?{render:e,name:e.name}:e}function m(e,r){let t=e;return t===null?null:typeof t=="function"?t:r?{...R(t),components:{...t.components||{},story:r}}:{render(){return l(t)}}}function b(e,r){return r.reduce((t,o)=>n=>{let a,s=o(p=>{let i=A(p);return p&&(i.args=Object.assign(n.args,i.args)),a=t({...n,...i}),a},n);return a||(a=t(n)),s===a?a:m(s,()=>l(a))},t=>m(e(t)))}var P=e=>async(r,t)=>(r&&(e.originalStoryFn=()=>()=>l(r,t?.props,t?.slots)),await e.renderToCanvas(),e.canvas),U={renderer:"vue3"};const D=Object.freeze(Object.defineProperty({__proto__:null,applyDecorators:b,mount:P,parameters:U,render:y,renderToCanvas:O},Symbol.toStringTag,{value:"Module"}));export{D as a,E as e,O as r,G as s};
