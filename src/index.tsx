import React from "react"
import { createRoot } from "react-dom/client"

import { App } from "./components/app/App"
import { store } from "./state/store"
import { Provider } from "react-redux"

const container = document.getElementById("root")

if (container !== null) {
    const root = createRoot(container)
    root.render(
        <Provider store={store}>
            <App />
        </Provider>,
    )
} else {
    console.error("Something went wrong rendering this app.")
}
