import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import React from "react"
import { createRoot } from "react-dom/client"

import { App } from "./components/app/App"

const container = document.getElementById("root")

const client = new ApolloClient({
    uri: `http://localhost:3000`,
    cache: new InMemoryCache(),
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
