import React from "react"

export interface InstructionDetailProps {
    instruction?: InstructionModel
}

export function InstructionDetail(props: InstructionDetailProps): React.ReactElement | null {
    const { instruction } = props

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
            </div>
        )
    } else {
        return null
    }
}
