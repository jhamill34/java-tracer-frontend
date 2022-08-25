import React from "react"
import { Chart, ChartProps } from "../../components/chart/Chart"
import { useAppSelector } from "../../state/hooks"
import { selectCurrentView } from "../../state/slices/methodGraphSlice"
import { DisplayNodeContainer } from "../nodes/DisplayNodeContainer"

type DeclaredMethodChartContainerProps = Omit<ChartProps, "graphSegment" | "node">

function renderNode(nodeId: string): React.ReactNode {
    return <DisplayNodeContainer nodeId={nodeId.split("-")[0]} />
}

export function DeclaredMethodChartContainer(
    props: DeclaredMethodChartContainerProps,
): React.ReactElement {
    const graphSegment = useAppSelector(selectCurrentView)

    return (
        <Chart
            spacing={props.spacing}
            nodeSize={props.nodeSize}
            graphSegment={graphSegment}
            node={renderNode}
        />
    )
}
