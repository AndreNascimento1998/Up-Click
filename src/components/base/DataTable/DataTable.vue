<script lang="ts" setup>
import dayjs from 'dayjs'

const now = new Date()

const emit = defineEmits(['click-row'])

const props = defineProps<{
    headers: {
        prop: string
        title: string
        fixed: boolean
        width: number
    }[]
    tableData: {
        id: string
        title: string
        description: string
        status: string
        dateStart: string
        dateEnd: string
        priority: boolean
    }[]
}>()

const deleteRow = (index: number) => {
    tableData.value.splice(index, 1)
}

const onAddItem = () => {
    now.setDate(now.getDate() + 1)
    tableData.value.push({
        date: dayjs(now).format('YYYY-MM-DD'),
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    })
}

const handleClickRow = (item) => {
    emit('click-row', item)
}
</script>

<template>
    <el-table @row-click="handleClickRow" :data="props.tableData" style="width: 100%; font-size: 18px">
        <el-table-column
            v-for="header in props.headers"
            :key="header.prop"
            :fixed="header.fixed"
            :prop="header.prop"
            :label="header.title"
            :width="header.width"
        />
        <el-table-column  label="Prioridade" min-width="120">
            <template #default="scope">
                <el-button
                    link
                    type="primary"
                    size="small"
                    @click.prevent="deleteRow(scope.$index)"
                    style="font-size: 16px"
                >
                    Remover
                </el-button>
            </template>
        </el-table-column>
        <el-table-column  label="Operação" min-width="120">
            <template #default="scope">
                <el-button
                    link
                    type="primary"
                    size="small"
                    @click.prevent="deleteRow(scope.$index)"
                    style="font-size: 16px"
                >
                    Remover
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-button class="mt-4" style="width: 100%" @click="onAddItem">
        Adicionar Item
    </el-button>
</template>

<style lang="scss" scoped>
.el-scrollbar__wrap--hidden-default  {
    cursor: pointer !important;
}
</style>