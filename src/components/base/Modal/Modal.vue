<script setup lang="ts">
import {ref} from 'vue'

const showModal = ref(false)

const emit = defineEmits(['update:modelValue'])

const handleClick = () => {
    emit('update:modelValue', false)
}
</script>

<template>
    <el-dialog v-model="showModal" @update:modelValue="handleClick" title="Outer Dialog" >
        <slot />
    </el-dialog>
</template>
