<script lang="ts" setup>
import {ref, watch} from 'vue'

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
        default: false
    },
    clearable: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'text'
    },
    prop: {
        type: String,
        default: '',
        required: true
    },
    modelValue: {
        type: String,
        default: ''
    }
})

const internalValue = ref(props.modelValue)

watch(() => props.modelValue, (newValue: string) => {
    internalValue.value = newValue
})

const handleInput = (value: string) => {
    emit('update:modelValue', value)
}
</script>

<template>
    <main class="container-input">
        <span style="font-size: 18px">{{ props.label }}</span>
        <el-form-item :prop="props.prop">
            <el-input
                v-model="internalValue"
                @input="handleInput(internalValue)"
                :disabled="props.disabled"
                :placeholder="props.placeholder"
                :clearable="props.clearable"
                :show-password="props.type === 'password'"
                :type="props.type"
            />
        </el-form-item>
    </main>
</template>

<style lang="scss" scoped>
.container-input {
    width: 100%;
}
</style>