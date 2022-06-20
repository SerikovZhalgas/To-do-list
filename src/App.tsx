import React from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist/Todolist";

function App() {
    const title_1: string = "What to learn"
    const title_2: string = "What to buy"

    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]

    const tasks_2: Array<TaskType> = [
        {id: 1, title: "Potato", isDone: true},
        {id: 2, title: "Volga", isDone: false},
        {id: 3, title: "World", isDone: false}
    ]

    return (
        <div className="App">
            <Todolist title={title_1} tasks={tasks_1} />
            <Todolist title={title_2} tasks={tasks_2} />
        </div>
    );
}

export default App;