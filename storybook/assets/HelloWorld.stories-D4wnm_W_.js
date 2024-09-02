import t from"./__federation_expose_HelloWorld-BXpGcmca.js";const n={title:"Example/HelloWorld",component:t,argTypes:{msg:{control:"text"}}},o=a=>({components:{HelloWorld:t},setup(){return{args:a}},template:'<HelloWorld v-bind="args" />'}),e=o.bind({});e.args={msg:"Hello from a custom message!"};const s=o.bind({});s.args={msg:"Check out this styled message!"};const r=o.bind({});r.args={msg:"Click the button to increase the count."};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => ({
  components: {
    HelloWorld
  },
  setup() {
    return {
      args
    };
  },
  template: '<HelloWorld v-bind="args" />'
})`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => ({
  components: {
    HelloWorld
  },
  setup() {
    return {
      args
    };
  },
  template: '<HelloWorld v-bind="args" />'
})`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => ({
  components: {
    HelloWorld
  },
  setup() {
    return {
      args
    };
  },
  template: '<HelloWorld v-bind="args" />'
})`,...r.parameters?.docs?.source}}};const m=["CustomMessage","CSSStyledMessage","CounterTest"];export{s as CSSStyledMessage,r as CounterTest,e as CustomMessage,m as __namedExportsOrder,n as default};
