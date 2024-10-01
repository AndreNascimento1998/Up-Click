import Button from "./Button.vue";
import {Meta, Story} from "@storybook/vue3";


export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        text: { control: 'text' },
        disabled: { control: 'boolean'},
        type: {
            control: { type: 'select'},
            options: ['primary', 'success', 'info', 'warning', 'danger']
        },
        nativeType: {
            control: { type: 'select' },
            options: ['button', 'submit', 'reset']
        }
    }
} as Meta

const Template: Story = (args) => ({
    components: { Button },
    setup() {
        return { args}
    },
    template: `
        <div style="width: 240px">
            <Button v-bind="args" />
        </div>
    `
})

export const Default = Template.bind({})
Default.args = {
    text: 'Button',
    disabled: false,
    type: 'primary',
    nativeType: 'button'
}