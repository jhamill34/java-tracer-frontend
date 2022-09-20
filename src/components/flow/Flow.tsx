import React, { useRef } from "react"
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { Canvas, Edge, EdgeData, Label, MarkerArrow, Node, NodeData } from "reaflow"

import "./Flow.css"

interface FlowProps {
    selectedNode?: string
    nodes: NodeData[]
    edges: EdgeData[]
    onNodeSelect: (id: string) => void
}

export function Flow(props: FlowProps): React.ReactElement {
    const { nodes, edges, onNodeSelect } = props
    const transformerRef = useRef<ReactZoomPanPinchRef>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div className="flow__container" ref={containerRef}>
            <TransformWrapper
                ref={transformerRef}
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
                        maxWidth={4000}
                        maxHeight={4000}
                        node={
                            <Node
                                onClick={(_, node) => {
                                    onNodeSelect(node.id)
                                }}
                                linkable={false}
                                label={<Label className="fill-zinc-500" />}
                                className="fill-white stroke-zinc-400 stroke-2 hover:fill-zinc-200 hover:!stroke-zinc-400 transition-colors"
                                rx={15}
                                ry={15}
                            />
                        }
                    />
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}
