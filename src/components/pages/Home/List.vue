<script setup lang="ts">

import CardText from "@/components/base/Card/CardText.vue";
import DataTable from "@/components/base/DataTable/DataTable.vue";
import ITaskList from "@/types/ITaskList.ts";
import {ref} from "vue";
import ModalHome from "@/components/pages/Home/ModalHome.vue";

const headers = [
    {
        prop: 'title',
        title: 'Nome',
        width: 300,
    },
    {
        prop: 'dateStart',
        title: 'Data de Início',
        width: 300
    },
    {
        prop: 'dateEnd',
        title: 'Data Final',
        width: 300
    },
]

const optionsDropdown = [
    {
        name: 'Editar',
        action: (item: ITaskList) => handleItemClicked(item)
    },
    {
        name: 'Deletar',
        action: (item: ITaskList) => handleRemove(item)
    }
]

const openModal = ref(false)

const itemModal = ref({} as ITaskList)

const titleDynamic = ref('')

const props = defineProps<{
    list: ITaskList[]
    text: string
    color?: string
}>()

const handleItemClicked = (item: ITaskList) => {
    openModal.value = true
    titleDynamic.value  = 'Editando Tarefa'
    itemModal.value = item
    console.log(item)
}

const handleAdd = () => {
    openModal.value = true
    titleDynamic.value  = 'Adicionar Tarefa'
    itemModal.value = {} as ITaskList
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
        <ModalHome
            v-model="openModal"
            :title-header="titleDynamic"
            :item="itemModal"
        />
    </main>
</template>

<style lang="scss" scoped>
</style>