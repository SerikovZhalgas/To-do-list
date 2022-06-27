import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist/Todolist";
// CRUD => R (site)
// Graphic User Interface & Command Line Interface

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    // BLL:
    const title: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>( [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    const removeTask = (taskId: number): void => {
        setTasks(tasks.filter((task: TaskType) => task.id != taskId))
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
            />
        </div>
    );
}

export default App;