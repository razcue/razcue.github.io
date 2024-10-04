import { Meta, StoryFn } from '@storybook/vue3';
import Marquee from "./Marquee.vue";

export default {
    title: 'History/Marquee',
    component: Marquee,
    argTypes: {
        speed: { control: 'number' },
        width: { control: 'text' },
        startCentered: { control: 'boolean' },
        reverse: { control: 'boolean' },
        bounce: { control: 'boolean' },
    },
} as Meta<typeof Marquee>;

const Template: StoryFn<typeof Marquee> = (args) => ({
    components: { Marquee },
    setup() {
        return { args };
    },
    template: '<Marquee v-bind="args" ><p>testing</p></Marquee>',
});

export const ExampleMarquee = Template.bind({});