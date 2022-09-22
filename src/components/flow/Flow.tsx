import React from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { Canvas, Edge, EdgeData, Label, MarkerArrow, Node, NodeData } from "reaflow"
import cx from "classnames"

import "./Flow.css"

interface FlowProps {
    selectedNode?: string | null
    nodes: NodeData[]
    edges: EdgeData[]
    onNodeSelect: (id: string) => void
}

export function Flow(props: FlowProps): React.ReactElement {
    const { nodes, edges, onNodeSelect, selectedNode } = props

    return (
        <div className="flow__container">
            <TransformWrapper
                maxScale={4}
                minScale={0.2}
                wheel={{ step: 0.1 }}
                limitToBounds={true}
                centerOnInit={true}
            >
                <TransformComponent>
                    <Canvas
                        className="flow__canvas"
                        nodes={nodes}
                        edges={edges}
                        zoomable={false}
                        fit={true}
                        edge={<Edge className="stroke-zinc-400 stroke-2 flow__custom-edge" />}
                        arrow={<MarkerArrow className="stroke-zinc-400 fill-zinc-400" />}
                        maxWidth={20000}
                        maxHeight={20000}
                        node={(nodeProps) => {
                            return (
                                <Node
                                    {...nodeProps}
                                    onClick={(_, node) => {
                                        onNodeSelect(node.id)
                                    }}
                                    linkable={false}
                                    label={
                                        <Label
                                            className={cx({
                                                "fill-zinc-400": true,
                                            })}
                                        />
                                    }
                                    className={cx(
                                        "fill-white stroke-zinc-400 stroke-2 hover:!stroke-primary transition-colors",
                                        {
                                            "!stroke-primary": nodeProps.id === selectedNode,
                                        },
                                    )}
                                    rx={15}
                                    ry={15}
                                />
                            )
                        }}
                    />
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}
