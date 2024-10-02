<script lang="ts" setup>

import {computed} from "vue";
import List from "@/components/pages/Home/List.vue";

interface ITaskLists {
    id: number
    title: string
    description: string
    status: string
    created_at: string
}

const props = defineProps<{
    taskList: ITaskLists[];
}>()

const pendingTasks = computed( () => {

    if (props.taskList && props.taskList.length > 0){
        return props.taskList.filter(task => task.status === 'pending')
    }
    return []
})

const completedTasks = computed( () => {
    if (props.taskList && props.taskList.length > 0) {
        return props.taskList.filter(task => task.status === 'completed')
    }
    return []
})

</script>

<template>
    <main class="container-task-list">
        <List
            :list="completedTasks"
            text="Tarefa concluído"
            color="green"
        />
        <List
            :list="pendingTasks"
            text="Tarefa pendente"
        />
    </main>
</template>

<style lang="scss" scoped>
.container-task-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
</style>