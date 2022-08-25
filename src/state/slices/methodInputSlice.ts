import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface MethodInputState {
    rootMethod: string
}

const initialState: MethodInputState = {
    rootMethod: "",
}

export const methodInputSlice = createSlice({
    name: "methodInput",
    initialState,
    reducers: {
        setRootMethod: (state, action: PayloadAction<string>) => {
            state.rootMethod = action.payload + "#main([Ljava/lang/String;)V"
        },
    },
})

export const { setRootMethod } = methodInputSlice.actions

export function selectRootMethod(state: RootState): string {
    return state.methodInput.rootMethod
}

export default methodInputSlice.reducer
