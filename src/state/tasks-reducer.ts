import {TasksStateType} from '../AppWithRedux';
import {AddTodoListActionType, GetTodolistsActionType, RemoveTodolistActionType} from "./todolist-reducer";
import {Dispatch} from "redux";
import {todolistAPI, TaskType, TaskStatuses} from "../api/todolist-api";
import {AppRootStateType} from "../store";
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {handleServerNetworkError} from "../utils/error-utils";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string
    todoListID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}
export type ChangeStatusTaskActionType = {
    type: 'CHANGE-STATUS-TASK',
    taskId: string
    todoListID: string
    status: TaskStatuses
}
export type ChangeTitleTaskActionType = {
    type: 'CHANGE-TITLE-TASK',
    taskId: string
    todoListID: string
    title: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}


const initialState: TasksStateType = {}

type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeStatusTaskActionType
    | ChangeTitleTaskActionType
    | AddTodoListActionType
    | RemoveTodolistActionType
    | GetTodolistsActionType
    | SetTasksActionType
    | SetAppErrorActionType
    | SetAppStatusActionType

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case 'GET-TODOS': {
            const stateCopy = {...state}
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }

        case 'REMOVE-TASK':
            let copyState = {...state}
            copyState[action.todoListID] = copyState[action.todoListID].filter(task => task.id !== action.taskId)
            return copyState

        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-STATUS-TASK': {
            debugger
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, status: action.status}
                    }
                })
            }
        }
        case 'CHANGE-TITLE-TASK': {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, title: action.title}
                    }
                })
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todo.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListID: string): RemoveTaskActionType => ({
    type: 'REMOVE-TASK',
    taskId: taskId,
    todoListID: todoListID
})

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListID: string): ChangeStatusTaskActionType => ({
    type: 'CHANGE-STATUS-TASK',
    taskId,
    status,
    todoListID
})
export const changeTaskTitleAC = (taskId: string, title: string, todoListID: string): ChangeTitleTaskActionType => ({
    type: 'CHANGE-TITLE-TASK',
    taskId,
    title,
    todoListID
})
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}

export const setTasksThunkCreator = (todoId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.getTasks(todoId)
        .then((res) => {
            let tasks = res.data.items
            dispatch(setAppStatusAC("succeeded"))
            dispatch(setTasksAC(tasks, todoId))
        })
}


export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerNetworkError(res.data.messages[0], dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err.message, dispatch)
        })
}



export const removeTaskThunkCreator = (taskID: string, todolistID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.deleteTask(todolistID, taskID).then((res) => {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(removeTaskAC(taskID, todolistID))
    })
}

export const renameTaskThunkCreator = (todoId: string, taskId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todoId]
    const task = tasksForCurrentTodolist.find(t => t.id === taskId)

    if (task) {
        todolistAPI.updateTask(todoId, taskId, {
            title: title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status
        }).then((res) => {
            dispatch(changeTaskTitleAC(taskId, title, todoId))
        })
    }
}

export const updateTaskStatusThunkCreator = (todoId: string, id: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const tasks = state.tasks
    const tasksForCurrentTodolist = tasks[todoId]

    let task = tasksForCurrentTodolist.find((t) => {
        return t.id === id
    })

    if (task) {
        todolistAPI.updateTask(todoId, id, {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: status
        })
            .then((res) => {
                const action = changeTaskStatusAC(id, status, todoId)
                dispatch(action);
            });
    }

}