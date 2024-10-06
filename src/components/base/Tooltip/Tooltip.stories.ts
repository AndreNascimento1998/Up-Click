import Tooltip from "@/components/base/Tooltip/Tooltip.vue"
import {Meta, Story} from "@storybook/vue3"

interface StoryArgs {
    text: string
}

export default {
    title: 'Components/Tooltip',
    component: Tooltip,
    argTypes: {
        text: { control: 'text' },
    },
} as Meta

const Template: Story = (args: StoryArgs) => ({
    components: { Tooltip },
    setup() {
        return { args }
    },
    template: `
        <Tooltip v-bind="args">
            Passa o mouse aqui
        </Tooltip>
    `,
})

export const Default = Template.bind({})
Default.args = {
    text: 'Texto do Tooltip'
}