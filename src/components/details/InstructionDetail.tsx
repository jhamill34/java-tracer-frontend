import React from "react"

export interface InstructionDetailProps {
    instruction?: InstructionModel
    onSelectMethod: (id: string) => void
    onSelectClass: (id: string) => void
    onSelectField: (id: string) => void
}

export function InstructionDetail(props: InstructionDetailProps): React.ReactElement | null {
    const { instruction, onSelectMethod, onSelectClass, onSelectField } = props

    if (instruction != null) {
        return (
            <div className="p-2">
                <h3 className="font-semibold border-slate-200 py-2 mb-4">
                    OpCode: <span className="font-mono">{instruction.opCode}</span>
                </h3>
                <p className="text-sm italic p-2 my-2 rounded-md bg-slate-200">{'"Description"'}</p>

                <h4 className="font-semibold mb-4 mt-8">Stack</h4>
                <ul>
                    {instruction.stack
                        .slice(0)
                        .reverse()
                        .map((s, idx) => (
                            <li className="border-b-2 border-slate-100 p-2" key={`${s}-${idx}`}>
                                {s}
                            </li>
                        ))}
                </ul>

                {instruction.enteringVariables.edges.length > 0 && (
                    <>
                        <h4 className="font-semibold mb-4 mt-8">Entering Variables</h4>
                        <ul>
                            {instruction.enteringVariables.edges.map((v, idx) => (
                                <li
                                    className="border-b-2 border-slate-100 p-2"
                                    key={`${v.node.name}-${idx}`}
                                >
                                    {v.node.name}: {v.node.descriptor}
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {instruction.exitingVariables.edges.length > 0 && (
                    <>
                        <h4 className="font-semibold mb-4 mt-8">Exiting Variables</h4>
                        <ul>
                            {instruction.exitingVariables.edges.map((v, idx) => (
                                <li
                                    className="border-b-2 border-slate-100 p-2"
                                    key={`${v.node.name}-${idx}`}
                                >
                                    {v.node.name}: {v.node.descriptor}
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {instruction.reference != null &&
                    instruction.reference.__typename === "MethodModel" && (
                        <>
                            <h4 className="font-semibold mb-4 mt-8">Method Call</h4>
                            <button
                                className="w-full text-left bg-transparent text-slate-600 p-2 enabled:hover:bg-slate-200 disabled:text-zinc-300 rounded-md transition-colors"
                                onClick={() => {
                                    if (instruction.reference != null) {
                                        onSelectClass(instruction.reference.owner.id)
                                    }
                                }}
                            >
                                Owner: {instruction.reference.owner.name}
                            </button>
                            <button
                                className="w-full text-left bg-transparent text-slate-600 p-2 enabled:hover:bg-slate-200 disabled:text-zinc-300 rounded-md transition-colors"
                                onClick={() => {
                                    if (instruction.reference != null) {
                                        onSelectMethod(instruction.reference.id)
                                    }
                                }}
                            >
                                {instruction.reference.name} {instruction.reference.descriptor}
                            </button>
                        </>
                    )}

                {instruction.reference != null &&
                    instruction.reference.__typename === "FieldModel" && (
                        <>
                            <h4 className="font-semibold mb-4 mt-8">Field Access</h4>
                            <button
                                className="w-full text-left bg-transparent text-slate-600 p-2 enabled:hover:bg-slate-200 disabled:text-zinc-300 rounded-md transition-colors"
                                onClick={() => {
                                    if (instruction.reference != null) {
                                        onSelectClass(instruction.reference.owner.id)
                                    }
                                }}
                            >
                                Owner: {instruction.reference.owner.name}
                            </button>
                            <button
                                className="w-full text-left bg-transparent text-slate-600 p-2 enabled:hover:bg-slate-200 disabled:text-zinc-300 rounded-md transition-colors"
                                onClick={() => {
                                    if (instruction.reference != null) {
                                        onSelectField(instruction.reference.owner.id)
                                    }
                                }}
                            >
                                {instruction.reference.name}: {instruction.reference.descriptor}
                            </button>
                        </>
                    )}
            </div>
        )
    } else {
        return null
    }
}
