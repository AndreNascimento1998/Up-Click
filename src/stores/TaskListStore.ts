import {defineStore} from "pinia"
import ITaskList from "@/types/ITaskList.ts"
import {ref} from "vue"
import TaskListHttp from "@/services/TaskListHttp.ts";

export const TaskListStore = defineStore('taskList', () => {
    let taskList = ref<ITaskList[]>([])

    async function fetchTask() {
        taskList.value = await TaskListHttp.get()
    }

    async function addTask(form: ITaskList) {
        await TaskListHttp.post(form)
    }

    return {
        taskList,
        addTask,
        fetchTask
    }
})