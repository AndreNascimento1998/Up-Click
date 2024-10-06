import Dropdown from './Dropdown.vue'
import { Meta, StoryFn } from '@storybook/vue3'

interface DropdownArgs {
    text: string
    options: Array<{ name: string, action: () => void }>
    rounded?: boolean
}

export default {
    title: 'Components/Dropdowns/Dropdown',
    component: Dropdown,
    argTypes: {
        text: { control: 'text' },
        options: {
            control: { type: 'object' },
        },
        rounded: { control: 'boolean' },
    }
} as Meta<DropdownArgs>

const Template: StoryFn<DropdownArgs> = (args: any) => ({
    components: { Dropdown },
    setup() {
        return { args }
    },
    template: '<Dropdown v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
    text: 'John Doe',
    options: [
        { name: 'action 1', action: () => alert('Action 1') },
        { name: 'action 2', action: () => alert('Action 2') },
        { name: 'action 3', action: () => alert('Action 3') },
        { name: 'action 4', action: () => alert('Action 4') },
        { name: 'action 5', action: () => alert('Action 5') },
    ]
}


export const Rounded = Template.bind({});
Rounded.args = {
    text: 'John Doe',
    rounded: true,
    options: [
        { name: 'action 1', action: () => alert('Action 1') },
        { name: 'action 2', action: () => alert('Action 2') },
        { name: 'action 3', action: () => alert('Action 3') },
        { name: 'action 4', action: () => alert('Action 4') },
        { name: 'action 5', action: () => alert('Action 5') },
    ]
};