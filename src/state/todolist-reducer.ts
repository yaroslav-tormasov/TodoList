import {FilterValuesType} from '../App';
import {v1} from "uuid";
import {TodoListType} from "../api/todolist-api";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST",
    title: string
    todoListID: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: FilterValuesType
    id: string
}

const initialState: Array<TodolistDomainType> = []

export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
}

type ActionType =
    ChangeTodolistFilterActionType
    | ChangeTodolistTitleActionType
    | AddTodoListActionType
    | RemoveTodolistActionType
    | GetTodolistsActionType


export const todoListReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'GET-TODOS':
            return action.todos.map((tl) => {
                return {...tl, filter: 'all'}
            })

        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoList: TodolistDomainType = {
                id: action.todoListID,
                title: action.title,
                filter: "all",
                addedDate: '',
                order: 1
            }
            return [...state, newTodoList]
        case "CHANGE-TODOLIST-TITLE": {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...state]
            }
            return state
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...state]
            }
            return state
        }
        default:
            return state
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodolistActionType => ({
    type: "REMOVE-TODOLIST",
    id: todoListID
})
export const AddTodoListAC = (todoListTitle: string): AddTodoListActionType => ({
    type: 'ADD-TODOLIST',
    title: todoListTitle,
    todoListID: v1()
})
export const ChangeTodolistFilterAC = (todoListID: string, filter: FilterValuesType): ChangeTodolistFilterActionType => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: todoListID,
    filter: filter
})
export const ChangeTodolistTitleAC = (todoListID: string, title: string): ChangeTodolistTitleActionType => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title: title,
    id: todoListID
})
export const GetTodolistsAC = (todos: Array<TodoListType>) => ({type: 'GET-TODOS', todos} as const)
export type GetTodolistsActionType = ReturnType<typeof GetTodolistsAC>

