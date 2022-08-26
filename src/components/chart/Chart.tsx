import React, { useState, useRef, useEffect } from "react"
import { NodeItem } from "./graph/NodeItem"
import { EdgeItem } from "./graph/EdgeItem"
import { animated, useTransition, config } from "@react-spring/web"

import "./Chart.scss"

export interface Edge {
    fromId: string
    toId: string
}

export interface GraphSegment {
    current: string[]
    previous: string[]
    next: string[]
    edges: Edge[]
}

export interface GraphSegmentOffsets {
    current: number
    previous: number
    next: number
}

export interface ChartProps {
    offsets: GraphSegmentOffsets
    maxNodes: number
    nodeSize: Dimension
    graphSegment: GraphSegment
    spacing: Spacing
    node: (nodeId: string) => React.ReactNode
}

export function Chart(props: ChartProps): React.ReactElement {
    const { nodeSize, graphSegment, offsets, maxNodes, spacing } = props

    const [width, setWidth] = useState<number | null>(null)
    const [height, setHeight] = useState<number | null>(null)

    const node = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function setDimentions(): void {
            if (node?.current !== null) {
                setWidth(node.current.getBoundingClientRect().width)
                setHeight(node.current.getBoundingClientRect().height)
            }
        }

        setDimentions()

        window.addEventListener("resize", setDimentions)

        return () => window.removeEventListener("resize", setDimentions)
    }, [setWidth, setHeight, node])

    let positions: { [key: string]: Position } = {}
    let edges: Edge[] = []

    if (width !== null && height !== null) {
        const center = {
            x: width / 2,
            y: height / 2,
        }

        console.log(offsets)
        positions = {
            ...calculateNodePositions(
                graphSegment.previous.slice(offsets.previous, offsets.previous + maxNodes),
                center,
                nodeSize,
                spacing,
                -1,
            ),
            ...calculateNodePositions(
                graphSegment.current.slice(offsets.current, offsets.current + maxNodes),
                center,
                nodeSize,
                spacing,
                0,
            ),
            ...calculateNodePositions(
                graphSegment.next.slice(offsets.next, offsets.next + maxNodes),
                center,
                nodeSize,
                spacing,
                1,
            ),
        }

        edges = graphSegment.edges.filter(
            (edge) => edge.fromId in positions && edge.toId in positions,
        )
    }

    const nodeTransitions = useTransition(
        Object.keys(positions).map((id) => ({ id, position: positions[id] })),
        {
            from: { opacity: 0, transform: "scale(0.5)" },
            enter: { opacity: 1, transform: "scale(1)" },
            leave: { opacity: 0, transform: "scale(0.5)" },
            keys: (item) => item.id,
            config: config.gentle,
        },
    )

    const edgeTransitions = useTransition(
        edges.map((edge) => ({
            id: `${edge.fromId}-${edge.toId}`,
            from: positions[edge.fromId],
            to: positions[edge.toId],
        })),
        {
            from: { strokeDashoffset: 1, opacity: 0 },
            enter: { strokeDashoffset: 0, opacity: 1 },
            leave: { strokeDashoffset: 1, opacity: 0 },
            keys: (item) => item.id,
            config: {
                duration: 400,
            },
        },
    )

    return (
        <div className="chart__container" ref={node}>
            <animated.svg className="chart__edges">
                {edgeTransitions((style, { id, from, to }) => (
                    <EdgeItem
                        key={id}
                        style={style}
                        from={offsetPosition(from, nodeSize.width / 2, 0)}
                        to={offsetPosition(to, -nodeSize.width / 2, 0)}
                    />
                ))}
            </animated.svg>
            <div className="chart__nodes">
                {nodeTransitions((style, { id, position }) => (
                    <NodeItem style={style} center={position} dimension={nodeSize} key={id}>
                        {props.node(id)}
                    </NodeItem>
                ))}
            </div>
        </div>
    )
}

function offsetPosition(position: Position, dx: number, dy: number): Position {
    return {
        x: position.x + dx,
        y: position.y + dy,
    }
}

function calculateNodePositions(
    nodes: string[],
    center: Position,
    nodeSize: Dimension,
    spacing: Spacing,
    layer: number,
): { [key: string]: Position } {
    const layerSize = nodes.length
    const layerHeight = nodeSize.height * layerSize + spacing.vertical * (layerSize - 1)

    const map: { [key: string]: Position } = {}

    nodes.forEach((node, index) => {
        map[node] = offsetPosition(
            center,
            layer * (nodeSize.width + spacing.horizontal),
            -layerHeight / 2 + nodeSize.height / 2 + (nodeSize.height + spacing.vertical) * index,
        )
    })

    return map
}
