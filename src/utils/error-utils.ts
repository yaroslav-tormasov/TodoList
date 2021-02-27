import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../state/app-reducer";
import {Dispatch} from "redux";
import {BaseResponseType} from "../api/todolist-api";


export const handleServerAppError = <T>(data: BaseResponseType<T>,  dispatch: Dispatch<ErrorDispatch>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (message: string, dispatch: Dispatch<ErrorDispatch>) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

type ErrorDispatch = SetAppErrorActionType | SetAppStatusActionType