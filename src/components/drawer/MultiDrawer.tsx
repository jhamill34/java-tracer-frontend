import React, { useState } from "react"
import cx from "classnames"

enum DrawerState {
    CLOSED = 0,
    FIRST = 1,
    SECOND = 2,
}

export interface MultiDrawerProps {
    state: DrawerState
    first: React.ReactNode
    second: React.ReactNode
    children: React.ReactNode
}

interface DrawerStateHoodResult {
    state: DrawerState
    open: () => void
    next: () => void
    previous: () => void
    close: () => void
}

export function useDrawerState(): DrawerStateHoodResult {
    const [state, setSidebarState] = useState(DrawerState.CLOSED)

    return {
        state,
        open: () => {
            setSidebarState(DrawerState.FIRST)
        },
        next: () => {
            setSidebarState((s) => (s !== DrawerState.SECOND ? s + 1 : s))
        },
        previous: () => {
            setSidebarState((s) => (s !== DrawerState.CLOSED ? s - 1 : s))
        },
        close: () => {
            setSidebarState(DrawerState.CLOSED)
        },
    }
}

export function MultiDrawer(props: MultiDrawerProps): React.ReactElement {
    const { first, second, children, state } = props

    let paddingRight
    switch (state) {
        case DrawerState.FIRST:
            paddingRight = `${100 / 12}%`
            break
        case DrawerState.SECOND:
            paddingRight = "25%"
            break
        case DrawerState.CLOSED:
        default:
            paddingRight = "0%"
    }

    return (
        <div className="relative w-full h-full" style={{ paddingRight }}>
            {children}
            <div
                className={cx(
                    "absolute top-0 bottom-0 left-full w-4/12 transition-transform grid grid-cols-4",
                    {
                        "-translate-x-1/2": state === DrawerState.FIRST,
                        "-translate-x-full": state === DrawerState.SECOND,
                    },
                )}
            >
                <div
                    className={cx(
                        "border-l-2 border-zinc-200 bg-white col-span-2 overflow-y-scroll",
                    )}
                    style={{ scrollbarWidth: "none" }}
                >
                    {first}
                </div>
                <div
                    className={cx(
                        "border-l-2 border-zinc-200 bg-white col-span-2 overflow-y-scroll",
                    )}
                    style={{ scrollbarWidth: "none" }}
                >
                    {second}
                </div>
            </div>
        </div>
    )
}
