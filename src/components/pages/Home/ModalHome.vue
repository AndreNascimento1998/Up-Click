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

const openModal = ref(false)

const useTaskListStore = TaskListStore()

const form = reactive<ITaskList>({
    title: '',
    status: 'pending' as string,
    dateStart: '',
    dateEnd: '',
    description: '',
    priority: false as boolean | undefined
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
}>()

watch(() => props.item, (newValue: ITaskList) => {
    if (newValue) {
        form.title = newValue.title
        form.status = newValue.status
        form.dateStart = newValue.dateStart
        form.dateEnd =  newValue.dateEnd
        form.description = newValue.description
        form.priority = newValue.priority
    }
})

const handleClick = () => {
    emit('update:modelValue', openModal.value)
}

const saveTask = async () => {
    formRef.value?.validate( async (valid) => {
        if (valid) {
            await useTaskListStore.addTask(form)
            resetData()
            ElNotification({
                title: 'Sucesso',
                message: 'Tarefa salva com sucesso',
                type: 'success'
            })
            openModal.value = false
            await useTaskListStore.fetchTask()
        } else {
            console.log('Erro ao validar o formulário')
        }
    })
}

const resetData = () => {
    form.title = ''
    form.status = 'pending'
    form.dateStart = ''
    form.dateEnd = ''
    form.description = ''
    form.priority = false
}

</script>

<template>
    <Modal
        v-model="openModal"
        @update:modelValue="handleClick"
        :title="props.titleHeader"
    >
        <el-form :model="form" :rules="rules" ref="formRef">
            <main class="container-modal-home">
                <CardText
                    :text="form.status === 'completed' ? 'Tarefa concluída' : 'Tarefa pendente'"
                    :color="form.status === 'completed' ? 'green' : 'yellow'"
                    dropdown

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
                    <span>Prioridade: </span>
                    <FlagPriorityIcon style="cursor: pointer" @click="form.priority = !form.priority" :color="form.priority ? '#E60000FF': '#000'" />
                </section>
                <section class="container-modal-home_input-section">
                    <Input
                        v-model="form.title"
                        placeholder="Digite o título"
                        clearable
                        prop="title"
                        label="Digite o título"
                    />
                    <section>
                        <DatePicker
                            v-model="form.dateStart"
                            label="Escolha a data inicial"
                        />
                    </section>
                    <section>
                        <DatePicker
                            v-model="form.dateEnd"
                            label="Escolha a data final"
                        />
                    </section>
                </section>
                <Input
                    v-model="form.description"
                    prop="description"
                    label="Descrição"
                    type="textarea"
                />
                <section style="display: flex; text-align: center; align-self: center">
                    <Button
                        @click="saveTask"
                        style="width: 200px"
                        text="Salvar"
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