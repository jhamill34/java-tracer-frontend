import React from "react"
import { createRoot } from "react-dom/client"

import { App } from "./components/app/App"

const container = document.getElementById("root")

if (container !== null) {
    const root = createRoot(container)
    root.render(<App />)
} else {
    console.error("Something went wrong rendering this app.")
}
