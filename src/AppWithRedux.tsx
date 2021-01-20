import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
    AddTodoListAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodoListAC,
    todoListReducer,
} from "./state/todolist-reducer";
import {AppRootStateType} from "./store";
import {useDispatch, useSelector} from "react-redux";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = "all"|"active"|"completed"

function AppWithRedux() {

    // const todoListID1 = v1();
    // const todoListID2 = v1();
    //
    // const [todoLists, dispatchToTodolists] = useReducer(todoListReducer, [
    //     {id: todoListID1, title: "What to learn", filter: "all"},
    //     {id: todoListID2, title: "What to buy", filter: "all"},
    // ]);
    //
    // const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    //     [todoListID1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "React", isDone: true},
    //     ],
    //     [todoListID2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "Beer", isDone: true},
    //         {id: v1(), title: "Fish", isDone: true},
    //     ]
    // })

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const addTask = useCallback((title: string, todoListID: string) => {
        const action = (addTaskAC(title, todoListID))
        dispatch(action)
    }, [])

    const removeTask = useCallback((taskId: string, todoListID: string) => {
        dispatch(removeTaskAC(taskId, todoListID))
    }, [])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        const action = dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
        dispatch(action)
    }, [])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
     dispatch(changeTaskTitleAC(taskID, title, todoListID))
    }, [])


    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodolistFilterAC(todoListID, value))
    }, [])

    const removeTodoList = useCallback((todoListID: string) => {
      const action = RemoveTodoListAC(todoListID)
        dispatch(action)
    }, [])

    const addTodoList = useCallback((title: string) => {
       const action = AddTodoListAC(title);
     dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListID: string, title: string) =>{
        dispatch(ChangeTodolistTitleAC(todoListID, title));
    }, [])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" >
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "15px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {
                        todoLists.map(tl => {
                            let tasksForTodoList = tasks[tl.id];
                            if (tl.filter === "active") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                            }

                            return (
                                <Grid item key={tl.id}>
                                    <Paper elevation={5} style={{padding: "15px"}}>
                                <TodoList
                                    id={tl.id}
                                    title={tl.title}
                                    filter={tl.filter}
                                    tasks={tasksForTodoList}
                                    removeTask={removeTask}
                                    addTask={addTask}
                                    changeFilter={changeFilter}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

