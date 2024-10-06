import { Meta, Story } from '@storybook/vue3'
import Input from './Input.vue'

interface StoryArgs {
    label: string
    placeholder: string
    disabled: boolean
    clearable: boolean
    type: 'text' | 'password | textarea'
    prop: string
    minRows: number
    maxRows: number
}

export default {
    title: 'Components/Inputs/Input',
    component: Input,
    argTypes: {
        label: { control: 'text' },
        placeholder: { control: 'text' },
        disabled: { control: 'boolean' },
        clearable: { control: 'boolean' },
        type: {
            control: { type: 'select'},
            options: ['text', 'password | textarea'],
        },
        prop: { control: 'text' },
        minRows: { control: 'number' },
        maxRows: { control: 'number' },
    },
} as Meta

const Template: Story = (args: StoryArgs) => ({
    components: { Input },
    setup() {
        return { args }
    },
    template: `
        <div style="width: 240px">
            <Input v-bind="args" />
        </div>
    `,
})

export const Default = Template.bind({})
Default.args = {
    label: 'E-mail',
    placeholder: 'Digite seu e-mail',
    disabled: false,
    clearable: false,
    type: 'text',
    prop: 'email',
}

export const Password = Template.bind({})
Password.args = {
    label: 'Senha',
    placeholder: 'Digite sua senha',
    disabled: false,
    clearable: false,
    type: 'password',
    prop: 'password',
}

export const TextArea = Template.bind({})
TextArea.args = {
    label: 'Text Area',
    placeholder: 'Digite texto grande',
    disabled: false,
    clearable: false,
    type: 'textarea',
    prop: 'description',
}