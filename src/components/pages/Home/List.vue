<script setup lang="ts">

import CardText from "@/components/base/Card/CardText.vue";
import DataTable from "@/components/base/DataTable/DataTable.vue";

interface ITaskLists {
    id: number
    title: string
    description: string
    status: string
    created_at: string
}

const headers = [
    {
        prop: 'title',
        title: 'Nome',
        fixed: true,
        width: 500
    },
    {
        prop: 'dateStart',
        title: 'Data de Início',
        fixed: true,
        width: 0
    },
    {
        prop: 'dateEnd',
        title: 'Data Final',
        fixed: true,
        width: 0
    },
]

const props = defineProps<{
    list: ITaskLists[]
    text: string
    color?: string
}>()

const enumStatus = {
    pending: 'Pendente',
    completed: 'Concluído'
}

const handleItemClicked = (item) => {
    console.log(item)
}

</script>

<template>
    <main>
        <section>
            <article>
                <CardText
                    :text="text"
                    :color="color"
                />
            </article>
        </section>
        <section>
            <DataTable
                @click-row="handleItemClicked"
                :headers="headers"
                :table-data="list"
            />
        </section>
    </main>
</template>

<style lang="scss" scoped>
</style>