<script lang="ts" setup>
import ITaskList from "@/types/ITaskList.ts"
import FlagPriorityIcon from "@/assets/icons/Home/FlagPriorityIcon.vue"
import Button from "@/components/base/Button/Button.vue"
import Dropdown from "@/components/base/Dropdown/Dropdown.vue"
import dayjs from "dayjs"
import Tooltip from "@/components/base/Tooltip/Tooltip.vue";

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
    disabled?: boolean
    optionsDropdown?: {
        name: string
        action: (item: ITaskList) => void
    }[] | undefined
}>()

const handleAdd = () => {
    emit('click-button-add')
}

const formatDate = (date: string) => {
    return dayjs(date).format('DD/MM/YYYY')
}

const formatDescription = (description: string) => {
    return description.length > 68 ? `${description.substring(0, 68)}...` : description
}
</script>

<template>
    <el-table :data="props.tableData" style="width: 100%; font-size: 18px;">
        <el-table-column
            v-for="header in props.headers"
            :key="header.prop"
            :prop="header.prop"
            :label="header.title"
            :width="header.width"
        >
            <template #default="scope">
                <span v-if="header.prop === 'description'">
                    <Tooltip
                        v-if="scope.row[header.prop].length > 68"
                        :text="scope.row[header.prop]"
                    >
                        {{ formatDescription(scope.row[header.prop]) }}
                    </Tooltip>
                    <span v-else>
                        {{ scope.row[header.prop] }}
                    </span>
                </span>
                <span v-else-if="
                    header.prop === 'createdAt' ||
                    header.prop === 'dateStart' ||
                    header.prop === 'dateEnd'"

                >
                    {{ formatDate(scope.row[header.prop]) }}
                </span>
                <span v-else style="cursor: pointer">
                  {{ scope.row[header.prop] }}
                </span>
            </template>
        </el-table-column>
        <el-table-column v-if="props.priority" label="Prioridade" min-width="300">
            <template #default="scope">
                <FlagPriorityIcon :color="scope.row.priority ? '#E60000FF': '#000'" />
            </template>
        </el-table-column>
        <el-table-column v-if="props.operation" fixed="right" label="Ações" width="140">
            <template #default="scope">
                <div style="width: 100px">
                    <Dropdown
                        text="Gerenciar"
                        :item="scope.row"
                        :options="props.optionsDropdown"
                    />
                </div>
            </template>
        </el-table-column>
    </el-table>
    <Button
        v-if="props.buttonText"
        type="primary"
        :disabled="disabled"
        :text="props.buttonText"
        @click="handleAdd"
        outlined
        style="font-size: 16px"
    />
</template>

<style lang="scss" scoped></style>
