import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
    GetClassPackageResponse,
    GetClassRelationshipsMetadata,
    GetClassRelationshipsResponse,
    GetClassResponse,
} from "../../connectors/class-api"
import { RootState } from "../store"

export interface ClassGraphState {
    nodes: {
        [id: ResourceId]: ClassNode
    }
    inbound: {
        [id: ResourceId]: ClassEdge[]
    }
    outbound: {
        [id: ResourceId]: ClassEdge[]
    }
}

export interface ClassNode {
    methods: ResourceId[]
    package: ResourceId
}

export interface ClassEdge {
    from: ResourceId
    to: ResourceId
    data: GetClassRelationshipsMetadata
}

const initialState: ClassGraphState = {
    nodes: {},
    inbound: {},
    outbound: {},
}

export const classSlice = createSlice({
    name: "classGraph",
    initialState,
    reducers: {
        addClassNode: (state, { payload }: PayloadAction<GetClassResponse>) => {
            if (payload.data !== null) {
                if (!(payload.resourceId in state.nodes)) {
                    state.nodes[payload.resourceId] = { methods: [], package: "" }
                }

                state.nodes[payload.resourceId].methods = payload.data.methods
            }
        },
        addClassPackage: (state, { payload }: PayloadAction<GetClassPackageResponse>) => {
            if (payload.data !== null) {
                if (!(payload.resourceId in state.nodes)) {
                    state.nodes[payload.resourceId] = { methods: [], package: "" }
                }

                state.nodes[payload.resourceId].package = payload.data.package
            }
        },
        addClassEdges: (state, { payload }: PayloadAction<GetClassRelationshipsResponse>) => {
            if (payload.data !== null) {
                state.outbound[payload.resourceId] = payload.data.map((data) => ({
                    from: payload.resourceId,
                    to: data.id,
                    data: data.metadata,
                }))

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
    },
})

export function selectClass({ classGraph }: RootState, classId: ResourceId): ClassNode | null {
    const result = classGraph.nodes[classId]

    if (result === undefined) {
        return null
    }

    return result
}

export const { addClassNode, addClassPackage, addClassEdges } = classSlice.actions

export default classSlice.reducer
