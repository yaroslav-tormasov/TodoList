import {FilterValuesType, TasksStateType, TodoListType} from '../App';
import {v1} from "uuid";

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

const initialState: Array<TodoListType> = []

type ActionType = ChangeTodolistFilterActionType | ChangeTodolistTitleActionType | AddTodoListActionType |RemoveTodolistActionType


export const todoListReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {
                id: action.todoListID,
                title: action.title,
                filter: "all"
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

export const RemoveTodoListAC = (todoListID : string): RemoveTodolistActionType => ({type: "REMOVE-TODOLIST", id: todoListID})
export const AddTodoListAC = (todoListTitle: string): AddTodoListActionType => ({type: 'ADD-TODOLIST', title: todoListTitle, todoListID: v1()})
export const ChangeTodolistFilterAC = (todoListID : string, filter: FilterValuesType): ChangeTodolistFilterActionType => ({type: 'CHANGE-TODOLIST-FILTER', id: todoListID, filter: filter})
export const ChangeTodolistTitleAC = (todoListID: string, title: string): ChangeTodolistTitleActionType => ({type: 'CHANGE-TODOLIST-TITLE', title: title, id: todoListID })


