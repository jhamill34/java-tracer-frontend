import React from "react"
import cx from "classnames"

export interface InstructionListProps {
    selectedInstructionId: string | null
    instructions: InstructionModel[]
    onSelectInstruction: (instructionId: string) => void
}

export function InstructionList(props: InstructionListProps): React.ReactElement {
    const { instructions, selectedInstructionId, onSelectInstruction } = props

    return (
        <div>
            {instructions.map((i) => (
                <button
                    key={i.id}
                    className={cx(
                        "w-full text-slate-500 p-2 flex flex-row justify-between items-center hover:bg-slate-200 transition-colors cursor-pointer border-b-2 border-slate-200",
                        {
                            "bg-slate-200": i.id === selectedInstructionId,
                            "bg-white": i.id !== selectedInstructionId,
                        },
                    )}
                    onClick={() => {
                        onSelectInstruction(i.id)
                    }}
                >
                    <span className="font-mono">{i.opCode}</span>{" "}
                    <span className="text-xs italic text-slate-400">Line {i.lineNumber}</span>
                </button>
            ))}
        </div>
    )
}
