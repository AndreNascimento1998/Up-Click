import { auth } from '@/firebaseConfig.ts'
import { getDatabase, push, ref, set, get } from "firebase/database"
import firebase from "firebase/compat";
import ITaskList from "@/types/ITaskList.ts";

class TaskListHttp {
    private db: firebase.database.Database

    constructor() {
        this.db = getDatabase()
    }

    public async get() {
        const user = auth.currentUser

        if (user) {
            const taskListRef = ref(this.db, `tasks/${user?.uid}`)

            try {
                const snapshot = await get(taskListRef)

                if (snapshot.exists()) {
                    const tasks = snapshot.val()

                    return Object.keys(tasks).map(key => ({
                        id: key,
                        ...tasks[key]
                    }))

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

    public async post(form: ITaskList) {
        const user = auth.currentUser

        if (user) {
            const taskListRef = ref(this.db, `tasks/${user?.uid}`)
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
}

export default new TaskListHttp()