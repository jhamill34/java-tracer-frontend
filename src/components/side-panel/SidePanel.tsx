import React from "react"

interface SidePanelProps {
    children?: React.ReactNode
}

export function SidePanel(props: SidePanelProps): React.ReactElement {
    const { children } = props

    return (
        <div className="z-10 col-start-10 col-span-3 row-span-2 shadow-md p-4 overflow-y-scroll">
            {children}
        </div>
    )
}
