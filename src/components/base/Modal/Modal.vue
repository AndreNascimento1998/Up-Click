<script setup lang="ts">
import { ref, watch } from 'vue'

const showModal = ref(false)

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
    modelValue: boolean,
    title?: string,
    modalUpdate?: boolean
}>()

watch(() => props.modelValue, (newValue) => {
    showModal.value = newValue
})

watch(() => props.modalUpdate, (newValue) => {
    showModal.value = newValue
})

const handleClick = () => {
    emit('update:modelValue', showModal.value)
}

const handleClickClose = () => {
    emit('update:modelValue', false)
}

</script>

<template>
    <el-dialog
        v-model="showModal"
        @open="handleClick"
        @close="handleClickClose"
        class="width"
        :title="props.title"
        width="80%"
    >
        <slot />
    </el-dialog>
</template>
