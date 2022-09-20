import React from "react"

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
                <li
                    className="p-2 cursor-pointer hover:bg-slate-200 transition-colors rounded-md"
                    key={l.name}
                >
                    {l.name}
                </li>
            ))}
        </ul>
    )
}
