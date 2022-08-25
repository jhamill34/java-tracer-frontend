import { apiCall, Edge, Response } from "./common"

const METHOD_TYPE = "methods"
const CALLS_TYPE = "calls"

export interface GetDeclaredMethodData {
    name: string
    className: string
    descriptor: string
    modifiers: string[]
}

export type GetDelcaredMethodResponse = Response<GetDeclaredMethodData>

export async function getDeclaredMethod(methodName: string): Promise<GetDelcaredMethodResponse> {
    console.log(methodName)
    return await apiCall(METHOD_TYPE, methodName)
}

export interface GetDeclaredMethodCallsMetadata {
    linenumber: number
}

export type GetDeclaredMethodCallsData = Edge<GetDeclaredMethodCallsMetadata>

export type GetDeclaredMethodCallsResponse = Response<GetDeclaredMethodCallsData[]>

export async function getDeclaredMethodCalls(
    methodName: string,
): Promise<GetDeclaredMethodCallsResponse> {
    return await apiCall(METHOD_TYPE, methodName, CALLS_TYPE)
}
