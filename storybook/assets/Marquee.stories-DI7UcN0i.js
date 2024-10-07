import t from"./__federation_expose_Marquee-n6odJGIb.js";const n={title:"History/Marquee",component:t,argTypes:{speed:{control:"number"},width:{control:"text"},startCentered:{control:"boolean"},reverse:{control:"boolean"},bounce:{control:"boolean"},content:{control:"text",description:"HTML content for the slot"}},render:r=>({components:{Marquee:t},setup(){return{args:r}},template:`
          <marquee v-bind="args">
            <template v-slot:default>
              <div v-if="args.content" v-html="args.content" />
            </template>
          </marquee>
        `})},e={args:{content:"Scrolling element goes here!"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    content: 'Scrolling element goes here!'
  }
}`,...e.parameters?.docs?.source}}};const a=["Primary"];export{e as Primary,a as __namedExportsOrder,n as default};
