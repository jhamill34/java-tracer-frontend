import React from "react"
import { Canvas, EdgeData, Node, NodeData } from "reaflow"

import "./Flow.scss"

const nodes: NodeData[] = [
    {
        id: "1",
        text: "1",
    },
    {
        id: "2",
        text: "2",
    },
    {
        id: "2.1",
        text: "2.1",
        parent: "2",
    },
    {
        id: "3",
        text: "3",
    },
]

const edges: EdgeData[] = [
    {
        from: "1",
        to: "2",
        id: "1-2",
    },
    {
        from: "2",
        to: "3",
        id: "21-3",
    },
]

export function Flow(): React.ReactElement {
    return (
        <Canvas
            className="flow__canvas"
            nodes={nodes}
            edges={edges}
            node={
                <Node
                    onClick={(event, node) => {
                        console.log(node.id)
                    }}
                />
            }
        />
    )
}
