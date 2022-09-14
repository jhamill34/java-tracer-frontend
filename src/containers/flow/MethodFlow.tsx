import { gql, useQuery } from "@apollo/client"
import React from "react"
import { EdgeData, NodeData } from "reaflow"
import { ErrorComponent } from "../../components/errors/Error"
import { Flow } from "../../components/flow/Flow"
import { Loading } from "../../components/loading/Loading"

interface MethodFlowProps {
    id: string
}

interface MethodResponse {
    method: MethodModel
}

interface MethodModel {
    name: string
    descriptor: string
    modifiers: string
    instructions: Connector<InstructionModel>
}

interface InstructionModel {
    id: string
    opCode: string
    lineNumber: number
    next: string[]
    previous: string[]
}

interface GetMethodInput {
    id: string
}

const GET_METHOD_GRAPH_QUERY = gql`
    query GetMethodGraph($id: String!) {
        method(id: $id) {
            name
            descriptor
            modifiers
            instructions {
                edges {
                    node {
                        id
                        opCode
                        lineNumber
                        next
                        previous
                    }
                }
            }
        }
    }
`

interface SimpleGraph {
    simpleNodeHash: Map<string, InstructionModel[]>
    simpleAdjList: Map<string, string[]>
}

function createSimplifiedInstructionGraph(instructions: InstructionModel[]): SimpleGraph {
    // create adj list
    const nodeHash: Map<string, InstructionModel> = new Map()
    const outList: Map<string, string[]> = new Map()

    const resultNodeHash: Map<string, InstructionModel[]> = new Map()
    const simpleAdjList: Map<string, string[]> = new Map()
    const resultAdjList: Map<string, string[]> = new Map()

    const stack: string[] = []
    const unionSet: Map<string, string> = new Map()
    const seen: Set<string> = new Set()

    instructions.forEach((i) => {
        nodeHash.set(i.id, i)
        outList.set(i.id, i.next)

        // Nodes an 'in-degree' = 0 is where we want to start
        if (i.previous.length === 0) {
            stack.push(i.id)
            unionSet.set(i.id, i.id)
            simpleAdjList.set(i.id, [])
        }
    })

    // DFS*
    while (stack.length > 0) {
        const current = stack.pop()
        if (current == null) {
            continue
        }

        seen.add(current)
        const children = outList.get(current) ?? []
        if (children.length > 1) {
            simpleAdjList.set(current, children)
            children.forEach((child) => {
                if (seen.has(child)) {
                    const prev = unionSet.get(child)
                    if (prev != null && prev !== child) {
                        if (!simpleAdjList.has(prev)) {
                            simpleAdjList.set(prev, [])
                        }

                        simpleAdjList.get(prev)?.push(child)
                    }
                } else {
                    stack.push(child)
                }
                unionSet.set(child, child)
            })
        } else if (children.length === 1) {
            if (seen.has(children[0])) {
                const prev = unionSet.get(children[0])
                if (prev != null && prev !== children[0]) {
                    if (!simpleAdjList.has(prev)) {
                        simpleAdjList.set(prev, [])
                    }

                    simpleAdjList.get(prev)?.push(children[0])
                }
                unionSet.set(children[0], children[0])

                if (!simpleAdjList.has(current)) {
                    simpleAdjList.set(current, [])
                }
                simpleAdjList.get(current)?.push(children[0])
            } else {
                stack.push(children[0])
                unionSet.set(children[0], current)
            }
        } else {
            simpleAdjList.set(current, [])
        }
    }

    simpleAdjList.forEach((value, key) => {
        const nodes: InstructionModel[] = []
        let previous = key
        let current = unionSet.get(key)
        let model: InstructionModel | null

        while (current != null && current !== previous) {
            model = nodeHash.get(current) ?? null
            if (model != null) {
                nodes.push(model)
            }

            previous = current
            current = unionSet.get(current)
        }

        if (current != null) {
            model = nodeHash.get(current) ?? null
            if (model != null) {
                nodes.push(model)
            }

            resultAdjList.set(current, value)
            resultNodeHash.set(current, nodes)
        }
    })

    return {
        simpleAdjList: resultAdjList,
        simpleNodeHash: resultNodeHash,
    }
}

export function MethodFlow(props: MethodFlowProps): React.ReactElement {
    const { data, loading, error } = useQuery<MethodResponse, GetMethodInput>(
        GET_METHOD_GRAPH_QUERY,
        {
            variables: { id: props.id },
        },
    )

    if (loading) return <Loading />
    if (error != null) return <ErrorComponent />

    const nodes: NodeData[] = []
    const edges: EdgeData[] = []

    if (data != null) {
        const simpleGraph = createSimplifiedInstructionGraph(
            data.method.instructions.edges.map((e) => e.node),
        )

        simpleGraph.simpleNodeHash.forEach((node, key) => {
            nodes.push({
                id: key,
                text: key,
            })
        })

        simpleGraph.simpleAdjList.forEach((value, key) => {
            value.forEach((v) => {
                edges.push({
                    id: `${key}-${v}`,
                    from: key,
                    to: v,
                })
            })
        })
    }

    return <Flow nodes={nodes} edges={edges} onNodeSelect={() => {}} />
}
