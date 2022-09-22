import React from "react"
import cx from "classnames"

export interface InstructionListProps {
    useColors: boolean
    selectedInstructionId: string | null
    instructions: InstructionModel[]
    onSelectInstruction: (instructionId: string) => void
}

const COLORS = [
    "bg-red-300",
    "bg-orange-300",
    "bg-amber-300",
    "bg-lime-300",
    "bg-green-300",
    "bg-cyan-300",
    "bg-indigo-300",
    "bg-purple-300",
    "bg-pink-300",
]

export function InstructionList(props: InstructionListProps): React.ReactElement {
    const { instructions, selectedInstructionId, onSelectInstruction, useColors } = props

    let previousLine = -1
    let currentColor = -1
    return (
        <div>
            {instructions.map((i) => {
                if (i.lineNumber !== previousLine) {
                    currentColor = (currentColor + 1) % COLORS.length
                }

                previousLine = i.lineNumber

                const color =
                    selectedInstructionId === i.id
                        ? useColors
                            ? "bg-white"
                            : "bg-slate-200"
                        : useColors
                        ? i.opCode === "UNKNOWN"
                            ? "bg-zinc-300"
                            : COLORS[currentColor]
                        : "bg-white"

                return (
                    <button
                        key={i.id}
                        className={cx(
                            "w-full text-slate-500 p-2 flex flex-row justify-between items-center hover:bg-slate-200 transition-colors cursor-pointer border-b-2 border-slate-200",
                            color,
                        )}
                        onClick={() => {
                            onSelectInstruction(i.id)
                        }}
                    >
                        <span className="font-mono">{i.opCode}</span>{" "}
                        <span className="text-xs italic text-slate-400">Line {i.lineNumber}</span>
                    </button>
                )
            })}
        </div>
    )
}
