import React from "react"
import { useSpring, animated, SpringValue } from "@react-spring/web"

interface NodeProps {
    center: Position
    style?: { [key: string]: SpringValue }
    dimension: Dimension
    children: React.ReactNode
}

export function NodeItem(props: NodeProps): React.ReactElement {
    const {
        children,
        center: { x, y },
        dimension: { width, height },
    } = props

    const styles = useSpring({ width, height, left: x - width / 2, top: y - height / 2 })

    return (
        <animated.div className="chart__node" style={{ ...styles, ...props.style }}>
            {children}
        </animated.div>
    )
}
