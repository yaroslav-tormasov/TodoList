import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";
import {Task} from "./Task";

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
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
}

export const TodoList = React.memo(function (props: PropsType) {

        console.log("Todolist called")

        const addTask = useCallback((title: string) => {
            props.addTask(title, props.id)
        }, [props.addTask, props.id])
        const changeTodoListTitle = useCallback((title: string) => {
            props.changeTodoListTitle(props.id, title)
        }, [props.changeTodoListTitle, props.id])
        const removeTodoList = () => {
            props.removeTodoList(props.id)
        }

        const onAllClickHandler = () => props.changeFilter("all", props.id);
        const onActiveClickHandler = () => props.changeFilter("active", props.id);
        const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

        return (
            <div>
                <h3>

                    <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                    {/*<button onClick={ removeTodoList }>X</button>*/}
                    <IconButton onClick={removeTodoList}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>

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
                                <Task
                                    key={t.id}
                                    taskId={t.id}
                                    todolistId={props.id}
                                    isDone={t.isDone}
                                    title={t.title}
                                    removeTask={props.removeTask}
                                    changeTaskStatus={props.changeTaskStatus}
                                    changeTaskTitle={props.changeTaskTitle}
                                />

                            )


                        })}
                </ul>
                <div>
                    <Button
                        style={{margin: "3px"}}
                        size={"small"}
                        variant={props.filter === "all" ? "contained" : "outlined"}
                        //className={props.filter === "all" ? "active-filter" : ""}
                        color={"primary"}
                        onClick={onAllClickHandler}>All
                    </Button>
                    <Button
                        style={{margin: "3px"}}
                        size={"small"}
                        variant={props.filter === "active" ? "contained" : "outlined"}
                        //className={props.filter === "active" ? "active-filter" : ""}
                        color={"primary"}
                        onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button
                        style={{margin: "3px"}}
                        size={"small"}
                        variant={props.filter === "completed" ? "contained" : "outlined"}
                        //className={props.filter === "completed" ? "active-filter" : ""}
                        color={"primary"}
                        onClick={onCompletedClickHandler}>Completed
                    </Button>
                </div>
            </div>
        )
    }
)


