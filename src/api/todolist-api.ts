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

export type BaseResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 0,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    isDone: boolean
}

export type UpdateTaskModuleType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type GetTasks = {
    error: string | null
    totalCount: number
    items: TaskType[]
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
        debugger;
        return instance.post<BaseResponseType<{item: TodoListType}>>(`todo-lists`, {title}, settings)
    },

    getTasks(todolistId: string) {
        return instance.get<GetTasks>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, Tasktitle: string) {
        return instance.post<BaseResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: Tasktitle});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModuleType) {
        return instance.put<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
}
