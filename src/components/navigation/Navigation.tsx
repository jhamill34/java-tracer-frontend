import React from "react"
import "./Navigation.scss"

export interface NavigationOwnProps {
    title: string
}

interface NavigationProps {
    title: string
}

export function Navigation(props: NavigationProps): React.ReactElement {
    const { title } = props

    return (
        <nav className="navigation">
            <h1 className="navigation__header">{title}</h1>
        </nav>
    )
}
