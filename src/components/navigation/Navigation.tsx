import React from "react"
import { Logo } from "../icon/Logo"

export interface NavigationOwnProps {
    title: string
}

interface NavigationProps {
    title: string
}

export function Navigation(props: NavigationProps): React.ReactElement {
    const { title } = props

    return (
        <nav className="bg-white text-slate-600 p-4 flex flex-row items-center border-b-2 border-zinc-200 col-span-full justify-between">
            <div className="flex flex-row items-center">
                <Logo />
                <h1 className="text-2xl mx-4 p-2 hover:bg-slate-100 transition-colors cursor-pointer rounded-md">
                    {title}
                </h1>
            </div>
            <div>
                <button className="p-2 hover:bg-slate-200 transition-colors rounded-md">
                    Upload
                </button>
            </div>
        </nav>
    )
}
