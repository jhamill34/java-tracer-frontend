import { ApolloClient, ApolloProvider } from "@apollo/client"
import React from "react"
import { createRoot } from "react-dom/client"

import { App } from "./containers/app/App"
import { cache } from "./state/cache"

import "./styles.css"

const container = document.getElementById("root")

const client = new ApolloClient({
    uri: `http://localhost:3000/graphql`,
    cache,
})

if (container !== null) {
    const root = createRoot(container)
    root.render(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>,
    )
} else {
    console.error("Something went wrong rendering this app.")
}
