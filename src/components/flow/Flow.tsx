import React, { useRef } from "react"
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { Canvas, EdgeData, Node, NodeData } from "reaflow"

import "./Flow.css"

interface FlowProps {
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
                limitToBounds={false}
            >
                <TransformComponent>
                    <Canvas
                        className="flow__canvas"
                        nodes={nodes}
                        edges={edges}
                        zoomable={false}
                        fit={true}
                        maxHeight={20000}
                        maxWidth={20000}
                        onLayoutChange={() => {
                            const width = containerRef?.current?.getBoundingClientRect().width ?? 0
                            transformerRef?.current?.setTransform(width / 2 - 10000, -10000, 1)
                        }}
                        node={
                            <Node
                                onClick={(_, node) => {
                                    onNodeSelect(node.id)
                                }}
                            />
                        }
                    />
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}
