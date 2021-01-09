import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

function App() {

    const todoListID1 = v1();
    const todoListID2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ]);

    const [tasks, setTasks] = useState<TasksStateType>({
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
        const newTask: TaskType = {id: v1(), title: title, isDone: false};
        const todoList = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoList];
        setTasks({...tasks})
    }

    function removeTask(taskID: string, todoListID: string) {
        const todoList = tasks[todoListID]
        tasks[todoListID] = todoList.filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoList = tasks[todoListID]

        const newTodoList = todoList.map(task => {
            if (task.id === taskID) {
                return {...task, isDone: isDone}
            }
            return task
        })
        tasks[todoListID] = newTodoList
        setTasks({...tasks})
    }

    function changeTaskTitle (taskID: string, title: string, todoListID: string) {
        const todoList = tasks[todoListID]
        const newTodoList = todoList.map(task => {
            if (task.id === taskID) {
                return {...task, title: title}
            }
            return task
        })
        tasks[todoListID] = newTodoList
        setTasks({...tasks})
    }


    function changeFilter(value: FilterValuesType, todoListID: string) {
            const todoList = todoLists.find(tl => tl.id === todoListID)
        if(todoList){
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID, title: title, filter: "all"
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({ ...tasks, [newTodoListID]: []} )
    }

    function changeTodoListTitle(todoListID: string, title: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if(todoList)
            todoList.title = title
        setTodoLists([...todoLists])
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

export default App;

