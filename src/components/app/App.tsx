import React from "react"
import { Navigation } from "../navigation/Navigation"
import "./App.scss"

export function App(): React.ReactElement {
    return (
        <div className="grid">
            <Navigation title="Java Tracer" onSubmit={() => {}} />
        </div>
    )
}
