import React from "react"
import { InformationPanelContainerProps } from "../../containers/information-panel/InformationPanelContainer"
import { FaExclamation } from "react-icons/fa"

import "./InformationPanel.scss"

export interface InformationPanelProps extends InformationPanelContainerProps {}

export function InformationPanel(props: InformationPanelProps): React.ReactElement {
    const { methodNode, inboundEdge, classNode } = props

    return (
        <div className="information-panel">
            {methodNode !== null ? (
                <div className="information-panel__method information-panel__container">
                    <h2>Method Info</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>Method Name</td>
                                <td>{methodNode.name}</td>
                            </tr>
                            <tr>
                                <td>Parameters</td>
                                <td>{methodNode.descriptor}</td>
                            </tr>
                            <tr>
                                <td>Return Type</td>
                                <td>{methodNode.descriptor}</td>
                            </tr>
                            <tr>
                                <td>Modifiers</td>
                                <td>
                                    {methodNode.modifiers.map((m) => (
                                        <span key={m} className="information-panel__modifier">
                                            {m}
                                        </span>
                                    ))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="information-panel__container information-panel__warning">
                    <FaExclamation /> Method Information Not Available
                </div>
            )}

            {inboundEdge !== null ? (
                <div className="information-panel__container">
                    <h2>Caller Information</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>Caller</td>
                                <td>{inboundEdge.from}</td>
                            </tr>
                            <tr>
                                <td>Line Number</td>
                                <td>{inboundEdge.data.linenumber}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="information-panel__container information-panel__warning">
                    <FaExclamation /> Caller information not Available
                </div>
            )}

            {methodNode !== null && classNode !== null ? (
                <div className="information-panel__class information-panel__container">
                    <h2>Class Info</h2>

                    <table>
                        <tbody>
                            <tr>
                                <td>Package</td>
                                <td>{classNode.package}</td>
                            </tr>
                            <tr>
                                <td>Java Package</td>
                                <td>{methodNode.className.split("/").slice(0, -1).join(".")}</td>
                            </tr>
                            <tr>
                                <td>Class Name</td>
                                <td>{methodNode.className.split("/").at(-1)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="information-panel__container-section">
                        <h3>Defined Methods</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Parameters</th>
                                    <th>Return</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classNode.methods.map((m) => (
                                    <tr key={m}>
                                        <td>{m.replace(methodNode.className, "")}</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="information-panel__container information-panel__warning">
                    <FaExclamation /> Class Information Not Available
                </div>
            )}
        </div>
    )
}
