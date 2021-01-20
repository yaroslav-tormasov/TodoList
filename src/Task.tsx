import React, {ChangeEvent} from 'react'
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {FilterValuesType, TaskType} from "./App";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {TasksStateType} from "./AppWithRedux";

export type TaskPropsType = {
    taskId: string
    title: string
    todolistId: string
    isDone: boolean
    removeTask: (taskID: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.taskId, props.todolistId)
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.taskId, e.currentTarget.checked, props.todolistId)
    }
    const changeTitle = (title: string) => {
        props.changeTaskTitle(props.taskId, title, props.todolistId)
    }
    return (
        <li>
            <Checkbox
    color={"primary"}
    checked={props.isDone}
    onChange={changeStatus}
    />

    <span className={props.isDone ? "is-done" : ""}>
    <EditableSpan title={props.title} changeTitle={changeTitle}/>
        </span>
    <IconButton onClick={onClickHandler}>
        <Delete/>
        </IconButton>
        </li>)
})
