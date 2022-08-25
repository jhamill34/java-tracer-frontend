import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GraphSegment } from "../../components/chart/Chart"
import {
    GetDeclaredMethodCallsData,
    GetDeclaredMethodCallsResponse,
    GetDelcaredMethodResponse,
} from "../../connectors/method-api"
import { RootState } from "../store"

type ResourceId = string

export interface MethodGraphState {
    max: number
    history: ResourceId[]
    nodes: {
        [id: ResourceId]: GetDelcaredMethodResponse
    }
    edges: {
        [id: ResourceId]: GetDeclaredMethodCallsData[]
    }
    parentEdges: {
        [childId: ResourceId]: ResourceId
    }
}

const initialState: MethodGraphState = {
    max: 5,
    history: [],
    nodes: {},
    edges: {},
    parentEdges: {},
}

export const methodGraphSlice = createSlice({
    name: "methodGraph",
    initialState,
    reducers: {
        addNode: (state, { payload }: PayloadAction<GetDelcaredMethodResponse>) => {
            if (payload.data !== null) {
                state.nodes[payload.resourceId] = payload
            }
        },
        addEdges: (state, { payload }: PayloadAction<GetDeclaredMethodCallsResponse>) => {
            if (payload.data !== null) {
                state.edges[payload.resourceId] = payload.data

                payload.data.forEach((edge) => {
                    state.parentEdges[edge.id] = payload.resourceId
                })
            }
        },
        pushHistory: (state, { payload }: PayloadAction<string>) => {
            state.history = [payload]
        },
        popHistory: (state) => {
            state.history.pop()
        },
    },
})

export const { addNode, addEdges, pushHistory, popHistory } = methodGraphSlice.actions

export function selectCurrentMethodId({ methodGraph }: RootState): string | null {
    const selectedId = methodGraph.history.at(-1)

    if (selectedId !== undefined) {
        return selectedId
    }

    return null
}

export function selectMethod(
    { methodGraph }: RootState,
    nodeId: string,
): GetDelcaredMethodResponse | null {
    const result = methodGraph.nodes[nodeId]

    if (result !== undefined) {
        return result
    }

    return null
}

export function selectCurrentMethod({ methodGraph }: RootState): GetDelcaredMethodResponse | null {
    const selected = methodGraph.history.at(-1)

    if (selected !== undefined) {
        const result = methodGraph.nodes[selected]
        if (result !== undefined) {
            return result
        }
    }

    return null
}

function filterEdges(edges: GetDeclaredMethodCallsData[], offset: number, max: number): string[] {
    const length = edges.length

    let subArray = edges.map((child) => `${child.id}`)
    if (length > max) {
        if (offset + max > length) {
            subArray = subArray.slice(length - max, length)
        } else {
            subArray = subArray.slice(offset, offset + max)
        }
    }

    return subArray
}

export function selectCurrentView({ methodGraph }: RootState): GraphSegment {
    const selectedId = methodGraph.history.at(-1)
    const max = methodGraph.max

    const result: GraphSegment = {
        current: [],
        next: [],
        previous: [],
        edges: [],
    }

    if (selectedId === undefined) {
        return result
    }

    if (methodGraph.edges[selectedId] !== undefined) {
        result.next = filterEdges(methodGraph.edges[selectedId], 0, max)
        result.edges = result.next.map((childId) => ({ fromId: selectedId, toId: childId }))
    }

    const previousId = methodGraph.parentEdges[selectedId]

    if (previousId !== undefined && methodGraph.edges[previousId] !== undefined) {
        const selectedIndex = methodGraph.edges[previousId].findIndex(
            (child) => child.id === selectedId,
        )

        const offset =
            selectedIndex >= Math.floor(max / 2) ? selectedIndex - Math.floor(max / 2) : 0

        result.current = filterEdges(methodGraph.edges[previousId], offset, max)
        result.previous = [previousId]
        result.edges.push({ fromId: previousId, toId: selectedId })
    } else {
        result.current = [selectedId]
    }

    return result
}

export default methodGraphSlice.reducer
