<script lang="ts" setup>

const emits = defineEmits(['click'])

const props = defineProps({
    text: {
        type: String,
        default: 'Button',
        required: true
    },
    disabled: {
        type: Boolean,
        default: false,
        required: false
    },
    type: {
        type: String,
        default: 'Button',
        required: false
    },
    nativeType: {
        type: String,
        default: 'button',
        required: false
    },
})
</script>

<template>
    <main>
        <el-button
            @click="() => emits('click')"
            type="primary"
            :native-type="nativeType"
            style="width: 100%"
            :disabled="disabled"
        >
            {{ text }}
        </el-button>
    </main>
</template>