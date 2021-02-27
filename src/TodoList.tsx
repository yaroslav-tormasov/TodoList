import React, {useCallback, useEffect} from "react";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {useDispatch} from "react-redux";
import {setTasksThunkCreator} from "./state/tasks-reducer";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValuesType} from "./AppWithRedux";
import {removeTodoListTC} from "./state/todolist-reducer";
import {RequestStatusType} from "./state/app-reducer";

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
    changeTaskStatus: (taskID: string, isDone: TaskStatuses, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
    entityStatus: RequestStatusType
}

export const TodoList = React.memo(function (props: PropsType) {

        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(setTasksThunkCreator(props.id))
        }, [])

        const addTask = useCallback((title: string) => {
            props.addTask(title, props.id)
        }, [props.addTask, props.id])
        const changeTodoListTitle = useCallback((title: string) => {
            props.changeTodoListTitle(props.id, title)
        }, [props.changeTodoListTitle, props.id])
        const removeTodoList = useCallback( () => {
            const thunk = removeTodoListTC(props.id)
            dispatch(thunk)
        }, [props.id])

        const onAllClickHandler = () => props.changeFilter("all", props.id);
        const onActiveClickHandler = () => props.changeFilter("active", props.id);
        const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

        return (
            <div>
                <h3>

                    <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                    <IconButton onClick={removeTodoList} disabled={props.entityStatus === 'loading'}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask} entityStatus={props.entityStatus}/>

                <ul style={{listStyle: "none", padding: "0"}}>
                    {
                        props.tasks.map(t => {
                            const onClickHandler = () => props.removeTask(t.id, props.id)
                            const changeTaskStatus = (taskID: string, isDone: TaskStatuses) => {

                               props.changeTaskStatus(taskID, isDone, props.id)
                             }
                            const changeTitle = (title: string) => {
                                props.changeTaskTitle(t.id, title, props.id)
                            }


                            return (
                                <Task
                                    key={t.id}
                                    task={t}
                                    removeTask={onClickHandler}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTitle}
                                />
                            )
                        })}
                </ul>
                <div>
                    <Button
                        style={{margin: "3px"}}
                        size={"small"}
                        variant={props.filter === "all" ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={onAllClickHandler}>All
                    </Button>
                    <Button
                        style={{margin: "3px"}}
                        size={"small"}
                        variant={props.filter === "active" ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button
                        style={{margin: "3px"}}
                        size={"small"}
                        variant={props.filter === "completed" ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={onCompletedClickHandler}>Completed
                    </Button>
                </div>
            </div>
        )
    }
)


