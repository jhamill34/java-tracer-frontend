import React from "react"
import { useSpring, animated, SpringValue } from "@react-spring/web"

interface EdgeProps {
    style: { [key: string]: SpringValue }
    from: Position
    to: Position
}

function generatePath(from: Position, to: Position): string {
    return `M ${from.x} ${from.y} C ${to.x} ${from.y}, ${from.x} ${to.y}, ${to.x} ${to.y}`
}

function generateArrow(p: Position, size: number, reverse: boolean): string {
    if (reverse) {
        return `${p.x} ${p.y}, ${p.x + size} ${p.y + size / 2}, ${p.x + size} ${p.y - size / 2}`
    } else {
        return `${p.x} ${p.y}, ${p.x - size} ${p.y + size / 2}, ${p.x - size} ${p.y - size / 2}`
    }
}

export function EdgeItem(props: EdgeProps): React.ReactElement {
    const { from, to, style } = props

    const { fromX, fromY, d, points } = useSpring({
        fromX: from.x,
        fromY: from.y,
        d: generatePath(from, to),
        points: generateArrow(to, 15, false),
    })

    return (
        <animated.g>
            <animated.path
                style={style}
                className="chart__edge"
                d={d}
                pathLength={1}
                strokeDasharray={1}
            />
            <animated.polygon style={style} className="chart__arrow" points={points} />
            <animated.circle style={style} className="chart__anchor" cx={fromX} cy={fromY} r={5} />
        </animated.g>
    )
}
