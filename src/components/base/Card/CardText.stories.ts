import CardText from "@/components/base/Card/CardText.vue";
import {Meta, StoryFn} from "@storybook/vue3";

interface CardTextArgs {
    text: string
    color: 'green' | 'yellow'
    dropdown?: boolean
    disabled?: boolean
}

export default {
    title: 'Components/Cards/CardText',
    component: CardText,
    argTypes: {
        text: { control: 'text' },
        color: { control: 'select', options: ['green', 'yellow'] },
        dropdown: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
} as Meta<CardTextArgs>

const Template: StoryFn<CardTextArgs> = (args: any) => ({
    components: { CardText },
    setup() {
        return { args }
    },
    template: `
        <CardText v-bind="args">
            <p>Slot</p>
            <p>Conteúdo</p>
        </CardText>
    `,
})

export const Default = Template.bind({})
Default.args = {
    text: 'Texto do CardText',
    color: 'green',
    dropdown: false,
    disabled: false,
}

export const Dropdown = Template.bind({})
Dropdown.args = {
    text: 'Texto do CardText',
    color: 'yellow',
    dropdown: true,
    disabled: false,
}