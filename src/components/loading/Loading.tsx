import React from "react"

import "./Loading.css"

export function Loading(): React.ReactElement {
    return (
        <div className="w-full h-full flex flex-row items-center justify-center">
            <svg className="loading__svg" width="100" height="100" viewBox="0 0 100 100">
                <circle
                    className="loading__circle stroke-slate-400 fill-transparent"
                    cx="50"
                    cy="50"
                    r="40"
                />
            </svg>
        </div>
    )
}
