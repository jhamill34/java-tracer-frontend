import React from "react"
import { DeclaredMethodChartContainer } from "../../containers/chart/DeclaredMethodChartContainer"
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
                spacing={{ vertical: 25, horizontal: 100 }}
                nodeSize={{ width: 400, height: 150 }}
                node={(nodeId: string) => <DisplayNodeContainer nodeId={nodeId} />}
            />
            <SidePanel active={false}></SidePanel>
        </div>
    )
}
