import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone:boolean, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
}

export function TodoList(props: PropsType) {

    const addTask = (title: string) => { props.addTask(title, props.id) }
    const changeTodoListTitle = (title: string) => { props.changeTodoListTitle(props.id, title) }
    const removeTodoList = () => { props.removeTodoList(props.id) }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

        return (
            <div>
                <h3>

                    <EditableSpan title={props.title} changeTitle={ changeTodoListTitle } />
                    {/*<button onClick={ removeTodoList }>X</button>*/}
                    <IconButton onClick = { removeTodoList }>
                        <Delete />
                    </IconButton>
                </h3>
                <AddItemForm addItem={ addTask } />

                <ul style={{listStyle: "none", padding: "0"}}>
                    {
                        props.tasks.map(t => {
                            const onClickHandler = () => props.removeTask(t.id, props.id)
                            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                            }
                            const changeTitle = (title: string) => {
                                props.changeTaskTitle(t.id, title, props.id)
                            }
                            return (
                                <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                    {/*<input*/}
                                    {/*    type="checkbox"*/}
                                    {/*    checked={t.isDone}*/}
                                    {/*    onChange={changeStatus}*/}
                                    {/*/>*/}
                                    <Checkbox
                                        onChange={ changeStatus }
                                        checked={t.isDone}
                                        color={"primary"}
                                    />
                                    <EditableSpan title={t.title} changeTitle={ changeTitle } />
                                    {/*<span>{t.title}</span>*/}
                                    {/*<button onClick={ onClickHandler }>X</button>*/}
                                    <IconButton onClick = { onClickHandler } >
                                        <Delete />
                                    </IconButton>
                                </li>
                            )


                    })}
                </ul>
                <div>
                    <Button
                        style={{margin: "3px" }}
                        size={"small"}
                        variant={props.filter === "all" ? "contained" : "outlined"}
                        //className={props.filter === "all" ? "active-filter" : ""}
                        color={"primary"}
                        onClick={onAllClickHandler}>All
                    </Button>
                    <Button
                        style={{margin: "3px" }}
                        size={"small"}
                        variant={props.filter === "active" ? "contained" : "outlined"}
                        //className={props.filter === "active" ? "active-filter" : ""}
                        color={"primary"}
                        onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button
                        style={{margin: "3px" }}
                        size={"small"}
                        variant={props.filter === "completed" ? "contained" : "outlined"}
                        //className={props.filter === "completed" ? "active-filter" : ""}
                        color={"primary"}
                        onClick={onCompletedClickHandler}>Completed
                    </Button>
                </div>
            </div>
        )}


