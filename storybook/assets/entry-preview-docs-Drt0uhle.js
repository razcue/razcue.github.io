import{importShared}from"./__federation_fn_import-DZaj5gPW.js";import{t as toString_1,g as getDefaultExportFromCjs,$ as $w,z as zw,K as Ki,B as Bw,H as He,e as eP,s as sT}from"./toString-Col8VmJf.js";import{a9 as baseParse}from"./compiler-core.esm-bundler-CaIVUFqL.js";function arrayReduce$1(e,r,t,o){var a=-1,n=e==null?0:e.length;for(o&&n&&(t=e[++a]);++a<n;)t=r(t,e[a],a,e);return t}var _arrayReduce=arrayReduce$1;function basePropertyOf$1(e){return function(r){return e?.[r]}}var _basePropertyOf=basePropertyOf$1,basePropertyOf=_basePropertyOf,deburredLetters={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"s"},deburrLetter$1=basePropertyOf(deburredLetters),_deburrLetter=deburrLetter$1,deburrLetter=_deburrLetter,toString$1=toString_1,reLatin=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,rsComboMarksRange$1="\\u0300-\\u036f",reComboHalfMarksRange$1="\\ufe20-\\ufe2f",rsComboSymbolsRange$1="\\u20d0-\\u20ff",rsComboRange$1=rsComboMarksRange$1+reComboHalfMarksRange$1+rsComboSymbolsRange$1,rsCombo$1="["+rsComboRange$1+"]",reComboMark=RegExp(rsCombo$1,"g");function deburr$1(e){return e=toString$1(e),e&&e.replace(reLatin,deburrLetter).replace(reComboMark,"")}var deburr_1=deburr$1,reAsciiWord=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;function asciiWords$1(e){return e.match(reAsciiWord)||[]}var _asciiWords=asciiWords$1,reHasUnicodeWord=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;function hasUnicodeWord$1(e){return reHasUnicodeWord.test(e)}var _hasUnicodeWord=hasUnicodeWord$1,rsAstralRange="\\ud800-\\udfff",rsComboMarksRange="\\u0300-\\u036f",reComboHalfMarksRange="\\ufe20-\\ufe2f",rsComboSymbolsRange="\\u20d0-\\u20ff",rsComboRange=rsComboMarksRange+reComboHalfMarksRange+rsComboSymbolsRange,rsDingbatRange="\\u2700-\\u27bf",rsLowerRange="a-z\\xdf-\\xf6\\xf8-\\xff",rsMathOpRange="\\xac\\xb1\\xd7\\xf7",rsNonCharRange="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",rsPunctuationRange="\\u2000-\\u206f",rsSpaceRange=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",rsUpperRange="A-Z\\xc0-\\xd6\\xd8-\\xde",rsVarRange="\\ufe0e\\ufe0f",rsBreakRange=rsMathOpRange+rsNonCharRange+rsPunctuationRange+rsSpaceRange,rsApos$1="['’]",rsBreak="["+rsBreakRange+"]",rsCombo="["+rsComboRange+"]",rsDigits="\\d+",rsDingbat="["+rsDingbatRange+"]",rsLower="["+rsLowerRange+"]",rsMisc="[^"+rsAstralRange+rsBreakRange+rsDigits+rsDingbatRange+rsLowerRange+rsUpperRange+"]",rsFitz="\\ud83c[\\udffb-\\udfff]",rsModifier="(?:"+rsCombo+"|"+rsFitz+")",rsNonAstral="[^"+rsAstralRange+"]",rsRegional="(?:\\ud83c[\\udde6-\\uddff]){2}",rsSurrPair="[\\ud800-\\udbff][\\udc00-\\udfff]",rsUpper="["+rsUpperRange+"]",rsZWJ="\\u200d",rsMiscLower="(?:"+rsLower+"|"+rsMisc+")",rsMiscUpper="(?:"+rsUpper+"|"+rsMisc+")",rsOptContrLower="(?:"+rsApos$1+"(?:d|ll|m|re|s|t|ve))?",rsOptContrUpper="(?:"+rsApos$1+"(?:D|LL|M|RE|S|T|VE))?",reOptMod=rsModifier+"?",rsOptVar="["+rsVarRange+"]?",rsOptJoin="(?:"+rsZWJ+"(?:"+[rsNonAstral,rsRegional,rsSurrPair].join("|")+")"+rsOptVar+reOptMod+")*",rsOrdLower="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",rsOrdUpper="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",rsSeq=rsOptVar+reOptMod+rsOptJoin,rsEmoji="(?:"+[rsDingbat,rsRegional,rsSurrPair].join("|")+")"+rsSeq,reUnicodeWord=RegExp([rsUpper+"?"+rsLower+"+"+rsOptContrLower+"(?="+[rsBreak,rsUpper,"$"].join("|")+")",rsMiscUpper+"+"+rsOptContrUpper+"(?="+[rsBreak,rsUpper+rsMiscLower,"$"].join("|")+")",rsUpper+"?"+rsMiscLower+"+"+rsOptContrLower,rsUpper+"+"+rsOptContrUpper,rsOrdUpper,rsOrdLower,rsDigits,rsEmoji].join("|"),"g");function unicodeWords$1(e){return e.match(reUnicodeWord)||[]}var _unicodeWords=unicodeWords$1,asciiWords=_asciiWords,hasUnicodeWord=_hasUnicodeWord,toString=toString_1,unicodeWords=_unicodeWords;function words$1(e,r,t){return e=toString(e),r=t?void 0:r,r===void 0?hasUnicodeWord(e)?unicodeWords(e):asciiWords(e):e.match(r)||[]}var words_1=words$1,arrayReduce=_arrayReduce,deburr=deburr_1,words=words_1,rsApos="['’]",reApos=RegExp(rsApos,"g");function createCompounder$1(e){return function(r){return arrayReduce(words(deburr(r).replace(reApos,"")),e,"")}}var _createCompounder=createCompounder$1,createCompounder=_createCompounder,kebabCase=createCompounder(function(e,r,t){return e+(t?"-":"")+r.toLowerCase()}),kebabCase_1=kebabCase;const kebabCase$1=getDefaultExportFromCjs(kebabCase_1),{addons}=__STORYBOOK_MODULE_PREVIEW_API__,{watch,h,isVNode}=await importShared("vue");var ARG_TYPE_SECTIONS=["props","events","slots","exposed","expose"],extractArgTypes=e=>{if(!Ki(e))return null;let r="exposed"in e.__docgenInfo?"vue-component-meta":"vue-docgen-api",t={};return ARG_TYPE_SECTIONS.forEach(o=>{Bw(e,o).forEach(a=>{let n;if(r==="vue-docgen-api"){let s=a.docgenInfo;n=extractFromVueDocgenApi(s,o,a)}else{let s=a.docgenInfo;n=extractFromVueComponentMeta(s,o)}!n||t[n.name]||(["events","expose","exposed"].includes(o)&&(n.control={disable:!0}),t[n.name]=n)})}),t},extractFromVueDocgenApi=(e,r,t)=>{let o,a;if(r==="events"&&(o=e.type?.names.join(),a={name:"other",value:o??"",required:!1}),r==="slots"){let s=e.bindings?.filter(u=>!!u.name).map(u=>`${u.name}: ${u.type?.name??"unknown"}`).join("; ");o=s?`{ ${s} }`:void 0,a={name:"other",value:o??"",required:!1}}if(r==="props"){let s=e;if(o=s.type?.name,a=t?He(t.docgenInfo):{name:"other",value:o},s.type&&"elements"in s.type&&Array.isArray(s.type.elements)&&s.type.elements.length>0){let u=s.type.elements.map(i=>i.name);o==="Array"&&(o=`${u.length===1?u[0]:`(${u.join(" | ")})`}[]`),o==="union"?o=u.join(" | "):o==="intersection"&&(o=u.join(" & "))}}let n="required"in e?e.required??!1:!1;return{name:e.name,description:e.description,type:a?{...a,required:n}:{name:"other",value:o??""},table:{type:o?{summary:o}:void 0,defaultValue:t?.propDef.defaultValue??void 0,jsDocTags:t?.propDef.jsDocTags,category:r}}},extractFromVueComponentMeta=(e,r)=>{if("global"in e&&e.global)return;let t={summary:e.type.replace(" | undefined","")};if(r==="props"){let o=e,a=o.default?{summary:o.default}:void 0;return{name:o.name,description:formatDescriptionWithTags(o.description,o.tags),defaultValue:a,type:convertVueComponentMetaProp(o),table:{type:t,defaultValue:a,category:r}}}else return{name:e.name,description:"description"in e?e.description:"",type:{name:"other",value:e.type},table:{type:t,category:r}}},convertVueComponentMetaProp=e=>{let r=e.schema,t=e.required,o={name:"other",value:e.type,required:t},a=["string","number","function","boolean","symbol"];if(typeof r=="string")return a.includes(r)?{name:r,required:t}:o;switch(r.kind){case"enum":{let n=r.schema?.filter(s=>s!=="undefined")??[];return isBooleanSchema(n)?{name:"boolean",required:t}:isLiteralUnionSchema(n)||isEnumSchema(n)?{name:"enum",value:n.map(s=>s.replace(/"/g,"")),required:t}:n.length===1?convertVueComponentMetaProp({schema:n[0],type:e.type,required:t}):(n.length>2&&n.includes("true")&&n.includes("false")&&(n=n.filter(s=>s!=="true"&&s!=="false"),n.push("boolean")),{name:"union",value:n.map(s=>convertVueComponentMetaProp(typeof s=="object"?{schema:s,type:s.type,required:!1}:{schema:s,type:s,required:!1})),required:t})}case"array":{let n=r.schema?.filter(s=>s!=="undefined")??[];return n.length===0?o:n.length===1?{name:"array",value:convertVueComponentMetaProp({schema:n[0],type:e.type,required:!1}),required:t}:{name:"union",value:n.map(s=>convertVueComponentMetaProp(typeof s=="object"?{schema:s,type:s.type,required:!1}:{schema:s,type:s,required:!1})),required:t}}case"object":return{name:"object",value:Object.entries(r.schema??{}).reduce((n,[s,u])=>(n[s]=convertVueComponentMetaProp(u),n),{}),required:t};default:return o}},formatDescriptionWithTags=(e,r)=>!r?.length||!e?e??"":`${r.map(t=>`@${t.name}: ${t.text}`).join("<br>")}<br><br>${e}`,isLiteralUnionSchema=e=>e.every(r=>typeof r=="string"&&r.startsWith('"')&&r.endsWith('"')),isEnumSchema=e=>e.every(r=>typeof r=="string"&&r.includes(".")),isBooleanSchema=e=>e.length===2&&e.includes("true")&&e.includes("false"),omitEvent=e=>e?Object.fromEntries(Object.entries(e).filter(([r,t])=>!r.startsWith("on"))):{},displayObject=e=>e&&typeof e=="object"?`{${Object.keys(e).map(r=>`${r}:${displayObject(e[r])}`).join(",")}}`:typeof e=="string"?`'${e}'`:e?.toString(),htmlEventAttributeToVueEventAttribute=e=>/^on[A-Za-z]/.test(e)?e.replace(/^on/,"v-on:").toLowerCase():e,directiveSource=(e,r)=>e.toLowerCase().startsWith("on")?`${htmlEventAttributeToVueEventAttribute(e)}='()=>({})'`:`${e}="${r||""}"`,attributeSource=(e,r,t)=>["boolean","number","object"].includes(typeof r)||t?`:${e}="${displayObject(r)}"`:directiveSource(e,r),evalExp=(e,r)=>{let t=e;return t&&/v-bind="(\w+)"/.test(t)?t.replace(/"(\w+)"/g,`"${displayObject(r)}"`):(Object.keys(r).forEach(o=>{let a=new RegExp(`(\\w+)\\.${o}`,"g"),n=new RegExp(`(\\w+)\\.${o}`,"g");a.test(t)&&(t=t.replace(n,displayObject(r[o])))}),t)},replaceValueWithRef=(e,r,t)=>{let o=t?r[t]:"args",a=()=>{let s=Object.fromEntries(Object.entries(r).map(([u])=>[u,u]));return displayObject(s).replace(/'/g,"")},n=new RegExp(`="${o}"`,"g");return e.replace(n,`="${t??a()}"`)};function generateExpression(e){let r=e.toString().split("=>")[1].trim().replace("return","").trim();return r.startsWith("{")&&r.endsWith("}")&&(r=r.substring(1,r.length-1).trim()),`{{${r}}}`}var skipSourceRender=e=>{let r=e?.parameters.docs?.source,t=e?.parameters.__isArgsStory,o=e?.viewMode==="docs";return r?.type===sT.DYNAMIC?!1:!o||!t||r?.code||r?.type===sT.CODE};function generateAttributesSource(e,r,t,o){return Object.keys(e).map(a=>{let n=e[a].loc.source.replace(/\$props/g,"args"),s=e[a].arg?.loc.source;return o&&s?replaceValueWithRef(n,r,s):evalExp(n,omitEvent(r))}).join(" ")}function mapAttributesAndDirectives(e){let r=t=>t.startsWith("on")?t:kebabCase$1(t);return Object.keys(e).map(t=>({name:"bind",type:["v-","@","v-on"].includes(t)?7:6,arg:{content:r(t),loc:{source:r(t)}},loc:{source:attributeSource(r(t),e[t])},exp:{isStatic:!1,loc:{source:e[t]}},modifiers:[""]}))}function mapSlots(e,r,t){return Object.keys(e).map(o=>{let a=e[o],n="",s=t.find(i=>i.name===o&&i.scoped)?.bindings?.map(i=>i.name).join(",");typeof a=="string"?n=a:typeof a=="function"?n=generateExpression(a):isVNode(a)?n=r(a):typeof a=="object"&&!isVNode(a)&&(n=JSON.stringify(a));let u=s?`="{${s}}"`:"";return n=a?`<template #${o}${u}>${n}</template>`:"",{type:2,content:n,loc:{source:n,start:{offset:0,line:1,column:0},end:{offset:0,line:1,column:0}}}})}function generateScriptSetup(e,r,t){let o=Object.keys(e).map(a=>`const ${a} = ${typeof e[a]=="function"?"()=>{}":`ref(${JSON.stringify(e[a])});`}`);return o.unshift('import { ref } from "vue";'),`<script lang='ts' setup>${o.join(`
`)}<\/script>`}function getTemplateComponents(e,r){try{let t=e,o=t?t(r?.args,r):r?.component,a=typeof o=="function"?o():o,{template:n}=a;return n?getComponents(n):[h(a,r?.args)]}catch{return[]}}function getComponents(e){return baseParse(e,{isNativeTag:()=>!0,decodeEntities:(t,o)=>t})?.children||[]}function generateTemplateSource(componentOrNodes,{args,argTypes},byRef=!1){let isElementNode=e=>e&&e.type===1,isInterpolationNode=e=>e&&e.type===5,isTextNode=e=>e&&e.type===2,generateComponentSource=componentOrNode=>{if(isElementNode(componentOrNode)){let{tag:e,props:r,children:t}=componentOrNode,o=typeof t=="string"?t:t.map(n=>generateComponentSource(n)).join(""),a=generateAttributesSource(r,args,argTypes,byRef);return o===""?`<${e} ${a} />`:`<${e} ${a}>${o}</${e}>`}if(isTextNode(componentOrNode)){let{content:e}=componentOrNode;return e}if(isInterpolationNode(componentOrNode)){let{content}=componentOrNode,expValue=evalExp(content.loc.source,args);return expValue===content.loc.source?`{{${expValue}}}`:eval(expValue)}if(isVNode(componentOrNode)){let e=componentOrNode,{props:r,type:t,children:o}=e,a=typeof o=="string"?void 0:o,n=t?.__docgenInfo?.slots,s=a?Object.fromEntries(Object.entries(r??{}).filter(([p,l])=>!a[p]&&!["class","style"].includes(p)).map(([p,l])=>[p,l])):r,u=mapAttributesAndDirectives(s??{}),i=Object.fromEntries(Object.entries(r??{}).filter(([p,l])=>a?.[p])),c=o?typeof o=="string"?o:mapSlots(i,generateComponentSource,n??[]).map(p=>p.content).join(""):"",d=typeof t=="string"?t:t.name||t.__name||t.__docgenInfo?.displayName,m=generateAttributesSource(u,args,argTypes,byRef);return c.trim()===""?`<${d} ${m}/>`:`<${d} ${m}>${c}</${d}>`}return null},componentsOrNodes=Array.isArray(componentOrNodes)?componentOrNodes:[componentOrNodes],source=componentsOrNodes.map(e=>generateComponentSource(e)).join(" ");return source||null}var sourceDecorator=(e,r)=>{let t=skipSourceRender(r),o=e();return watch(()=>r.args,()=>{t||generateSource(r)},{immediate:!0,deep:!0}),o};function generateSource(e){let r=addons.getChannel(),{args:t={},argTypes:o={},id:a}=e||{},n=getTemplateComponents(e?.originalStoryFn,e),s=e?.parameters?.docs?.source?.withScriptSetup||!1,u=s?generateScriptSetup(t):"",i=generateTemplateSource(n,e,s);if(i){let c=`${u}
 <template>
 ${i} 
</template>`;return r.emit(eP,{id:a,args:t,source:c,format:"vue"}),c}return null}var parameters={docs:{story:{inline:!0},extractArgTypes,extractComponentDescription:$w}},decorators=[sourceDecorator],argTypesEnhancers=[zw];export{argTypesEnhancers,decorators,parameters};
