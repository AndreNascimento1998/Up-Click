<script lang="ts" setup>
import { ref } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    label: {
      type: String,
      default: '',
      required: true
    },
    placeholder: {
        type: String,
        default: '',
        required: false
    },
    disabled: {
        type: Boolean,
        default: false,
        required: false
    },
    clearable: {
        type: Boolean,
        default: false,
        required: false
    },
    type: {
        type: String,
        default:  'text',
        required: false
    }
})

const value = ref('')
</script>

<template>
    <main class="container-input">
        <span>{{ label }}</span>
        <el-input
            v-model="value"
            @input="emit('update:modelValue', value)"
            :disabled="disabled"
            :placeholder="placeholder"
            :clearable="clearable"
            :show-password="type === 'password'"
            :type="type"
        />
    </main>
</template>

<style scoped lang="scss">

.container-input {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
}
</style>