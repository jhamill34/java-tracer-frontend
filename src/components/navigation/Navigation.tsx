import React, { useState } from "react"
import { NavigationContainerProps } from "../../containers/navigation/NavigationContainer"
import "./Navigation.scss"

export interface NavigationOwnProps {
    title: string
}

type NavigationProps = NavigationOwnProps & NavigationContainerProps

const DEFAULT_VALUE = "tech/jhamill34/app/Application"

export function Navigation(props: NavigationProps): React.ReactElement {
    const [searchValue, setSearchValue] = useState(DEFAULT_VALUE)
    const { title, onSubmit } = props

    return (
        <nav className="navigation">
            <h1 className="navigation__header">{title}</h1>
            <form
                className="navigation__input-group"
                onSubmit={(event) => {
                    event.preventDefault()
                    onSubmit(searchValue)
                }}
            >
                <input
                    className="navigation__input"
                    type="text"
                    value={searchValue}
                    onChange={(event) => {
                        setSearchValue(event.target.value)
                    }}
                />
            </form>
        </nav>
    )
}
