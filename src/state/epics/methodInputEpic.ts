import { AnyAction, PayloadAction } from "@reduxjs/toolkit"
import { combineEpics, ofType } from "redux-observable"
import { from, map, mergeMap, of, filter, merge } from "rxjs"
import {
    getDeclaredMethod,
    getDeclaredMethodCalls,
    GetDeclaredMethodCallsResponse,
} from "../../connectors/method-api"
import { addEdges, addNode, pushHistory, selectCurrentMethodId } from "../slices/methodGraphSlice"
import { selectRootMethod } from "../slices/methodInputSlice"
import { AppEpic } from "../store"

function inputIsNotNullOrUndefined<T>(input: null | undefined | T): input is T {
    return input !== null && input !== undefined
}

function inputHasPayload<T>(input: AnyAction): input is PayloadAction<T> {
    return input.payload !== null && input.payload !== undefined
}

const setRootEpic: AppEpic = (action$, state$) =>
    action$.pipe(
        ofType("methodInput/setRootMethod"),
        mergeMap(() => of(pushHistory(selectRootMethod(state$.value)))),
    )

const getMethodCallsEpic: AppEpic = (action$, state$) =>
    action$.pipe(
        ofType("methodGraph/pushHistory"),
        mergeMap(() =>
            of(selectCurrentMethodId(state$.value)).pipe(
                filter(inputIsNotNullOrUndefined),
                mergeMap((method) =>
                    merge(
                        from(getDeclaredMethod(method)).pipe(map(addNode)),
                        from(getDeclaredMethodCalls(method)).pipe(map(addEdges)),
                    ),
                ),
            ),
        ),
    )

const getMethodEpic: AppEpic = (action$) =>
    action$.pipe(
        ofType("methodGraph/addEdges"),
        filter(inputHasPayload<GetDeclaredMethodCallsResponse>),
        map((action) => action.payload.data),
        filter(inputIsNotNullOrUndefined),
        mergeMap((data) =>
            from(data).pipe(
                mergeMap((method) => from(getDeclaredMethod(method.id)).pipe(map(addNode))),
            ),
        ),
    )

export const methodInputEpic = combineEpics(setRootEpic, getMethodEpic, getMethodCallsEpic)
