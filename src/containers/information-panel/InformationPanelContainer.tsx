import { connect, ConnectedProps } from "react-redux"
import { InformationPanel } from "../../components/information-panel/InformationPanel"
import { GetDeclaredMethodData } from "../../connectors/method-api"
import { ClassNode, selectClass } from "../../state/slices/classGraphSlice"
import { MethodEdge, selectCurrentMethod, selectMethod } from "../../state/slices/methodGraphSlice"
import { RootState } from "../../state/store"

interface InformationPanelStateProps {
    methodNode: GetDeclaredMethodData | null
    classNode: ClassNode | null
    inboundEdge: MethodEdge | null
}

function mapStateToProps(state: RootState): InformationPanelStateProps {
    const current = selectCurrentMethod(state)
    const methodResponse = current !== null ? selectMethod(state, current.resourceId) : null

    const methodNode = methodResponse !== null ? methodResponse.data : null
    const classNode = methodNode !== null ? selectClass(state, methodNode.className) : null

    const inboundEdge = current !== null ? current.incomingEdge : null

    return {
        methodNode,
        classNode,
        inboundEdge,
    }
}

const connector = connect(mapStateToProps)

export type InformationPanelContainerProps = ConnectedProps<typeof connector>
export const InformationPanelContainer = connector(InformationPanel)
