import { connect, ConnectedProps } from "react-redux"
import { Chart, GraphSegment, GraphSegmentOffsets } from "../../components/chart/Chart"
import { selectCurrentView, SelectedView } from "../../state/slices/methodGraphSlice"
import { RootState } from "../../state/store"

interface DeclaredMethodChartContainerStateProps {
    graphSegment: GraphSegment
    offsets: GraphSegmentOffsets
}

interface DeclaredMethodChartContainerOwnProps {
    maxNodes: number
}

function selectedViewToGraphSegment(
    { current, previous, edges }: SelectedView,
    maxNodes: number,
): [GraphSegment, number] {
    const result: GraphSegment = {
        previous: [],
        current: [],
        next: [],
        edges: [],
    }

    let currentOffset = 0

    if (current.resourceId !== "<root>") {
        result.next = edges[current.resourceId].map((edge) => `${edge.to}:${edge.data.linenumber}`)

        if (current.incomingEdge !== null) {
            const { incomingEdge } = current

            result.current = edges[incomingEdge.from].map(
                (edge) => `${edge.to}:${edge.data.linenumber}`,
            )

            const currentIndex = result.current.findIndex(
                (id) => id === `${current.resourceId}:${incomingEdge.data.linenumber}`,
            )
            currentOffset =
                currentIndex > Math.floor(maxNodes / 2)
                    ? currentIndex - Math.floor(maxNodes / 2)
                    : 0

            result.edges = edges[current.resourceId].map((edge) => ({
                fromId: `${current.resourceId}:${incomingEdge.data.linenumber}`,
                toId: `${edge.to}:${edge.data.linenumber}`,
            }))

            if (previous !== null) {
                if (previous.incomingEdge !== null) {
                    result.previous = [
                        `${incomingEdge.from}:${previous.incomingEdge.data.linenumber}`,
                    ]
                    result.edges.push({
                        fromId: `${incomingEdge.from}:${previous.incomingEdge.data.linenumber}`,
                        toId: `${incomingEdge.to}:${incomingEdge.data.linenumber}`,
                    })
                } else {
                    result.previous = [`${incomingEdge.from}`]
                    result.edges.push({
                        fromId: `${incomingEdge.from}`,
                        toId: `${incomingEdge.to}:${incomingEdge.data.linenumber}`,
                    })
                }
            }
        } else {
            result.current = [`${current.resourceId}`]
            result.edges = edges[current.resourceId].map((edge) => ({
                fromId: edge.from,
                toId: `${edge.to}:${edge.data.linenumber}`,
            }))
        }
    }

    return [result, currentOffset]
}

function mapStateToProps(
    state: RootState,
    ownProps: DeclaredMethodChartContainerOwnProps,
): DeclaredMethodChartContainerStateProps {
    const currentView = selectCurrentView(state)
    const [graphSegment, current] = selectedViewToGraphSegment(currentView, ownProps.maxNodes)

    return {
        graphSegment,
        offsets: {
            previous: 0,
            current,
            next: 0,
        },
    }
}

const connector = connect(mapStateToProps)

export type DeclaredMethodChartContainerProps = ConnectedProps<typeof connector>

export const DeclaredMethodChartContainer = connector(Chart)
