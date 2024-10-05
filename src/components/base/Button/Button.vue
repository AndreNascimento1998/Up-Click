<script lang="ts" setup>

const emit = defineEmits(['click'])

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
        default: 'primary',
        required: false
    },
    nativeType: {
        type: String,
        default: 'button',
        required: false
    },
    outlined: {
        type: Boolean,
        default: false,
        required: false
    },
    comfortable: {
        type: Boolean,
        default: false,
        required: false
    }
})

const emitClick = () => {
    emit('click')
}

</script>

<template>
    <main>
        <el-button
            @click="emitClick"
            :type="props.type"
            :class="{ comfortable: comfortable }"
            :native-type="props.nativeType"
            style="width: 100%; font-weight: 700"
            :disabled="props.disabled"
            :plain="outlined"
        >
            {{ props.text }}
        </el-button>
    </main>
</template>

<style lang="scss" scoped>
.comfortable {
    padding: 24px;
}
</style>