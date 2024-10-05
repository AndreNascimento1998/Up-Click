interface ITaskLists {
    id?: string
    title: string
    description: string
    status: string
    dateStart: string
    dateEnd: string
    priority?: boolean
    createdAt?: string
}

export default ITaskLists