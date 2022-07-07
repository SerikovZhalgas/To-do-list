import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType)=> void
    addTask: (title: string)=>void
}

const Todolist = (props: PropsType) => {
    const [title, setTitle] = useState('')
    const tasksListItems = props.tasks.length
        ? props.tasks.map(task => {
            const removeTask = () => {
                props.removeTask(task.id)
            }
            return (
                <li>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your taskList is empty</span>
    const onClickAddTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const onKeyDownAddTask = (e:KeyboardEvent<HTMLInputElement>) => {
            if(e.key === "Enter" && e.ctrlKey){
                onClickAddTask()
            }
    }
    const onChangeSetTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const getChangeFilterHandler = (filter:FilterValuesType) => {
        return () => props.changeFilter(filter)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <button onClick={getChangeFilterHandler("all")}>All</button>
                <button onClick={getChangeFilterHandler("active")}>Active</button>
                <button onClick={getChangeFilterHandler("completed")}>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;