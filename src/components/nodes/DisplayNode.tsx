import React from "react"
import { GetDeclaredMethodData } from "../../connectors/method-api"
import { DisplayNodeContainerProps } from "../../containers/nodes/DisplayNodeContainer"
import { MethodEdge } from "../../state/slices/methodGraphSlice"

import "./DisplayNode.scss"

export interface DisplayNodeProps extends DisplayNodeContainerProps {}

function DisplayNodeData(props: {
    node: GetDeclaredMethodData
    edge: MethodEdge | null
}): React.ReactElement {
    const { node, edge } = props

    const methodName = node.name === "<init>" ? "Constructor Call" : node.name

    return (
        <table className="display-node__data">
            <tbody>
                <tr className="display-node__package display-node__row">
                    <td className="display-node__label">Package</td>
                    <td>{node.className.split("/").slice(0, -1).join(".")}</td>
                </tr>
                <tr className="display-node__class display-node__row">
                    <td className="display-node__label">Class</td>
                    <td>{node.className.split("/").at(-1)}</td>
                </tr>
                <tr className="display-node__method display-node__row">
                    <td className="display-node__label">Method</td>
                    <td>
                        {methodName} {node.modifiers.includes("static") ? "(static)" : ""}
                    </td>
                </tr>
                {edge !== null ? (
                    <tr>
                        <td className="display-node__label">Line</td>
                        <td>{edge.data.linenumber}</td>
                    </tr>
                ) : null}
            </tbody>
        </table>
    )
}

export function DisplayNode(props: DisplayNodeProps): React.ReactElement {
    const { node, inboundEdge, onClick } = props

    return (
        <div
            className="display-node"
            onClick={() => {
                onClick(node, inboundEdge)
            }}
        >
            {node !== null ? (
                node.data !== null ? (
                    <DisplayNodeData node={node.data} edge={inboundEdge} />
                ) : (
                    node.resourceId
                )
            ) : (
                "No data found."
            )}
        </div>
    )
}
