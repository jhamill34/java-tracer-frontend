import React from "react"
import { DeclaredMethodChartContainer } from "../../containers/chart/DeclaredMethodChartContainer"
import { InformationPanelContainer } from "../../containers/information-panel/InformationPanelContainer"
import { NavigationContainer } from "../../containers/navigation/NavigationContainer"
import { DisplayNodeContainer } from "../../containers/nodes/DisplayNodeContainer"
import { SidePanel } from "../side-panel/SidePanel"
import "./App.scss"

export function App(): React.ReactElement {
    return (
        <div className="grid">
            <NavigationContainer title="Java Tracer" />
            <DeclaredMethodChartContainer
                maxNodes={5}
                spacing={{ vertical: 25, horizontal: 75 }}
                nodeSize={{ width: 325, height: 125 }}
                node={(nodeId: string) => <DisplayNodeContainer nodeId={nodeId} />}
            />
            <SidePanel>
                <InformationPanelContainer />
            </SidePanel>
        </div>
    )
}
