import React from "react"

export interface InstructionDetailProps {
    instruction?: InstructionModel
}

export function InstructionDetail(props: InstructionDetailProps): React.ReactElement | null {
    const { instruction } = props

    if (instruction != null) {
        return (
            <div className="p-2">
                <h3 className="font-semibold border-slate-200 p-y-2">
                    OpCode: <span className="font-mono">{instruction.opCode}</span>
                </h3>
                <p className="text-sm italic p-2 my-2 rounded-md bg-slate-200 mb-8">
                    {'"Description"'}
                </p>

                <h4 className="font-semibold">Stack</h4>
                <ul className="mb-8">
                    {instruction.stack
                        .slice(0)
                        .reverse()
                        .map((s, idx) => (
                            <li className="border-b-2 border-slate-100 p-2" key={`${s}-${idx}`}>
                                {s}
                            </li>
                        ))}
                </ul>
            </div>
        )
    } else {
        return null
    }
}
