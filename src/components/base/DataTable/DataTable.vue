<script lang="ts" setup>
import ITaskList from "@/types/ITaskList.ts"
import FlagPriorityIcon from "@/assets/icons/Home/FlagPriorityIcon.vue"
import Button from "@/components/base/Button/Button.vue"
import Dropdown from "@/components/base/Dropdown/Dropdown.vue";
import {onMounted, ref} from "vue";

const emit = defineEmits(['click-row', 'click-button-add'])

const props = defineProps<{
    headers: {
        prop: string
        title: string
        width: number
    }[]
    tableData: {
        id: string
        title: string
        description: string
        status: string
        dateStart: string
        dateEnd: string
        priority?: boolean
    }[]
    priority?: boolean
    operation?: boolean
    buttonText?: string
    optionsDropdown?: {
        name: string
        action: (item: ITaskList) => void
    }[]
}>()

const tabletWidth = ref(false)

onMounted(() => {
    tabletWidth.value = window.innerWidth <= 1024
})

const handleClickRow = (item: ITaskList) => {
    if (!tabletWidth.value) {
        emit('click-row', item)
    }
}

const handleAdd = () => {
    emit('click-button-add')
}

</script>

<template>
    <el-table @row-click="handleClickRow" :data="props.tableData" style="width: 100%; font-size: 18px; cursor: pointer">
        <el-table-column
            v-for="header in props.headers"
            :key="header.prop"
            :prop="header.prop"
            :label="header.title"
            :width="header.width"
        />
        <el-table-column v-if="props.priority" label="Prioridade" min-width="300">
            <template #default="scope">
                <FlagPriorityIcon :color="props.tableData[scope.$index].priority ? '#E60000FF': '#000'" />
            </template>
        </el-table-column>
        <el-table-column v-if="props.operation" fixed="right" label="Operação" width="140" >
            <template #default="scope">
                <div style="width: 100px">
                    <Dropdown
                        text="Opções"
                        :item="props.tableData[scope.$index]"
                        :options="props.optionsDropdown"
                    />
                </div>
            </template>
        </el-table-column>
    </el-table>
    <Button
        v-if="props.buttonText"
        type="primary"
        :text="props.buttonText"
        @click="handleAdd"
        outlined
        style="font-size: 16px"
    />
</template>

<style lang="scss" scoped></style>