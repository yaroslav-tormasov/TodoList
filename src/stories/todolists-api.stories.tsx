import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'fd9b2a27-6d18-45d1-a7d7-f830701e2eb8'
    }
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const promise = todolistAPI.getTodolists()
        promise.then((response) => {
            setState(response.data)
        })
    }, [])


    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'NEW TODO'
        const promise = todolistAPI.createTodolist(title)
        promise.then((response) => {
            setState(response.data.data.item)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c5b70b7d-bc64-474d-9116-e2114b3dc918';
        const promise = todolistAPI.deleteTodolist(todolistId)
        promise.then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '939ba3be-8146-4bf7-b941-6e732ecc9627'
        const title = 'REACT>>>>>>>>>'
        const promise = todolistAPI.updateTodolist(todolistId, title)
        promise.then((res) => {
            setState(res.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
