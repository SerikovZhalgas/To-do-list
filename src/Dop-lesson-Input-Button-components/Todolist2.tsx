import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from '../App';
import {Button} from "./Button";
import {Input} from "./Input";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    /*const addTask = () => {
        props.addTask(title);
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }*/

    /*const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");*/

    const tsarClickHandler=(value:FilterValuesType)=> {
        props.changeFilter(value)
    }

    const onClickHandler = (tID: string) => {
        props.removeTask(tID)
    }

    const addTaskHandler = ()=> {
        props.addTask(title)
        setTitle('')
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            {/*<FullInput callBack={props.addTask}/>*/}
            <Input setTitle={setTitle} title={title} callBack={addTaskHandler}/>
            <Button name={'+'} callBack={addTaskHandler} />

            {/*<input value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>*/}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    /*const onClickHandler = () => props.removeTask(t.id)*/

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button name={'x'} callBack={()=>onClickHandler(t.id)}/>
                        {/*<button onClick={ ()=>onClickHandler(t.id) }>x</button>*/}
                    </li>
                })
            }
        </ul>
        <div>
            <Button name={'All'} callBack={()=>tsarClickHandler('all')}/>
            <Button name={'Active'} callBack={()=>tsarClickHandler('active')}/>
            <Button name={'Completed'} callBack={()=>tsarClickHandler('completed')}/>

            {/*<button onClick={ ()=>tsarClickHandler('all') }>All</button>
            <button onClick={ ()=>tsarClickHandler('active') }>Active</button>
            <button onClick={ ()=>tsarClickHandler('completed') }>Completed</button>*/}

            {/*<button onClick={ onAllClickHandler }>All</button>
            <button onClick={ onActiveClickHandler }>Active</button>
            <button onClick={ onCompletedClickHandler }>Completed</button>*/}
        </div>
    </div>
}
