import DatePicker from "@/components/base/Inputs/DatePicker.vue";
import {Meta, StoryFn} from "@storybook/vue3";

interface DatepickerArgs {
    label: string
    modelValue: string[]
    disabled: boolean
}

export default {
    title: 'Components/Inputs/DatePicker',
    component: DatePicker,
    argTypes: {
        label: { control: 'text' },
        modelValue: { control: 'object' },
        disabled: { control: 'boolean' },
    },
} as Meta<DatepickerArgs>

export const Template: StoryFn<DatepickerArgs> = (args: any) => ({
    components: { DatePicker },
    setup() {
        return { args }
    },
    template: `
        <div style="width: 240px">
            <DatePicker v-bind="args" />
        </div>
    `,
})

export const Default = Template.bind({})
Default.args = {
    label: 'Data',
    modelValue: [],
    disabled: false,
}
