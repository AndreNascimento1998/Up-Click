import {defineStore} from "pinia"
import ITaskList from "@/types/ITaskList.ts"
import {ref} from "vue"
import TaskListHttp from "@/services/TaskListHttp.ts"
import {GlobalStore} from "@/stores/useGlobalStore.ts";

export const TaskListStore = defineStore('taskList', () => {
    const useGlobalStore = GlobalStore()

    let taskList = ref<ITaskList[]>([])

    async function fetchTask() {
        taskList.value = await TaskListHttp.get()
        useGlobalStore.loading = false
    }

    async function addTask(form: ITaskList) {
        useGlobalStore.loading = true
        await TaskListHttp.post(form)
        useGlobalStore.loading = false
    }

    async function editTask(form: ITaskList) {
        useGlobalStore.loading = true
        await TaskListHttp.put(form)
        useGlobalStore.loading = false
    }

    async function removeTask(id: string = '') {
        useGlobalStore.loading = true
        if (id) {
            await TaskListHttp.delete(id)
        }
        useGlobalStore.loading = false
    }

    return {
        taskList,
        addTask,
        fetchTask,
        editTask,
        removeTask
    }
})