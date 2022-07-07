import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type InputPropsType = {
    setTitle: (title:string)=>void
    title: string
    callBack:()=>void
}

export const Input = (props:InputPropsType) => {
    /*let [title, setTitle] = useState("")*/

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.ctrlKey) {
            props.callBack();
        }
    }

    return (
        <div>
            <input value={props.title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
        </div>
    )
}