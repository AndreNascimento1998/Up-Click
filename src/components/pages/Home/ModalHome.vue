<script setup lang="ts">
import Modal from "@/components/base/Modal/Modal.vue"
import {computed, reactive, ref, watch} from "vue"
import ITaskList from "@/types/ITaskList.ts"
import Input from "@/components/base/Inputs/Input.vue"
import CardText from "@/components/base/Card/CardText.vue"
import DatePicker from "@/components/base/Inputs/DatePicker.vue"
import Button from "@/components/base/Button/Button.vue"
import FlagPriorityIcon from "@/assets/icons/Home/FlagPriorityIcon.vue"
import {ElForm, ElNotification} from "element-plus"
import useValidation from "@/composables/useValidation.ts"
import {TaskListStore} from "@/stores/TaskListStore.ts"
import {GlobalStore} from "@/stores/useGlobalStore.ts";

interface IForm {
    id?: string
    title: string
    status: string
    date: string[]
    description: string
    priority: boolean | undefined
    createdAt?: string
}

const openModal = ref(false)

const useGlobalStore = GlobalStore()

const useTaskListStore = TaskListStore()

const form = reactive<IForm>({
    id: '',
    title: '',
    status: 'pending' as string,
    date: [],
    description: '',
    priority: false as boolean | undefined,
    createdAt: ''
})

const { minLength, required } = useValidation

const rules = computed(() => ({
    title: minLength,
    description: required
}))

const formRef = ref<InstanceType<typeof ElForm> | null>(null)

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
    titleHeader: string
    item: ITaskList
    isAddItem?: boolean
}>()

const loading = computed(() => useGlobalStore.loading)

watch(() => props.item, (newValue: ITaskList) => {
    if (newValue) {
        form.id = newValue.id
        form.title = newValue.title
        form.status = newValue.status
        form.date = [newValue.dateStart,  newValue.dateEnd]
        form.description = newValue.description
        form.priority = newValue.priority
        form.createdAt = newValue.createdAt
    }
})

const handleClick = () => {
    emit('update:modelValue', openModal.value)
}

const saveTask = async () => {
    const dataFormat = parsedForm()
    formRef.value?.validate( async (valid) => {
        if (valid) {
            await useTaskListStore.addTask(dataFormat)
            resetData()
            ElNotification({
                title: 'Sucesso',
                message: 'Tarefa salva com sucesso',
                type: 'success'
            })
            await useTaskListStore.fetchTask()
            openModal.value = false
        } else {
            console.log('Erro ao validar o formulário')
        }
    })
}

const editTask = async () => {
    const dataFormat = parsedForm()
    formRef.value?.validate( async (valid) => {
        if (valid) {
            await useTaskListStore.editTask(dataFormat)
            ElNotification({
                title: 'Sucesso',
                message: 'Tarefa salva com sucesso',
                type: 'success'
            })
            await useTaskListStore.fetchTask()
            openModal.value = false
        } else {
            console.log('Erro ao validar o formulário')
        }
    })
}

const resetData = () => {
    form.title = ''
    form.status = 'pending'
    form.date = []
    form.description = ''
    form.priority = false
}

const parsedForm = () => {
    return {
        id: form.id,
        title: form.title,
        status: form.status,
        dateStart: form.date[0],
        dateEnd: form.date[1],
        description: form.description,
        priority: form.priority,
        createdAt: form.createdAt
    }
}

</script>

<template>
    <Modal
        v-model="openModal"
        @update:modelValue="handleClick"
        :title="props.titleHeader"
        :modal-update="openModal"
    >
        <el-form :model="form" :rules="rules" ref="formRef">
            <main class="container-modal-home">
                <CardText
                    :text="form.status === 'completed' ? 'Tarefa concluída' : 'Tarefa pendente'"
                    :color="form.status === 'completed' ? 'green' : 'yellow'"
                    dropdown
                    :disabled="loading"
                >
                    <article class="container-modal-home_options-modal">
                        <div
                            @click="form.status = 'completed'"
                            class="container-modal-home_options-modal_item"
                        >
                            <span class="container-modal-home_options-modal_item_circle-green"></span> <span>Tarefa concluída</span>
                        </div>
                        <div
                            @click="form.status = 'pending'"
                            class="container-modal-home_options-modal_item"
                        >
                            <span class="container-modal-home_options-modal_item_circle-yellow"></span> <span>Tarefa pedente</span>
                        </div>
                    </article>
                </CardText>
                <h1 v-if="form.title">{{ form.title }}</h1>
                <h1 v-else>Título exemplo</h1>
                <section class="container-modal-home_priority">
                    <span>Defina a prioridade: </span>
                    <FlagPriorityIcon style="cursor: pointer" @click="form.priority = !form.priority" :color="form.priority ? '#E60000FF': '#000'" />
                </section>
                <section class="container-modal-home_input-section">
                    <Input
                        v-model="form.title"
                        placeholder="Digite o título"
                        clearable
                        :disabled="loading"
                        prop="title"
                        label="Digite o título"
                    />
                    <section>
                        <DatePicker
                            v-model="form.date"
                            :disabled="loading"
                            label="Escolha a data inicial e final"
                        />
                    </section>
                </section>
                <Input
                    v-model="form.description"
                    prop="description"
                    label="Descrição"
                    :disabled="loading"
                    type="textarea"
                />
                <section style="display: flex; text-align: center; align-self: center">
                    <Button
                        v-if="props.isAddItem"
                        @click="saveTask"
                        style="width: 200px"
                        :disabled="loading"
                        text="Salvar"
                    />
                    <Button
                        v-else
                        @click="editTask"
                        type="warning"
                        :disabled-="loading"
                        style="width: 200px"
                        text="Editar"
                    />
                </section>
            </main>
        </el-form>
    </Modal>
</template>

<style lang="scss" scoped>
.container-modal-home {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    h1 {
        font-size: 1.5rem;
        font-weight: bold;
    }

    &_options-modal {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 1rem;

        &_item {
            display: flex;
            gap: 8px;
            color: #2b2b2b;
            cursor: pointer;
            transition: 0.3s;
            text-transform: uppercase;
            &:hover {
                scale: 1.2;
                color: $title-color;
            }

            &_circle-yellow {
                display: flex;
                flex-direction: column;
                gap: 4px;
                align-items: center;
                width: 16px;
                height: 16px;
                background-color: $bg-card-secondary;
                border-radius: 50%;
                border: 2px solid black;
            }

            &_circle-green {
                display: flex;
                flex-direction: column;
                gap: 4px;
                width: 16px;
                height: 16px;
                background-color: $bg-card-text;
                border-radius: 50%;
                border: 2px solid black;
            }
        }
    }

    &_input-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        @media (min-width: $md) {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1rem;
        }
    }

    &_priority {
        display: flex;
        gap: 2px;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
    }
}
</style>