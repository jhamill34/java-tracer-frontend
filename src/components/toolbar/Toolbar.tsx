import React from "react"

interface ToolbarProps {
    children: React.ReactNode
}

export function Toolbar(props: ToolbarProps): React.ReactElement {
    return (
        <div className="col-span-full shadow-md z-20 p-2 bg-amber-100 grid grid-cols-12">
            {props.children}
        </div>
    )
}
