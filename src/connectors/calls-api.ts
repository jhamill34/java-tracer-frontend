import { apiCall, Edge, Response } from "./common"

const CALLS_TYPE = "calls"

export interface GetMethodCallData {
    name: string
    thread: string
    start: number
}

export type GetMethodCallResponse = Response<GetMethodCallData>

export async function getMethodCall(methodName: string): Promise<GetMethodCallResponse> {
    return await apiCall(CALLS_TYPE, methodName)
}

export interface GetSubMethodCallMetadata {
    duration: number
}

export type GetSubMethodCallData = Edge<GetSubMethodCallData>

export type GetSubMethodCallResponse = Response<GetSubMethodCallData[]>

export async function getSubMethodCalls(
    methodName: string,
    declared: boolean,
): Promise<GetSubMethodCallResponse> {
    if (declared) {
        return await apiCall(CALLS_TYPE, methodName, CALLS_TYPE, { declared: "y" })
    }
    return await apiCall(CALLS_TYPE, methodName, CALLS_TYPE)
}
