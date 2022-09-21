import { useMemo } from "react"
import { EdgeData, NodeData } from "reaflow"

export interface SimpleGraph {
    simpleNodeHash: Map<string, InstructionModel[]>
    simpleAdjList: Map<string, string[]>
}

export function createSimplifiedInstructionGraph(instructions: InstructionModel[]): SimpleGraph {
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
        let model: InstructionModel | null = nodeHash.get(key) ?? null
        if (model != null) {
            nodes.push(model)
        }

        while (current != null && current !== previous) {
            model = nodeHash.get(current) ?? null
            if (model != null) {
                nodes.push(model)
            }

            previous = current
            current = unionSet.get(current)
        }

        if (current != null) {
            resultAdjList.set(current, value)
            resultNodeHash.set(current, nodes)
        }
    })

    return {
        simpleAdjList: resultAdjList,
        simpleNodeHash: resultNodeHash,
    }
}

export function useSimplifiedGraph(
    method?: MethodModel,
): [NodeData[], EdgeData[], SimpleGraph | null] {
    let simpleGraph: SimpleGraph | null = null
    return useMemo(() => {
        const nodes: NodeData[] = []
        const edges: EdgeData[] = []
        if (method != null) {
            simpleGraph = createSimplifiedInstructionGraph(
                method.instructions.edges.map((e) => e.node),
            )

            console.log(simpleGraph)

            simpleGraph.simpleNodeHash.forEach((node, key) => {
                const from = node.reverse().find((n) => n.lineNumber > 0)?.lineNumber ?? "?"
                nodes.push({
                    id: key,
                    text: `Line ${from}`,
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

        return [nodes, edges, simpleGraph]
    }, [method])
}
