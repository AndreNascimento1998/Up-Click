<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'
import {dayjs} from "element-plus";

const value = ref(dayjs().format('YYYY-MM-DD'))

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
    label: string
    modelValue: string | undefined
}>()

onMounted(() => {
    if (props.modelValue) {
        value.value = props.modelValue
    } else {
        emit('update:modelValue', value.value)
    }
})

watch(() => props.modelValue, (newValue: string | undefined) => {
    if (newValue) {
        value.value = newValue
    } else {
        value.value = dayjs().format('YYYY-MM-DD')
        emit('update:modelValue', value.value)
    }
})

</script>

<template>
    <div class="container-date-picker">
        <span class="container-date-picker_label">{{ props.label }}</span>
        <el-date-picker
            style="width: 100%"
            v-model="value"
            @change="emit('update:modelValue', value)"
            type="date"
            start-placeholder="Data inicial"
            end-placeholder="Data final"
            format="DD/MM/YYYY"
            value-format="YYYY-MM-DD"
            :clearable="false"
        />

    </div>
</template>

<style scoped lang="scss">
.container-date-picker {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &_label {
        font-size: 18px;
    }
}

</style>