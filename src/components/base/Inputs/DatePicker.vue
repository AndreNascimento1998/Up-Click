<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'
import {dayjs} from "element-plus";

const value = ref([
    dayjs().format('YYYY-MM-DD'),
    dayjs().format('YYYY-MM-DD')
])

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
    label: string
    modelValue: string[]
}>()

onMounted(() => {
    console.log('mounted')
    if (props.modelValue && props.modelValue[0]) {
        value.value = props.modelValue
    }
})

watch(() => props.modelValue, (newValue: string[]) => {
    console.log('watch')
    if (newValue && newValue[0]) {
        value.value = newValue
    } else {
        value.value = [
            dayjs().format('YYYY-MM-DD'),
            dayjs().format('YYYY-MM-DD')
        ]
    }
})

</script>

<template>
    <div class="container-date-picker">
        <span class="container-date-picker_label">{{ props.label }}</span>
        <el-date-picker
            style="width: 90%"
            v-model="value"
            @change="emit('update:modelValue', value)"
            type="daterange"
            start-placeholder="Data inicial"
            end-placeholder="Data final"
            :default-value="value"
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

    @media (max-width: 768px) {
        .el-date-picker {
            width: 100%;
        }

        .el-date-editor.el-input, .el-date-editor.el-input__wrapper {
            width: 100%;
        }

        .el-date-range-picker__content {
            flex-direction: column !important; /* Garante que os calendários fiquem empilhados */
        }
    }
}

</style>