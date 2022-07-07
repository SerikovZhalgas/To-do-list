import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist/Todolist";
import {v1} from "uuid";
// CRUD => R (site)
// Graphic User Interface & Command Line Interface

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    // BLL:
    const title: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>( [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

    const removeTask = (taskId: string): void => {
        setTasks(tasks.filter((task: TaskType) => task.id !== taskId))
    }

    const addTask= (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")
    let tasksForRender;
    switch (filter) {
        case "completed":
            tasksForRender = tasks.filter(t=> t.isDone === true)
            break
        case "active":
            tasksForRender = tasks.filter(t=> t.isDone === false)
            break
        default:
            tasksForRender = tasks
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    // UI:
    return (
        <div className="App">
            <Todolist
                title={title}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;