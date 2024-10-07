import { Meta, StoryObj } from '@storybook/vue3';
import type { ComponentProps } from 'vue-component-type-helpers';
import Marquee from "./Marquee.vue";

type MarqueePropsAndCustomArgs = ComponentProps<typeof Marquee> & {
    speed?: number | undefined,
    width?: string | undefined,
    startCentered?: boolean | undefined,
    reverse?: boolean | undefined,
    bounce?: boolean | undefined,
    content?: string,
};

const meta: Meta<MarqueePropsAndCustomArgs> = {
    title: 'History/Marquee',
    component: Marquee,
    argTypes: {
        speed: { control: 'number' },
        width: { control: 'text' },
        startCentered: { control: 'boolean' },
        reverse: { control: 'boolean' },
        bounce: { control: 'boolean' },
        content: { control: 'text', description: 'HTML content for the slot' },
    },
    render: (args) => ({
        components: { Marquee },
        setup() {
            return { args };
        },
        template: `
          <marquee v-bind="args">
            <template v-slot:default>
              <div v-if="args.content" v-html="args.content" />
            </template>
          </marquee>
        `,
    }),
};
export default meta;

type Story = StoryObj<MarqueePropsAndCustomArgs>;

export const Primary: Story = {
    args: {
        content: 'Scrolling element goes here!',
    },
};