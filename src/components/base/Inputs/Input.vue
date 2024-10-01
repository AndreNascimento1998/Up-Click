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
        <span>{{ props.label }}</span>
        <el-form-item :prop="props.prop">
            <el-input
                v-model="value"
                @input="emit('update:modelValue', value)"
                :disabled="props.disabled"
                :placeholder="props.placeholder"
                :clearable="props.clearable"
                :show-password="props.type === 'password'"
                :type="props.type"
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