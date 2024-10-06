import DatePicker from "@/components/base/Inputs/DatePicker.vue";
import {Meta} from "@storybook/vue3";

interface StoryArgs {
    label: string
    modelValue: string[]
    disabled: boolean
}

export default {
    title: 'Components/Inputs/DatePicker',
    component: DatePicker,
    argTypes: {
        label: { control: 'text' },
        modelValue: { control: 'array' },
        disabled: { control: 'boolean' },
    },
} as Meta

export const Default = (args: StoryArgs) => ({
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

Default.args = {
    label: 'Data',
    modelValue: [],
    disabled: false,
}
