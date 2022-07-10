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
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter:FilterValuesType
}

const Todolist = (props: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const tasksListItems = props.tasks.length
        ? props.tasks.map(task => {
            const removeTask = () => props.removeTask(task.id)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                let newIsDoneValue = e.currentTarget.checked
                props.changeTaskStatus(task.id, newIsDoneValue)
            }
            return (
                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                    <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your taskList is empty</span>
    const onClickAddTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter" && e.ctrlKey) {
            onClickAddTask()
        }
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const getChangeFilterHandler = (filter: FilterValuesType) => {
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
                    className={error ? 'error' : ''}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={getChangeFilterHandler("all")}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={getChangeFilterHandler("active")}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={getChangeFilterHandler("completed")}>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;