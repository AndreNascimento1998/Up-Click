import Button from "./Button.vue";
import {Meta, StoryFn} from "@storybook/vue3";

interface ButtonArgs {
    text: string,
    disabled: boolean,
    type: string,
    nativeType: string,
    outlined: boolean,
    comfortable: boolean
}

export default {
    title: 'Components/Buttons/Button',
    component: Button,
    argTypes: {
        text: { control: 'text' },
        disabled: { control: 'boolean' },
        type: {
            control: { type: 'select' },
            options: ['primary', 'success', 'info', 'warning', 'danger']
        },
        nativeType: {
            control: { type: 'select' },
            options: ['button', 'submit', 'reset']
        },
        outlined: { control: 'boolean' },
        comfortable: { control: 'boolean' }
    }
} as Meta<ButtonArgs>

const Template: StoryFn<ButtonArgs> = (args: any) => ({
    components: { Button },
    setup() {
        return { args }
    },
    template: `
        <div style="width: 240px">
            <Button v-bind="args" />
        </div>
    `
})

export const Default = Template.bind({});
Default.args = {
    text: 'Button',
    disabled: false,
    type: 'primary',
    nativeType: 'button',
    outlined: false,
    comfortable: false
};

export const Outlined = Template.bind({});
Outlined.args = {
    text: 'Button Outlined',
    disabled: false,
    type: 'warning',
    nativeType: 'button',
    outlined: true,
    comfortable: true
};
