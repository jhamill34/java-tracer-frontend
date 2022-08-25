import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit"
import { combineEpics, createEpicMiddleware, Epic } from "redux-observable"
import { methodInputEpic } from "./epics/methodInputEpic"
import methodGraphReducer from "./slices/methodGraphSlice"
import methodInputReducer from "./slices/methodInputSlice"

const reducer = combineReducers({
    methodInput: methodInputReducer,
    methodGraph: methodGraphReducer,
})

export type RootState = ReturnType<typeof reducer>
export type AppEpic = Epic<AnyAction, AnyAction, RootState>

export const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>()

export const store = configureStore({
    middleware: [epicMiddleware],
    reducer,
})

export type AppDispatch = typeof store.dispatch

epicMiddleware.run(combineEpics(methodInputEpic))
