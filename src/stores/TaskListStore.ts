import {defineStore} from "pinia"
import ITaskList from "@/types/ITaskList.ts"
import { auth } from '@/firebaseConfig.ts'
import { getDatabase, push, ref, set } from "firebase/database"

export const TaskListStore = defineStore('taskList', () => {

    const db = getDatabase()

    async function addTask(form: ITaskList) {
        const user = auth.currentUser

        if (user) {
            const taskListRef = ref(db, `tasks/${user?.uid}`)
            const newTaskRef = push(taskListRef)
            const formDTO = {
                ...form,
                createdAt: new Date().toISOString(),
                id: newTaskRef.key
            }
            set(newTaskRef, formDTO)
                .then(() => {
                    console.log('Task added')
                })
                .catch((e) => {
                    console.error(e)
                })
        } else {
            console.log('Usuário não está logado')
        }
    }

    return {
        addTask
    }
})