import React from "react"

export interface NavigationOwnProps {
    title: string
}

interface NavigationProps {
    title: string
}

export function Navigation(props: NavigationProps): React.ReactElement {
    const { title } = props

    return (
        <nav className="bg-emerald-400 p-4 shadow-md z-30 col-span-full flex">
            <h1 className="text-2xl font-bold">{title}</h1>
        </nav>
    )
}
