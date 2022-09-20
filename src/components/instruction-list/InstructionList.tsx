import React from "react"
import { InstructionModel } from "../../containers/flow/MethodFlow"

export interface InstructionDetailProps {
    instructions: InstructionModel[]
    onClick: (i: InstructionModel) => void
    onClose: () => void
}

export function InstructionList(props: InstructionDetailProps): React.ReactElement {
    const { instructions, onClick, onClose } = props

    return (
        <div>
            <div className="p-2 bg-zinc-100 sticky top-0 shadow-md">
                <button
                    className="text-sm bg-transparent text-slate-600 p-2 hover:bg-slate-200 rounded-md transition-colors"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
            {instructions.map((i) => (
                <button
                    key={i.id}
                    className="w-full text-slate-500 p-2 flex flex-row justify-between items-center hover:bg-slate-200 transition-colors cursor-pointer border-b-2 border-slate-200"
                    onClick={() => {
                        onClick(i)
                    }}
                >
                    <span className="font-mono">{i.opCode}</span>{" "}
                    <span className="text-xs italic text-slate-400">Line {i.lineNumber}</span>
                </button>
            ))}
        </div>
    )
}
