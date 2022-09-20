import React from "react"

export function Logo(): React.ReactElement {
    return (
        <svg className="inline-block h-full" width="42" height="42" viewBox="0 0 100 100">
            <path
                strokeWidth="5"
                className="fill-transparent stroke-slate-600"
                d="M 15 50 L 50 75"
            />
            <path
                strokeWidth="5"
                className="fill-transparent stroke-slate-600"
                d="M 15 50 L 50 25"
            />
            <path
                strokeWidth="5"
                className="fill-transparent stroke-slate-600"
                d="M 50 75 L 85 50"
            />
            <path
                strokeWidth="5"
                className="fill-transparent stroke-slate-600"
                d="M 50 25 L 85 50"
            />
            <path
                strokeWidth="5"
                className="fill-transparent stroke-slate-600"
                d="M 50 25 L 50 75"
            />
            <path
                strokeWidth="5"
                className="fill-transparent stroke-slate-600"
                d="M 15 50 L 85 50"
            />
            <path
                strokeWidth="5"
                className="fill-transparent stroke-slate-600"
                d="M 50 25 L 85 25"
            />
            <path
                strokeWidth="5"
                className="fill-transparent stroke-slate-600"
                d="M 50 75 L 85 75"
            />

            <circle
                strokeWidth="5"
                className="fill-white stroke-slate-600"
                cx="15"
                cy="50"
                r="10"
            />
            <circle
                strokeWidth="5"
                className="fill-white stroke-slate-600"
                cx="50"
                cy="75"
                r="10"
            />
            <circle
                strokeWidth="5"
                className="fill-white stroke-slate-600"
                cx="50"
                cy="25"
                r="10"
            />
            <circle
                strokeWidth="5"
                className="fill-white stroke-slate-600"
                cx="85"
                cy="50"
                r="10"
            />
            <circle
                strokeWidth="5"
                className="fill-white stroke-slate-600"
                cx="50"
                cy="50"
                r="10"
            />

            <circle
                strokeWidth="5"
                className="fill-white stroke-slate-600"
                cx="85"
                cy="25"
                r="10"
            />
            <circle
                strokeWidth="5"
                className="fill-white stroke-slate-600"
                cx="85"
                cy="75"
                r="10"
            />
        </svg>
    )
}
