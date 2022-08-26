import React from "react"

import "./SidePanel.scss"

interface SidePanelProps {
    children?: React.ReactNode
}

export function SidePanel(props: SidePanelProps): React.ReactElement {
    const { children } = props

    return <div className="side-panel">{children}</div>
}
