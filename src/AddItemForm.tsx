import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core"
import {AddBox} from "@material-ui/icons";
import {RequestStatusType} from "./state/app-reducer";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    entityStatus?: RequestStatusType
}

export const AddItemForm = React.memo(function(props: AddItemFormPropsType) {
    console.log("AddItemForm called")

    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState <string|null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // setError(null);
        setTitle(e.currentTarget.value)
    };

    const onAddItemKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === "Enter") {
            onAddItemClick()
        }
    }

    const onAddItemClick = () => {
        const trimmedTitle = title.trim();
        if(trimmedTitle){
            props.addItem(trimmedTitle);
            setTitle("");
        } else {
            setError("Title is required!")
        }
    }

    return(
        <div>
            {/*<input*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    onKeyUp={ onAddItemKeyPress }*/}
            {/*    className={error ? "error" : ""}*/}
            {/*/>*/}
            <TextField
                variant={"outlined"}
                value={ title }
                onChange={ onChangeHandler }
                onKeyUp={ onAddItemKeyPress }
                error={!!error}
                label={"Title"}
                helperText={error}
                disabled={props.entityStatus === 'loading'}
            />
            <IconButton color={"primary"} onClick={ onAddItemClick } disabled = {props.entityStatus === 'loading'}>
                <AddBox/>
            </IconButton>
            {/*{error && <div className={"error-message"}>{error}</div>}*/}
        </div>
    )
})

export default AddItemForm;