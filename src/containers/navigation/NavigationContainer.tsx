import React from "react"
import { Navigation } from "../../components/navigation/Navigation"

export interface NavigationContainerProps {
    title: string
}

export function NavigationContainer(props: NavigationContainerProps): React.ReactElement {
    return <Navigation {...props} />
}
