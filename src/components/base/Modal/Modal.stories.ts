import Modal from "@/components/base/Modal/Modal.vue"
import Button from "@/components/base/Button/Button.vue"
import {Meta, StoryFn} from "@storybook/vue3"
import {ref} from 'vue'

interface ModalArgs {
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
} as Meta<ModalArgs>

const Template: StoryFn<ModalArgs> = (args: ModalArgs) => ({
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

export const Default = Template.bind({
    title: 'Título do Modal',
    modalUpdate: false,
    modelValue: false,
})
