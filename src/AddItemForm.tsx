import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core"
import {AddBox, TextFields} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState <string|null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // setError(null);
        setTitle(e.currentTarget.value)
    };

    const onAddItemKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
            />
            <IconButton color={"primary"} onClick={ onAddItemClick }>
                <AddBox/>
            </IconButton>
            <Button variant={"contained"} color={"primary"} onClick={ onAddItemClick }>+</Button>
            {/*{error && <div className={"error-message"}>{error}</div>}*/}
        </div>
    )
}

export default AddItemForm;