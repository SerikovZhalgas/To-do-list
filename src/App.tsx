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
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskId: string): void => {
        setTasks(tasks.filter((task: TaskType) => task.id !== taskId))
    }
    const addTask= (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }
    const changeTaskStatus = (id: string, isDone: boolean) => {
        let task=tasks.find(t=>t.id===id)
        if(task){
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    let tasksForRender;
    switch (filter) {
        case "completed":
            tasksForRender = tasks.filter(t=> t.isDone)
            break
        case "active":
            tasksForRender = tasks.filter(t=> !t.isDone)
            break
        default:
            tasksForRender = tasks
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
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;