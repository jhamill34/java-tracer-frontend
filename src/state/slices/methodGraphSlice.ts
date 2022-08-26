import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
    GetDeclaredMethodCallsMetadata,
    GetDeclaredMethodCallsResponse,
    GetDelcaredMethodResponse,
} from "../../connectors/method-api"
import { RootState } from "../store"

type ResourceId = string

export interface HistoricalEntry {
    resourceId: ResourceId
    incomingEdge: MethodEdge | null
}

export interface MethodEdge {
    from: ResourceId
    to: ResourceId
    data: GetDeclaredMethodCallsMetadata
}

export interface SelectedView {
    previous: HistoricalEntry | null
    current: HistoricalEntry
    nodes: {
        [id: ResourceId]: GetDelcaredMethodResponse
    }
    edges: {
        [id: ResourceId]: MethodEdge[]
    }
}

export interface MethodGraphState {
    history: HistoricalEntry[]
    nodes: {
        [id: ResourceId]: GetDelcaredMethodResponse
    }
    inbound: {
        [id: ResourceId]: MethodEdge[]
    }
    outbound: {
        [id: ResourceId]: MethodEdge[]
    }
}

const initialState: MethodGraphState = {
    history: [],
    nodes: {},
    inbound: {},
    outbound: {},
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
                // When we add an edge we'll keep track of all the nodes
                state.outbound[payload.resourceId] = payload.data.map((data) => ({
                    from: payload.resourceId,
                    to: data.id,
                    data: data.metadata,
                }))

                // We'll also note down that all these edges/nodes
                // can be reached by resourceId
                payload.data.forEach((edge) => {
                    if (!(edge.id in state.inbound)) {
                        state.inbound[edge.id] = []
                    }

                    state.inbound[edge.id].push({
                        from: payload.resourceId,
                        to: edge.id,
                        data: edge.metadata,
                    })
                })
            }
        },
        pushHistory: (state, { payload }: PayloadAction<HistoricalEntry>) => {
            const current = state.history.at(-1)
            const previous = state.history.at(-2)

            if (current === undefined) {
                // there was no history, this is the first one
                state.history.push(payload)
            } else if (payload.incomingEdge === null) {
                // should be root node, we'll just go back there
                state.history = [payload]
            } else if (previous === undefined) {
                // current exists and the node we're adding has a previous
                // but current doesn't have previous
                // (i.e. going to next level)
                state.history.push(payload)
            } else if (payload.incomingEdge.from === current.resourceId) {
                // going to next level
                state.history.push(payload)
            } else if (payload.incomingEdge.from === previous.resourceId) {
                // Going to sibling
                state.history.pop()
                state.history.push(payload)
            } else if (payload.resourceId === previous.resourceId) {
                // Go backwards one step
                state.history.pop()
            }
        },
    },
})

export const { addNode, addEdges, pushHistory } = methodGraphSlice.actions

export function selectInboundEdge(
    { methodGraph }: RootState,
    nodeId: ResourceId,
    linenumber: number,
): MethodEdge | null {
    if (methodGraph.inbound[nodeId] !== undefined) {
        const inbound = methodGraph.inbound[nodeId].find(
            (value) => value.to === nodeId && value.data.linenumber === linenumber,
        )

        if (inbound !== undefined) {
            return inbound
        }
    }

    return null
}

export function selectMethod(
    { methodGraph }: RootState,
    nodeId: ResourceId,
): GetDelcaredMethodResponse | null {
    if (methodGraph.nodes[nodeId] !== undefined) {
        return methodGraph.nodes[nodeId]
    }
    return null
}

/**
 * A selected view is defined as the sub-graph that surounds the
 * currently selected node.
 *
 * For example, this would be all incoming nodes, outgoing nodes, and
 * the respective edges associated with those nodes.
 *
 * The only exception with the specified definition is that we want to restirct
 * the incoming nodes to the specific node that called our current node,
 * since there could be other nodes that called our selected node.
 */
export function selectCurrentView({ methodGraph }: RootState): SelectedView {
    const result: SelectedView = {
        previous: null,
        current: {
            resourceId: "<root>",
            incomingEdge: {
                from: "",
                to: "<root>",
                data: {
                    linenumber: -1,
                },
            },
        },
        nodes: {},
        edges: {},
    }

    // Look at the top of the stack
    const current = methodGraph.history.at(-1)
    const previous = methodGraph.history.at(-2)

    if (current !== undefined) {
        // Set our current node if something has been
        // pushed onto the stack
        result.current = current

        // Set the current node
        result.nodes[current.resourceId] = methodGraph.nodes[current.resourceId]

        // Collect all outgoing edges and nodes from current
        const outbound = methodGraph.outbound[current.resourceId]
        outbound.forEach((edge) => (result.nodes[edge.to] = methodGraph.nodes[edge.to]))
        result.edges[current.resourceId] = methodGraph.outbound[current.resourceId]

        // If current has an incoming edge,
        // collect all outing nodes from the current's source node
        // and add only the single edge indicating source
        if (current.incomingEdge !== null) {
            result.nodes[current.incomingEdge.from] = methodGraph.nodes[current.incomingEdge.from]
            result.edges[current.incomingEdge.from] = [current.incomingEdge]
        }

        // If we happen to know what the source node for the previous node was then
        // we want to collect that edge
        if (previous !== undefined) {
            result.previous = previous
            const siblings = methodGraph.outbound[previous.resourceId]
            siblings.forEach((edge) => (result.nodes[edge.to] = methodGraph.nodes[edge.to]))
            result.edges[previous.resourceId] = methodGraph.outbound[previous.resourceId]
            if (previous.incomingEdge !== null) {
                result.edges[previous.incomingEdge.from] = [previous.incomingEdge]
            }
        }
    }

    return result
}

export default methodGraphSlice.reducer
