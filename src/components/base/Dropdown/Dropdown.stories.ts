import Dropdown from './Dropdown.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
    title: 'Components/Dropdown',
    component: Dropdown,
    argTypes: {
        userName: { control: 'text' },
        options: {
            control: { type: 'object' },
        }
    }
} as Meta

const Template: StoryFn = (args) => ({
    components: { Dropdown },
    setup() {
        return { args };
    },
    template: '<Dropdown v-bind="args" />'
});

export const Default = Template.bind({});
Default.args = {
    userName: 'John Doe',
    options: [
        { name: 'action 1', action: () => alert('Action 1') },
        { name: 'action 2', action: () => alert('Action 2') },
        { name: 'action 3', action: () => alert('Action 3') },
        { name: 'action 4', action: () => alert('Action 4') },
        { name: 'action 5', action: () => alert('Action 5') },
    ]
};
