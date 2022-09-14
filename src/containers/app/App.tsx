import React, { useState } from "react"
import { SidePanel } from "../../components/side-panel/SidePanel"
import { Toolbar } from "../../components/toolbar/Toolbar"
import { MethodFlow } from "../flow/MethodFlow"
import { NavigationContainer } from "../navigation/NavigationContainer"
import { ClassSearch } from "../search/ClassSearch"
import { ClassInfoPanelContainer } from "../side-panel/ClassInfoPanelContainer"

export const TITLE = "Java Tracer"

export function App(): React.ReactElement {
    const [selectedClassId, setSelectedClassId] = useState<string | null>(null)
    const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null)

    return (
        <div className="grid grid-cols-12 grid-rows-[auto_auto_minmax(0,1fr)] fixed top-0 left-0 right-0 bottom-0">
            <NavigationContainer title={TITLE} />
            <Toolbar>
                <ClassSearch onSelect={setSelectedClassId} />
            </Toolbar>
            <div className="col-span-8">
                {selectedMethodId != null ? (
                    <MethodFlow id={selectedMethodId} />
                ) : (
                    <div>No method selected</div>
                )}
            </div>
            <SidePanel>
                {selectedClassId != null && (
                    <ClassInfoPanelContainer
                        onSelectMethod={setSelectedMethodId}
                        onSelectClass={setSelectedClassId}
                        id={selectedClassId}
                    />
                )}
            </SidePanel>
        </div>
    )
}
