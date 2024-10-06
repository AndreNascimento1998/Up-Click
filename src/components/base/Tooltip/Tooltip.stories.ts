import Tooltip from "@/components/base/Tooltip/Tooltip.vue"
import {Meta, StoryFn} from "@storybook/vue3"

interface TooltipArgs {
    text: string
}

export default {
    title: 'Components/Tooltips/Tooltip',
    component: Tooltip,
    argTypes: {
        text: { control: 'text' },
    },
} as Meta<TooltipArgs>

const Template: StoryFn<TooltipArgs> = (args: any) => ({
    components: { Tooltip },
    setup() {
        return { args }
    },
    template: `
        <Tooltip v-bind="args">
            Passe o mouse aqui
        </Tooltip>
    `,
})

export const Default = Template.bind({})
Default.args = {
    text: 'Texto do Tooltip'
}