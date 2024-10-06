import Modal from "@/components/base/Modal/Modal.vue"
import Button from "@/components/base/Button/Button.vue"
import {Meta, Story} from "@storybook/vue3"
import {ref} from 'vue'

interface StoryArgs {
    title: string
    modalUpdate?: boolean
    modelValue: boolean
}

export default {
    title: "Components/Modals/Modal",
    component: Modal,
    argTypes: {
        title: { control: "text" },
        modalUpdate: { control: "boolean" },
        modelValue: { control: "boolean" },
    },
} as Meta

const Template: Story = (args: StoryArgs) => ({
    components: { Modal, Button },
    setup() {
        const showModal = ref(args.modelValue)
        const toggleModal = () => {
            showModal.value = !showModal.value
        }
        return { showModal, toggleModal, title: args.title, modalUpdate: args.modalUpdate }
    },
    template: `
        <div style="width: 200px">
            <Button @click="toggleModal" text="Abrir Modal" />
        </div>
        <Modal :title="title" :modalUpdate="modalUpdate" v-model="showModal">
            <p>Conteúdo do modal</p>
            <p>Conteúdo do modal</p>
            <p>Conteúdo do modal</p>
            <p>Conteúdo do modal</p>
        </Modal>
    `,
})

export const Default = Template.bind({})
Default.args = {
    title: 'Título do Modal',
    modalUpdate: false,
    modelValue: false,
}