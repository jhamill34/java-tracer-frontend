import React, { Children } from "react"
import cx from "classnames"

export interface MultiDrawerProps {
    index: number
    children: React.ReactNode
    drawers: React.ReactNode
}

export function MultiDrawer(props: MultiDrawerProps): React.ReactElement {
    const { children, drawers } = props

    return (
        <div className="relative w-full h-full" style={{}}>
            {children}
            <div className={cx("absolute top-0 bottom-0 left-full transition-transform")}>
                {Children.map(drawers, (drawer) => (
                    <div
                        className={cx("border-l-2 border-zinc-200 bg-white overflow-y-scroll")}
                        style={{ scrollbarWidth: "none" }}
                    >
                        {drawer}
                    </div>
                ))}
            </div>
        </div>
    )
}
