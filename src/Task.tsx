import React, {ChangeEvent} from 'react'
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "./api/todolist-api";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskID: string) => void
    changeTaskTitle: (taskID: string, title: string) => void
    changeTaskStatus: (taskID: string, isDone: TaskStatuses) => void
}
export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.task.id)
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.InProgress
        props.changeTaskStatus(props.task.id, status)
    }
    const changeTitle = (title: string) => {
        props.changeTaskTitle(props.task.id, title)
    }
    return (
        <li>
            <Checkbox
                color={"primary"}
                checked={props.task.status === TaskStatuses.Completed}
                onChange={changeStatus}
            />

            <span className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
    <EditableSpan title={props.task.title} changeTitle={changeTitle}/>
        </span>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </li>)
})
