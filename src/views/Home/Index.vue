<script lang="ts" setup>
import Header from "@/views/Header/Index.vue"
import ListIcon from "@/assets/icons/Home/ListIcon.vue"
import List from "@/components/pages/Home/List.vue"
import {computed, onMounted} from "vue"
import ITaskList from "@/types/ITaskList.ts"
import dayjs from "dayjs"
import {TaskListStore} from "@/stores/TaskListStore.ts";

const useTaskListStore = TaskListStore()

onMounted(async () => {
    await useTaskListStore.fetchTask()
})

const taskList = computed<ITaskList[]>(() => {
    if (useTaskListStore.taskList) {
        return useTaskListStore.taskList
    }
    return []
})

const taskListFormat = computed( () =>
    taskList.value.map(task => {
        return {
            ...task,
            createdAt: task.createdAt ? dayjs(task.createdAt).format('YYYY-MM-DD') : null
        }
    }))

const pendingTasks = computed( () => {

    if (taskListFormat.value && taskListFormat.value.length > 0){
        return taskListFormat.value.filter(task => task.status === 'pending') as ITaskList[]
    }
    return []
})

const completedTasks = computed( () => {
    if (taskListFormat.value && taskListFormat.value.length > 0) {
        return taskListFormat.value.filter(task => task.status === 'completed') as ITaskList[]
    }
    return []
})

</script>

<template>
    <main class="container-home">
        <Header />
        <section class="container-home_section-home">
            <article class="container-home_section-home_header">
                <div class="container-home_section-home_header_text-list">
                    <ListIcon style="align-self: center"/>
                    <span>Lista</span>
                </div>
            </article>
            <section class="container-home_section-home_list">
                <List
                    :list="completedTasks"
                    text="Tarefa concluído"
                    color="green"
                />
                <List
                    :list="pendingTasks"
                    text="Tarefa pendente"
                />
            </section>
        </section>
    </main>
</template>

<style lang="scss">
.container-home {

    &_section-home {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        gap: 2rem;

        @media (min-width: $xl) {
            padding: 2rem 10rem;
        }

        &_header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            &_text-list {
                font-size: 28px;
                display: flex;
                gap: 4px;
            }
        }

        &_list {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
    }
}
</style>