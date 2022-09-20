import React from "react"

interface ToolbarProps {
    children: React.ReactNode
}

export function Toolbar(props: ToolbarProps): React.ReactElement {
    return (
        <div className="shadow-md p-2 z-20 bg-secondary text-dark grid grid-cols-12">
            {props.children}
        </div>
    )
}
