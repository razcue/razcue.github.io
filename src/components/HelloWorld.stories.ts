import { Meta, StoryFn } from '@storybook/vue3';
import HelloWorld from './HelloWorld.vue';

export default {
    title: 'Example/HelloWorld',
    component: HelloWorld,
    argTypes: {
        msg: { control: 'text' },
    },
} as Meta<typeof HelloWorld>;

const Template: StoryFn<typeof HelloWorld> = (args) => ({
    components: { HelloWorld },
    setup() {
        return { args };
    },
    template: '<HelloWorld v-bind="args" />',
});

export const CustomMessage = Template.bind({});
CustomMessage.args = {
    msg: 'Hello from a custom message!',
};

export const CSSStyledMessage = Template.bind({});
CSSStyledMessage.args = {
    msg: 'Check out this styled message!',
};

export const CounterTest = Template.bind({});
CounterTest.args = {
    msg: 'Click the button to increase the count.',
};