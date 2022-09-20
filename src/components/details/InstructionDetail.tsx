import React from "react"
import { InstructionModel } from "../../containers/flow/MethodFlow"

export interface InstructionDetailProps {
    instruction: InstructionModel | null
    onGoBack: () => void
}

export function InstructionDetail(props: InstructionDetailProps): React.ReactElement {
    const { instruction, onGoBack } = props

    return (
        <div>
            <div className="bg-zinc-100 p-2 sticky top-0 shadow-md">
                <button
                    className="text-sm bg-transparent text-slate-600 p-2 hover:bg-slate-200 rounded-md transition-colors"
                    onClick={onGoBack}
                >
                    Back
                </button>
            </div>
            {instruction != null && (
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
            )}
        </div>
    )
}
