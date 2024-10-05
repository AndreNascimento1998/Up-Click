<script setup lang="ts">
import CardText from "@/components/base/Card/CardText.vue";
import DataTable from "@/components/base/DataTable/DataTable.vue";
import ITaskList from "@/types/ITaskList.ts";
import {ref} from "vue";
import ModalHome from "@/components/pages/Home/ModalHome.vue";
import Swal from "sweetalert2";
import {TaskListStore} from "@/stores/TaskListStore.ts";

const useTasklistStore = TaskListStore()

const headers = [
    {
        prop: 'title',
        title: 'Nome',
        width: 300,
    },
    {
        prop: 'createdAt',
        title: 'Data de criação',
        width: 250
    },
    {
        prop: 'dateStart',
        title: 'Data de Início',
        width: 250
    },
    {
        prop: 'dateEnd',
        title: 'Data Final',
        width: 250
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
}

const handleAdd = () => {
    openModal.value = true
    titleDynamic.value  = 'Adicionar Tarefa'
    itemModal.value = {
        id: '',
        title: '',
        status: 'pending',
        dateStart: '',
        dateEnd: '',
        description: '',
        priority: false
    } as ITaskList
}

const handleRemove = (item: ITaskList) => {
    Swal.fire({
        title: `Você tem certeza? ${item.title} será deletado(a)!`,
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
        if (result.isConfirmed) {
            useTasklistStore.removeTask(item.id)
            useTasklistStore.fetchTask()
            Swal.fire(
                'Deletado!',
                'Sua tarefa foi deletada.',
                'success'
            )
        }
    })
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
            :isAddItem="titleDynamic === 'Adicionar Tarefa'"
            :item="itemModal"
        />
    </main>
</template>

<style lang="scss" scoped>
</style>