<script setup lang="ts">
import {ref} from 'vue'

const showModal = ref(false)

const emit = defineEmits(['update:modelValue'])

const handleClick = () => {
    emit('update:modelValue', false)
}
</script>

<template>
    <el-dialog
        v-model="showModal"
        @update:modelValue="handleClick"
        class="width"
        title="Outer Dialog"
        width="80%"
    >
        <slot />
    </el-dialog>
</template>

<style lang="scss" scoped></style>