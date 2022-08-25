import React from "react"
import { GetDeclaredMethodData } from "../../connectors/method-api"
import { DisplayNodeContainerProps } from "../../containers/nodes/DisplayNodeContainer"

import "./DisplayNode.scss"

export interface DisplayNodeProps extends DisplayNodeContainerProps {}

function DisplayNodeData(props: { data: GetDeclaredMethodData }): React.ReactElement {
    const { data } = props

    const methodName = data.name === "<init>" ? "Constructor Call" : data.name

    return (
        <table className="display-node__data">
            <tbody>
                <tr className="display-node__package display-node__row">
                    <td className="display-node__label">Package</td>
                    <td>{data.className.split("/").slice(0, -1).join(".")}</td>
                </tr>
                <tr className="display-node__class display-node__row">
                    <td className="display-node__label">Class</td>
                    <td>{data.className.split("/").at(-1)}</td>
                </tr>
                <tr className="display-node__method display-node__row">
                    <td className="display-node__label">Method</td>
                    <td>
                        {methodName} {data.modifiers.includes("static") ? "(static)" : ""}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export function DisplayNode(props: DisplayNodeProps): React.ReactElement {
    const { node, onClick } = props

    return (
        <div className="display-node" onClick={onClick}>
            {node !== null ? (
                node.data !== null ? (
                    <DisplayNodeData data={node.data} />
                ) : (
                    node.resourceId
                )
            ) : (
                "No data found."
            )}
        </div>
    )
}
