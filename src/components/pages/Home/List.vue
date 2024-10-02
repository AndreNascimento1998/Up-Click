<script setup lang="ts">

import CardText from "@/components/base/Card/CardText.vue";
import DataTable from "@/components/base/DataTable/DataTable.vue";
import ITaskList from "@/types/ITaskList.ts";

const headers = [
    {
        prop: 'title',
        title: 'Nome',
        width: 300,
    },
    {
        prop: 'dateStart',
        title: 'Data de Início',
        width: 200
    },
    {
        prop: 'dateEnd',
        title: 'Data Final',
        width: 200
    },
]

const optionsDropdown = [
    {
        name: 'The Action 1st',
        action: () => console.log('The Action 1st')
    },
    {
        name: 'Sair',
        action: (item: ITaskList) => handleRemove(item)
    }
]

const props = defineProps<{
    list: ITaskList[]
    text: string
    color?: string
}>()

const handleItemClicked = (item: ITaskList) => {
    console.log(item)
}

const handleAdd = () => {
    console.log('Adicionar Tarefa')
}

const handleRemove = (item: ITaskList) => {
    console.log('Remover Tarefa', item)
}
</script>

<template>
    <main>
        <section>
            <article>
                <CardText
                    :text="props.text"
                    :color="props.color"
                />
            </article>
        </section>
        <section>
            <DataTable
                @click-row="handleItemClicked"
                @click-button-add="handleAdd"
                :options-dropdown="optionsDropdown"
                :headers="headers"
                :table-data="props.list"
                priority
                operation
                button-text="Adicionar Tarefa"
            />
        </section>
    </main>
</template>

<style lang="scss" scoped>
</style>