import React from "react"
import { NavLink } from "react-router-dom"

export interface Location {
    name: string
    url: string
}

export interface TabNavigationProps {
    locations: Location[]
}

export function TabNavigation(props: TabNavigationProps): React.ReactElement {
    const { locations } = props
    return (
        <ul className="flex flex-row p-2 gap-2">
            {locations.map((l) => (
                <li key={l.name}>
                    <NavLink
                        className={({ isActive }) => {
                            let classes =
                                "p-2 cursor-pointer hover:bg-slate-200 transition-colors rounded-md"
                            if (isActive) {
                                classes += " bg-slate-200"
                            }
                            return classes
                        }}
                        to={l.url}
                    >
                        {l.name}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}
