const c=new Set(["Module","__esModule","default","_export_sfc"]);let _={"./HelloWorld":()=>(d(["__federation_expose_HelloWorld-CKzBKpBT.css"],!1,"./HelloWorld"),h("./__federation_expose_HelloWorld-Bb9q8JAd.js").then(e=>Object.keys(e).every(o=>c.has(o))?()=>e.default:()=>e))};const a={},d=(e,o,i)=>{const r=import.meta.url;if(typeof r>"u"){console.warn('The remote style takes effect only when the build.target option in the vite.config.ts file is higher than that of "es2020".');return}const l=r.substring(0,r.lastIndexOf("remoteEntry.js"));e.forEach(s=>{const t=l+s;if(!(t in a))if(a[t]=!0,o){const n="css__mf.razcue.github.io__"+i;window[n]==null&&(window[n]=[]),window[n].push(t)}else{const n=document.head.appendChild(document.createElement("link"));n.href=t,n.rel="stylesheet"}})};async function h(e){return import(e)}const f=e=>{if(!_[e])throw new Error("Can not find remote module "+e);return _[e]()},u=e=>{globalThis.__federation_shared__=globalThis.__federation_shared__||{},Object.entries(e).forEach(([o,i])=>{const r=Object.keys(i)[0],l=Object.values(i)[0],s=l.scope||"default";globalThis.__federation_shared__[s]=globalThis.__federation_shared__[s]||{};const t=globalThis.__federation_shared__[s];(t[o]=t[o]||{})[r]=l})};export{d as dynamicLoadingCss,f as get,u as init};
