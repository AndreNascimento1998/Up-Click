<script setup lang="ts">
import Modal from "@/components/base/Modal/Modal.vue"
import {reactive, ref, watch} from "vue"
import ITaskList from "@/types/ITaskList.ts";
import Input from "@/components/base/Inputs/Input.vue";

const openModal = ref(false)

const form = reactive({
    title: ''
})

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
    titleHeader: string
    item: ITaskList
}>()

watch(() => props.item, (newValue: ITaskList) => {
    form.title = newValue.title
})

const handleClick = () => {
    emit('update:modelValue', false)
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
            <h1 v-if="form.title">{{ form.title }}</h1>
            <h1 v-else>Título exemplo</h1>
            <section>
                <Input
                    v-model="form.title"
                    clearable
                    prop="title"
                    label="Digite o título"
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
}
</style>