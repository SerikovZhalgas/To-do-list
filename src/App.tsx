import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist/Todolist";
import {v1} from "uuid";
// CRUD => R (site)
// Graphic User Interface & Command Line Interface

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistsType = { id: string, title: string, filter: FilterValuesType }

function App() {
    // BLL:
    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false}
        ],
    })
    //const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTodolist = (todolistID: string): void => {
        setTodolists(todolists.filter(el=>el.id!==todolistID))
        delete tasks[todolistID]
        //setTasks(tasks.filter((task: TaskType) => task.id !== taskId))
    }

    const removeTask = (todolistID: string, taskId: string): void => {
        setTasks({...tasks, [todolistID]:tasks[todolistID].filter(el=>el.id!==taskId)})
        //setTasks(tasks.filter((task: TaskType) => task.id !== taskId))
    }

    const addTask = (todolistID: string,title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks,[todolistID]: [newTask, ...tasks[todolistID]]})
        //setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    const changeTaskStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id===taskId ? {...el, isDone:isDone} : el)})

        // let task = tasks.find(t => t.id === id)
        // if (task) {
        //     task.isDone = isDone;
        //     setTasks([...tasks])
        // }
    }

    const changeFilter = (todolistID: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: filter} : el))
        //setFilter(filter)
    }

    // let tasksForRender: Array<TaskType>;
    // switch (filter) {
    //     case "completed":
    //         tasksForRender = tasks.filter(t => t.isDone)
    //         break
    //     case "active":
    //         tasksForRender = tasks.filter(t => !t.isDone)
    //         break
    //     default:
    //         tasksForRender = tasks
    // }

    // UI:
    return (
        <div className="App">
            {todolists.map(t => {
                let tasksForRender: Array<TaskType>;
                switch (t.filter) {
                    case "completed":
                        tasksForRender = tasks[t.id].filter(t => t.isDone)
                        break
                    case "active":
                        tasksForRender = tasks[t.id].filter(t => !t.isDone)
                        break
                    default:
                        tasksForRender = tasks[t.id]
                }

                return (
                    <Todolist
                        key={t.id}
                        removeTodolist={removeTodolist}
                        todolistID={t.id}
                        title={t.title}
                        tasks={tasksForRender}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={t.filter}
                    />
                )
            })}


        </div>
    );
}

export default App;