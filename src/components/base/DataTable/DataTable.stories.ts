import DataTable from "@/components/base/DataTable/DataTable.vue"
import { Meta, StoryFn } from "@storybook/vue3"

interface DataTableArgs {
    headers: Array<{ prop: string, title: string, width: number }>
    tableData: Array<{ title: string, description: string, value: string, priority: boolean }>
    priority: boolean
    operation: boolean
    buttonText: string
    optionsDropdown: Array<{ name: string, action: () => void }>
}

export default {
    title: 'Components/Table/DataTable',
    component: DataTable,
    argTypes: {
        headers: { control: 'object' },
        tableData: { control: 'object' },
        priority: { control: 'boolean' },
        operation: { control: 'boolean' },
        buttonText: { control: 'text' },
        optionsDropdown: { control: 'object' }
    }
} as Meta<DataTableArgs>

const Template: StoryFn<DataTableArgs> = (args: any) => ({
    components: { DataTable },
    setup() {
        return { args }
    },
    template: '<DataTable v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
    headers: [
        {
            prop: 'title',
            title: 'Nome',
            width: 300,
        },
        {
            prop: 'description',
            title: 'Descrição',
            width: 300,
        },
        {
            prop: 'value',
            title: 'Valor',
            width: 300,
        },
    ],
    tableData: [
        {
            title: 'Produto 1',
            description: 'Descrição do produto 1',
            value: 'R$ 100,00',
            priority: true,
        },
        {
            title: 'Produto 2',
            description: 'Descrição do produto 2',
            value: 'R$ 200,00',
            priority: false,

        },
        {
            title: 'Produto 3',
            description: 'Descrição do produto 3',
            value: 'R$ 300,00',
            priority: true,
        },
        {
            title: 'Produto 4',
            description: 'Descrição do produto 4',
            value: 'R$ 400,00',
            priority: true,
        },
        {
            title: 'Produto 5',
            description: 'Descrição do produto 5',
            value: 'R$ 500,00',
            priority: false,
        },
    ],
    priority: true,
    operation: true,
    buttonText: 'Adicionar Produto',
    optionsDropdown: [
        {
            name: 'Ação 1',
            action: () => alert('Editar')
        },
        {
            name: 'Remover',
            action: () => console.log('Remover')
        }
    ]
}