import { connect, ConnectedProps } from "react-redux"
import { DisplayNode } from "../../components/nodes/DisplayNode"
import { GetDelcaredMethodResponse } from "../../connectors/method-api"
import { pushHistory, selectMethod } from "../../state/slices/methodGraphSlice"
import { AppDispatch, RootState } from "../../state/store"

interface DisplayNodeContainerOwnProps {
    nodeId: string
}

interface DisplayNodeContainerStateProps {
    node: GetDelcaredMethodResponse | null
}

function mapStateToProps(
    state: RootState,
    ownProps: DisplayNodeContainerOwnProps,
): DisplayNodeContainerStateProps {
    const node = selectMethod(state, ownProps.nodeId)
    return {
        node,
    }
}

interface DisplayNodeContainerDispatchProps {
    onClick: () => void
}

function mapDispatchToProps(
    dispatch: AppDispatch,
    ownProps: DisplayNodeContainerOwnProps,
): DisplayNodeContainerDispatchProps {
    return {
        onClick: () => {
            dispatch(pushHistory(ownProps.nodeId))
        },
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type DisplayNodeContainerProps = ConnectedProps<typeof connector>

export const DisplayNodeContainer = connector(DisplayNode)
