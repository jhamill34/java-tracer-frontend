import React, { useState } from "react"

export interface ClassModelRef {
    id: string
    name: string
    packageName: string
}

export interface MethodRef {
    id: string
    name: string
    descriptor: string
    modifiers: string[]
}

export interface FullClassModel {
    name: string
    signature?: string
    packageName: string
    modifiers?: string[]
    subClasses?: ClassModelRef[]
    superClasses?: ClassModelRef[]
    implementors?: ClassModelRef[]
    implemented?: ClassModelRef[]
    methods?: MethodRef[]
}

export interface ClassInfoPanelProps {
    classModel: FullClassModel
    onSelectClass: (ref: ClassModelRef) => void
    onSelectMethod: (ref: MethodRef) => void
}

interface ClassReferencePanelProps {
    title: string
    models: ClassModelRef[]
    onSelectClass: (ref: ClassModelRef) => void
}

interface MethodReferencePanelProps {
    models: MethodRef[]
    onSelectMethod: (ref: MethodRef) => void
}

export function MethodReferencePanel(props: MethodReferencePanelProps): React.ReactElement {
    const { models, onSelectMethod } = props

    const [open, setOpen] = useState(false)

    return (
        <div className="m-4 p-4 shadow-md">
            <h2
                className="font-bold text-mb mb-2 flex flex-row justify-between items-center cursor-pointer"
                onClick={() => setOpen((o) => !o)}
            >
                <span>Methods</span>
                <button className="px-2">{open ? <>&#8593;</> : <>&#8595;</>}</button>
            </h2>
            {open && (
                <ul>
                    {models.map((m) =>
                        m != null ? (
                            <li
                                className="p-2 flex flex-row justify-between items-baseline hover:bg-slate-100 transition-colors cursor-pointer"
                                key={m.id}
                                onClick={() => onSelectMethod(m)}
                            >
                                <div>
                                    {m.name}
                                    {m.descriptor}
                                </div>
                                <div className="flex flex-row">
                                    {m.modifiers.map((a, i) => (
                                        <span
                                            className="text-xs italic gap-1 bg-emerald-500 text-white py-1 px-3 rounded-full shadow-sm"
                                            key={`${a}-${i}`}
                                        >
                                            {a.toLowerCase()}
                                        </span>
                                    ))}
                                </div>
                            </li>
                        ) : null,
                    )}
                </ul>
            )}
        </div>
    )
}

export function ClassReferencePanel(props: ClassReferencePanelProps): React.ReactElement {
    const { title, models, onSelectClass } = props

    const [open, setOpen] = useState(false)

    return (
        <div className="m-4 p-4 shadow-md">
            <h2
                className="font-bold text-mb mb-2 flex flex-row justify-between items-center cursor-pointer"
                onClick={() => setOpen((o) => !o)}
            >
                <span>{title}</span>
                <button className="px-2">{open ? <>&#8593;</> : <>&#8595;</>}</button>
            </h2>
            {open && (
                <ul>
                    {models.map((m) =>
                        m != null ? (
                            <li
                                className="p-2 flex flex-row justify-between items-baseline hover:bg-slate-100 transition-colors cursor-pointer"
                                key={m.id}
                                onClick={() => onSelectClass(m)}
                            >
                                <div>{m.name}</div>
                                <div className="text-slate-500 text-xs italic">{m.packageName}</div>
                            </li>
                        ) : null,
                    )}
                </ul>
            )}
        </div>
    )
}

export function ClassInfoPanel(props: ClassInfoPanelProps): React.ReactElement {
    const { classModel, onSelectClass, onSelectMethod } = props
    return (
        <div>
            <div className="m-4 p-4 shadow-md">
                <h2 className="font-bold text-lg mb-2">Class Info</h2>
                <table className="w-full table-auto">
                    <tbody>
                        <tr className="border-b-2 border-gray">
                            <td className="font-bold">Name</td>
                            <td className="p-2">{classModel.name}</td>
                        </tr>
                        <tr className="border-b-2 border-gray">
                            <td className="font-bold">Package</td>
                            <td className="p-2">{classModel.packageName ?? "<Unknown>"}</td>
                        </tr>
                        <tr className="border-b-2">
                            <td className="font-bold">Signature</td>
                            <td className="p-2">
                                {classModel.signature != null && classModel.signature !== "NULL"
                                    ? classModel.signature
                                    : "-"}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold">Modifiers</td>
                            <td>
                                <div className="flex gap-1 p-2">
                                    {classModel?.modifiers?.map((m, i) => (
                                        <span
                                            className="text-sm bg-emerald-500 text-white py-1 px-3 rounded-full shadow-sm"
                                            key={`${m}-${i}`}
                                        >
                                            {m != null ? m.toLowerCase() : "null"}
                                        </span>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <MethodReferencePanel
                models={classModel?.methods ?? []}
                onSelectMethod={onSelectMethod}
            />

            <ClassReferencePanel
                title="Super Classes"
                models={classModel?.superClasses ?? []}
                onSelectClass={onSelectClass}
            />
            <ClassReferencePanel
                title="Sub Classes"
                models={classModel?.subClasses ?? []}
                onSelectClass={onSelectClass}
            />
            <ClassReferencePanel
                title="Implementors"
                models={classModel?.implementors ?? []}
                onSelectClass={onSelectClass}
            />
            <ClassReferencePanel
                title="Implemented interfaces"
                models={classModel?.implemented ?? []}
                onSelectClass={onSelectClass}
            />
        </div>
    )
}
