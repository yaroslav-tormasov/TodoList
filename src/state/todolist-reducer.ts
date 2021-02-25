import {todolistAPI, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";
import {FilterValuesType} from "../AppWithRedux";
import {setAppStatusAC} from "./app-reducer";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST",
    todo: TodoListType
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
            return [{...action.todo, filter: "all"}, ...state]
        // const newTodoList: TodolistDomainType = {
        //     id: action.todoListID,
        //     title: action.title,
        //     filter: "all",
        //     addedDate: '',
        //     order: 1
        // }
        // return [...state, newTodoList]
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
// export const AddTodoListAC = (todoListTitle: string): AddTodoListActionType => ({
//     type: 'ADD-TODOLIST',
//     title: todoListTitle,
//     todoListID: v1()
// })

export const AddTodoListAC = (todo: TodoListType): AddTodoListActionType => ({
    type: 'ADD-TODOLIST',
    todo
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
export const getTodolistsAC = (todos: Array<TodoListType>) => ({type: 'GET-TODOS', todos} as const)
export type GetTodolistsActionType = ReturnType<typeof getTodolistsAC>

export const getTodosThunkCreator = (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.getTodolists()
        .then((res) => {
            let todos = res.data
            dispatch(setAppStatusAC("succeeded"))
            dispatch(getTodolistsAC(res.data))
        })
}

export const addTodoTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.createTodolist(title)
        .then((res) => {
            const todo = res.data.data.item
            dispatch(setAppStatusAC("succeeded"))
            dispatch(AddTodoListAC(todo))
        })
}

