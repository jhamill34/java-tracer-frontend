import React from "react"

import "./SidePanel.scss"

interface SidePanelProps {
    active: boolean
    children?: React.ReactNode
}

export function SidePanel(props: SidePanelProps): React.ReactElement {
    const { active, children } = props

    let className = "side-panel"
    if (active) {
        className += " active"
    }

    return <div className={className}>{children}</div>
}
