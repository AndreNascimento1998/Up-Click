<script setup lang="ts">
import Modal from "@/components/base/Modal/Modal.vue"
import {reactive, ref, watch} from "vue"
import ITaskList from "@/types/ITaskList.ts";
import Input from "@/components/base/Inputs/Input.vue";
import CardText from "@/components/base/Card/CardText.vue";
import DatePicker from "@/components/base/Inputs/DatePicker.vue";
import Button from "@/components/base/Button/Button.vue";

const openModal = ref(false)

const form = reactive({
    title: '',
    status: '',
    date: [],
    description: ''
})

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
    titleHeader: string
    item: ITaskList
}>()

watch(() => props.item, (newValue: ITaskList) => {
    form.title = newValue.title
    form.status = newValue.status
    form.date = [newValue.dateStart, newValue.dateEnd]
    form.description = newValue.description
})

const handleClick = () => {
    emit('update:modelValue', false)
}

const saveTask = () => {
    console.log(form)
}

</script>

<template>
    <Modal
        v-if="!openModal"
        v-model="openModal"
        @update:modelValue="handleClick"
        :title="props.titleHeader"
    >
        <main class="container-modal-home">
            <CardText
                :text="form.status === 'completed' ? 'Tarefa concluída' : 'Tarefa pendente'"
                :color="form.status === 'completed' ? 'green' : 'yellow'"
                dropdown

            >
                <article class="container-modal-home_options-modal">
                    <span
                        @click="form.status = 'completed'"
                        class="container-modal-home_options-modal_item"
                    >
                        <div class="container-modal-home_options-modal_item_circle-green"></div> <div>Tarefa concluída</div>
                    </span>
                    <span
                        @click="form.status = 'pending'"
                        class="container-modal-home_options-modal_item"
                    >
                        <div class="container-modal-home_options-modal_item_circle-yellow"></div> <div>Tarefa pedente</div>
                    </span>
                </article>
            </CardText>
            <h1 v-if="form.title">{{ form.title }}</h1>
            <h1 v-else>Título exemplo</h1>
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
                        v-model="form.date"
                        label="Escolha da inicial e final"
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
                    style="width: 200px"
                    text="Salvar"
                    @click="handleClick"
                />
            </section>
        </main>
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
        display: block;

        @media (min-width: $md) {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
    }
}
</style>