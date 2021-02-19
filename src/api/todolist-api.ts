import axios from "axios";

const settings = {
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'fd9b2a27-6d18-45d1-a7d7-f830701e2eb8'
    }
}

const instance = axios.create({
        ...settings
    }
)

export type TodoListType = {
    id: string
    title: string
    order: number
    addedDate: string
}

type BaseResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<BaseResponseType<{}>>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<BaseResponseType<{}>>(`todo-lists/${todolistId}`, settings)
    },
    getTodolists() {
        return instance.get<Array<TodoListType>>(`todo-lists`, settings)
    },

    createTodolist(title: string) {
        return instance.post<BaseResponseType<{item: TodoListType}>>(`todo-lists`, {title}, settings)
    }
}
