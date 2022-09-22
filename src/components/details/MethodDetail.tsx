import React from "react"

interface MethodDetailProps {
    method: MethodModel
    onClick: () => void
}

export function MethodDetail(props: MethodDetailProps): React.ReactElement {
    const { method, onClick } = props
    return (
        <div
            className="py-2 px-4 m-4 rounded-md border-slate-200 border-2 hover:bg-slate-100 transition-colors cursor-pointer"
            onClick={onClick}
        >
            <h2 className="py-2 font-bold border-b-2 border-slate-200">Method Detail</h2>
            <div className="my-4">
                {method.name}
                {method.descriptor}
            </div>
            <div className="my-4 flex flex-row gap-2">
                {method.modifiers.map((m, i) => (
                    <span key={`${m}-${i}`} className="bg-slate-200 p-2 rounded-md italic">
                        {m.toLowerCase()}
                    </span>
                ))}
            </div>
        </div>
    )
}
