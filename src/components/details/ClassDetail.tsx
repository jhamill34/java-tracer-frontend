import React from "react"

interface ClassDetailProps {
    classModel: ClassModel
    onClick: () => void
}

export function ClassDetail(props: ClassDetailProps): React.ReactElement {
    const { classModel, onClick } = props
    return (
        <div
            className="py-2 px-4 m-4 rounded-md border-slate-200 border-2 hover:bg-slate-100 transition-colors cursor-pointer"
            onClick={onClick}
        >
            <h2 className="py-2 font-bold border-b-2 border-slate-200">Class Detail</h2>
            <div className="my-4">{classModel.name}</div>
            <div className="my-4">{classModel.packageName}</div>
        </div>
    )
}
