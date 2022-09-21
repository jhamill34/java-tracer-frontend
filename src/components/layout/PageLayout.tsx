import React from "react"
import { NavigationContainer } from "../../containers/navigation/NavigationContainer"

export const TITLE = "Java Tracer"

export interface PageLayoutProps {
    heading: React.ReactNode
    children: React.ReactNode
}

export function PageLayout(props: PageLayoutProps): React.ReactElement {
    const { heading, children } = props

    return (
        <div className="fixed inset-0 grid grid-rows-[auto_auto_minmax(0,1fr)] grid-cols-12 text-slate-600">
            <NavigationContainer title={TITLE} />
            <div className="col-span-full bg-zinc-100 border-b-2 border-zinc-200 shadow-inner">
                {heading}
            </div>
            <div className="col-span-full flex flex-row">{children}</div>
        </div>
    )
}
