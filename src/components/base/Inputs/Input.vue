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
    },
    prop: {
        type: String,
        default: '',
        required: true
    }
})

const value = ref('')
</script>

<template>
    <main class="container-input">
        <span>{{ label }}</span>
        <el-form-item :prop="prop">
            <el-input
                v-model="value"
                @input="emit('update:modelValue', value)"
                :disabled="disabled"
                :placeholder="placeholder"
                :clearable="clearable"
                :show-password="type === 'password'"
                :type="type"
            />
        </el-form-item>
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