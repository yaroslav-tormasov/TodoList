import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import AddItemForm from "./AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTaskTC,
    removeTaskThunkCreator,
    renameTaskThunkCreator,
    updateTaskStatusThunkCreator
} from "./state/tasks-reducer";
import {
    addTodoTC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    getTodosThunkCreator,
    TodolistDomainType,
} from "./state/todolist-reducer";
import {AppRootStateType} from "./store";
import {useDispatch, useSelector} from "react-redux";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {RequestStatusType} from "./state/app-reducer";
import {ErrorSnackbar} from "./ErrorSnackBar";
import {Login} from "./features/Login/Login";
import {TodolistsList} from "./state/TodolistsList";
import {Route, Switch} from "react-router-dom";


export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed"

function AppWithRedux() {

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
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

    useEffect(() => {
        dispatch(getTodosThunkCreator)
    }, [])

    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskTC(title, todoListID))
    }, [])

    const removeTask = useCallback((taskId: string, todoListID: string) => {
        dispatch(removeTaskThunkCreator(taskId, todoListID))
    }, [])

    const changeTaskStatus = useCallback((taskID: string, status: TaskStatuses, todoListID: string) => {
        dispatch(updateTaskStatusThunkCreator(todoListID, taskID, status))
    }, [])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(renameTaskThunkCreator(taskID, title, todoListID))
    }, [])


    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodolistFilterAC(todoListID, value))
    }, [])

    const removeTodoList = useCallback((todoListID: string) => {
       dispatch(removeTodoList(todoListID))
    }, [])

    const addTodoList = useCallback((title: string) => {
        const action = addTodoTC(title);
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListID: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(todoListID, title));
    }, [])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === "loading" && <LinearProgress color="secondary" />}
            <Container fixed>
                <Switch>
                <Route exact path={'/'} render={() => <TodolistsList />} />
                <Route path={'/login'} render={() => <Login />} />
                <Route path={'/404'} render={() => <h1>404.Page not found}</h1> }/>
                    <Redirect from={'*'} to={'/404'} />
                </Switch>


                <Grid container style={{padding: "15px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {
                        todoLists.map(tl => {
                            let tasksForTodoList = tasks[tl.id];

                            if (tl.filter === "active") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.status === TaskStatuses.InProgress)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
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
                                            entityStatus={tl.entityStatus}
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
            <ErrorSnackbar/>
        </div>
    );
}

export default AppWithRedux;

