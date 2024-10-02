<script lang="ts" setup>
import Header from "@/views/Header/Index.vue";
import Button from "@/components/base/Button/Button.vue";
import ListIcon from "@/assets/icons/Home/ListIcon.vue";
import tasks from '@/mocks/tasks.json'
import List from "@/components/pages/Home/List.vue";
import {computed, ref} from "vue";
import ITaskList from "@/types/ITaskList.ts";

const taskList = ref<ITaskList[]>(tasks)

const pendingTasks = computed( () => {

    if (taskList.value && taskList.value.length > 0){
        return taskList.value.filter(task => task.status === 'pending')
    }
    return []
})

const completedTasks = computed( () => {
    if (taskList.value && taskList.value.length > 0) {
        return taskList.value.filter(task => task.status === 'completed')
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
                <div><Button text="Adicionar Tarefa +" outlined comfortable /></div>
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