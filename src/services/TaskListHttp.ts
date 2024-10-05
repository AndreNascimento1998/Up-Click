import { auth } from '@/firebaseConfig.ts'
import { getDatabase, push, ref, set, get, update } from "firebase/database"
import firebase from "firebase/compat"
import ITaskList from "@/types/ITaskList.ts"

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

    public async put(form: ITaskList) {
        const user = auth.currentUser

        if (user) {
            const taskRef = ref(this.db, `tasks/${user.uid}/${form.id}`)

            try {
                await update(taskRef, {
                    title: form.title,
                    description: form.description,
                    dateStart: form.dateStart,
                    dateEnd: form.dateEnd,
                    priority: form.priority,
                    status: form.status,
                })
            } catch (e) {
                console.error('Erro ao atualizar a tarefa', e)
            }
        } else {
            console.log('Usuário não está logado')
        }
    }

    public async delete(taskId: string) {
        const user = auth.currentUser

        if (user) {
            const taskRef = ref(this.db, `tasks/${user.uid}/${taskId}`)

            try {
                await set(taskRef, null)
                console.log('Task deleted')
            } catch (e) {
                console.error('Erro ao deletar a tarefa', e)
            }
        } else {
            console.log('Usuário não está logado')
        }
    }
}

export default new TaskListHttp()