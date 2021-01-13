import React, {useReducer, useState} from 'react';
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
    todoListReducer
} from "./state/todolist-reducer";

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

function AppWithReducer() {

    const todoListID1 = v1();
    const todoListID2 = v1();

    const [todoLists, dispatchToTodolists] = useReducer(todoListReducer, [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ]);

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: true},
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Fish", isDone: true},
        ]
    })

    function addTask(title: string, todoListID: string) {
        dispatchToTasks(addTaskAC(title, todoListID))
    }

    function removeTask(taskId: string, todoListID: string) {
        dispatchToTasks(removeTaskAC(taskId, todoListID))
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        dispatchToTasks(changeTaskStatusAC(taskID, isDone, todoListID))
    }

    function changeTaskTitle (taskID: string, title: string, todoListID: string) {
     dispatchToTasks(changeTaskTitleAC(taskID, title, todoListID))
    }


    function changeFilter(value: FilterValuesType, todoListID: string) {
        dispatchToTodolists(ChangeTodolistFilterAC(todoListID, value))
    }

    function removeTodoList(todoListID: string) {
      let action = RemoveTodoListAC(todoListID)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    function addTodoList(title: string) {
        let action = AddTodoListAC(title);
     dispatchToTasks(action)
     dispatchToTodolists(action)
    }

    function changeTodoListTitle(todoListID: string, title: string) {
        dispatchToTodolists(ChangeTodolistTitleAC(todoListID, title));
    }

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
                                <Grid item >
                                    <Paper elevation={5} style={{padding: "15px"}}>
                                <TodoList
                                    key={tl.id}
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

export default AppWithReducer;

