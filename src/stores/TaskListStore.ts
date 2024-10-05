import {defineStore} from "pinia"
import ITaskList from "@/types/ITaskList.ts"
import { auth } from '@/firebaseConfig.ts'
import { getDatabase, push, ref, set, get } from "firebase/database"

export const TaskListStore = defineStore('taskList', () => {

    const db = getDatabase()

    async function getTasks() {
        const user = auth.currentUser

        if (user) {
            const taskListRef = ref(db, `tasks/${user?.uid}`)

            try {
                const snapshot = await get(taskListRef)

                if (snapshot.exists()) {
                    const tasks = snapshot.val()

                    const taskList = Object.keys(tasks).map(key => ({
                        id: key,
                        ...tasks[key]
                    }))

                    console.log(taskList)

                    return taskList
                } else {
                    console.log('No data available')
                    return []
                }
            } catch (e) {
                console.error('Nenhuma tarefa encontrada', e)
                return []
            }
        } else {
            console.log('Usuário não está logado')
            return []
        }
    }

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
        addTask,
        getTasks
    }
})