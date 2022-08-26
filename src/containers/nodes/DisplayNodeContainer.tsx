import { connect, ConnectedProps } from "react-redux"
import { DisplayNode } from "../../components/nodes/DisplayNode"
import { GetDelcaredMethodResponse } from "../../connectors/method-api"
import {
    MethodEdge,
    pushHistory,
    selectInboundEdge,
    selectMethod,
} from "../../state/slices/methodGraphSlice"
import { AppDispatch, RootState } from "../../state/store"

interface DisplayNodeContainerOwnProps {
    nodeId: string
}

interface DisplayNodeContainerStateProps {
    node: GetDelcaredMethodResponse | null
    inboundEdge: MethodEdge | null
}

function mapStateToProps(
    state: RootState,
    ownProps: DisplayNodeContainerOwnProps,
): DisplayNodeContainerStateProps {
    const [nodeId, lineNumber] = ownProps.nodeId.split(":")

    return {
        node: selectMethod(state, nodeId),
        inboundEdge: selectInboundEdge(state, nodeId, parseInt(lineNumber)),
    }
}

interface DisplayNodeContainerDispatchProps {
    onClick: (node: GetDelcaredMethodResponse | null, inboundEdge: MethodEdge | null) => void
}

function mapDispatchToProps(
    dispatch: AppDispatch,
    ownProps: DisplayNodeContainerOwnProps,
): DisplayNodeContainerDispatchProps {
    return {
        onClick: (node: GetDelcaredMethodResponse | null, incomingEdge: MethodEdge | null) => {
            if (node !== null) {
                dispatch(
                    pushHistory({
                        resourceId: node.resourceId,
                        incomingEdge,
                    }),
                )
            }
        },
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type DisplayNodeContainerProps = ConnectedProps<typeof connector>

export const DisplayNodeContainer = connector(DisplayNode)
