import { gql, useQuery } from "@apollo/client"
import React from "react"
import { ErrorComponent } from "../../components/errors/Error"
import { Flow } from "../../components/flow/Flow"
import { Loading } from "../../components/loading/Loading"
import { SidePanel } from "../../components/side-panel/SidePanel"
import { Toolbar } from "../../components/toolbar/Toolbar"
import { NavigationContainer } from "../navigation/NavigationContainer"
import "./App.scss"

export const TITLE = "Java Tracer"

interface GetSelected {
    selected: string
}

export const SELECTED_QUERY = gql`
    query GetSelected {
        selected @client
    }
`

export function App(): React.ReactElement {
    const { loading, error } = useQuery<GetSelected>(SELECTED_QUERY)

    if (loading) return <Loading />
    if (error != null) return <ErrorComponent />

    return (
        <div className="grid">
            <NavigationContainer title={TITLE} />
            <Toolbar />
            <Flow />
            <SidePanel />
        </div>
    )
}
