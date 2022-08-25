import React from "react"
import { DeclaredMethodChartContainer } from "../../containers/chart/DeclaredMethodChartContainer"
import { NavigationContainer } from "../../containers/navigation/NavigationContainer"
import { SidePanel } from "../side-panel/SidePanel"
import "./App.scss"

export function App(): React.ReactElement {
    return (
        <div className="grid">
            <NavigationContainer title="Java Tracer" />
            <DeclaredMethodChartContainer
                spacing={{ vertical: 50, horizontal: 100 }}
                nodeSize={{ width: 400, height: 100 }}
            />
            <SidePanel active={false}></SidePanel>
        </div>
    )
}
