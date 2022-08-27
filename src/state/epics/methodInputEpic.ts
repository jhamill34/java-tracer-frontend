import { AnyAction, PayloadAction } from "@reduxjs/toolkit"
import { combineEpics, ofType } from "redux-observable"
import { from, map, mergeMap, of, filter, merge } from "rxjs"
import { getClass, getClassPackage } from "../../connectors/class-api"
import {
    getDeclaredMethod,
    getDeclaredMethodCalls,
    GetDeclaredMethodCallsResponse,
    GetDelcaredMethodResponse,
} from "../../connectors/method-api"
import { addClassNode, addClassPackage } from "../slices/classGraphSlice"
import {
    addMethodEdges,
    addMethodNode,
    HistoricalEntry,
    pushHistory,
} from "../slices/methodGraphSlice"
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
        mergeMap(() =>
            of(pushHistory({ resourceId: selectRootMethod(state$.value), incomingEdge: null })),
        ),
    )

const getMethodCallsEpic: AppEpic = (action$) =>
    action$.pipe(
        ofType("methodGraph/pushHistory"),
        filter(inputHasPayload<HistoricalEntry>),
        map((action) => action.payload.resourceId),
        mergeMap((data) =>
            merge(
                from(getDeclaredMethod(data)).pipe(map(addMethodNode)),
                from(getDeclaredMethodCalls(data)).pipe(map(addMethodEdges)),
            ),
        ),
    )

const getMethodEpic: AppEpic = (action$) =>
    action$.pipe(
        ofType("methodGraph/addMethodEdges"),
        filter(inputHasPayload<GetDeclaredMethodCallsResponse>),
        map((action) => action.payload.data),
        filter(inputIsNotNullOrUndefined),
        mergeMap((data) =>
            from(data).pipe(
                mergeMap((method) => from(getDeclaredMethod(method.id)).pipe(map(addMethodNode))),
            ),
        ),
    )

const getClassEpic: AppEpic = (action$) =>
    action$.pipe(
        ofType("methodGraph/addMethodNode"),
        filter(inputHasPayload<GetDelcaredMethodResponse>),
        map((action) => action.payload.data),
        filter(inputIsNotNullOrUndefined),
        map((data) => data.className),
        mergeMap((data) =>
            merge(
                from(getClass(data)).pipe(map(addClassNode)),
                from(getClassPackage(data)).pipe(map(addClassPackage)),
            ),
        ),
    )

export const methodInputEpic = combineEpics(
    setRootEpic,
    getMethodEpic,
    getMethodCallsEpic,
    getClassEpic,
)
