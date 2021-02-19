import {TasksStateType} from '../App';
import {v1} from "uuid";
import {AddTodoListActionType, GetTodolistsActionType, RemoveTodolistActionType} from "./todolist-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string
    todoListID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string
    todoListID: string
}
export type ChangeStatusTaskActionType = {
    type: 'CHANGE-STATUS-TASK',
    taskId: string
    todoListID: string
    isDone: boolean
}
export type ChangeTitleTaskActionType = {
    type: 'CHANGE-TITLE-TASK',
    taskId: string
    todoListID: string
    title: string
}

const initialState: TasksStateType = {}

type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeStatusTaskActionType
    | ChangeTitleTaskActionType
    | AddTodoListActionType
    | RemoveTodolistActionType
    | GetTodolistsActionType

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
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
            debugger
            let copyState = {...state}
            let task = {id: v1(), isDone: false, title: action.title}
            copyState[action.todoListID] = [task, ...copyState[action.todoListID]]
            return copyState
        }
        case 'CHANGE-STATUS-TASK': {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, isDone: action.isDone}
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
                [action.todoListID]: []
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
export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => ({
    type: 'ADD-TASK',
    title,
    todoListID
})
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListID: string): ChangeStatusTaskActionType => ({
    type: 'CHANGE-STATUS-TASK',
    taskId,
    isDone,
    todoListID
})
export const changeTaskTitleAC = (taskId: string, title: string, todoListID: string): ChangeTitleTaskActionType => ({
    type: 'CHANGE-TITLE-TASK',
    taskId,
    title,
    todoListID
})

