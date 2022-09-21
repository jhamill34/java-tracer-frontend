import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import cx from "classnames"
import { InstructionDetail } from "../components/details/InstructionDetail"

interface InstructionDetailPageProps {
    instructions: InstructionModel[]
    onLoadInstruction: (id: string) => void
}

export function InstructionDetailPage(props: InstructionDetailPageProps): React.ReactElement {
    const { methodId, groupId, instructionId } = useParams<
        "instructionId" | "groupId" | "methodId"
    >()
    const [instrIdx, setInstrIdx] = useState(0)
    const navigate = useNavigate()
    const { instructions, onLoadInstruction } = props

    useEffect(() => {
        if (instructionId != null) {
            setInstrIdx(instructions.findIndex((i) => i.id === instructionId))
            onLoadInstruction(instructionId)
        }
    }, [instructionId, instructions, onLoadInstruction, setInstrIdx])

    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            className="w-96 overflow-y-scroll border-l-2 border-zinc-200"
            style={{ scrollbarWidth: "none" }}
        >
            <div className="bg-zinc-100 p-2 sticky top-0 shadow-md flex flex-row justify-between">
                <button
                    disabled={instrIdx === 0}
                    className={cx(
                        "text-sm bg-transparent text-slate-600 p-2 enabled:hover:bg-slate-200 disabled:text-zinc-300 rounded-md transition-colors",
                    )}
                    onClick={() => {
                        if (methodId != null && groupId != null && instrIdx > 0) {
                            navigate(
                                `/method/${methodId}/group/${groupId}/instruction/${
                                    instructions[instrIdx - 1].id
                                }`,
                            )
                        }
                    }}
                >
                    Previous
                </button>
                <button
                    className={cx(
                        "text-sm bg-transparent text-slate-600 p-2 enabled:hover:bg-slate-200 disabled:text-zinc-300 rounded-md transition-colors",
                    )}
                    disabled={instrIdx === instructions.length - 1}
                    onClick={() => {
                        if (
                            methodId != null &&
                            groupId != null &&
                            instrIdx < instructions.length - 1
                        ) {
                            navigate(
                                `/method/${methodId}/group/${groupId}/instruction/${
                                    instructions[instrIdx + 1].id
                                }`,
                            )
                        }
                    }}
                >
                    Next
                </button>
            </div>
            <InstructionDetail instruction={instructions.at(instrIdx)} />
        </motion.div>
    )
}
