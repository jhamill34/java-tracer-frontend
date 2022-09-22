import React, { useEffect, useState } from "react"
import { Route, Routes, useNavigate, useParams } from "react-router-dom"
import { SimpleGraph } from "../utils/useSimplifiedGraph"
import { InstructionDetailPage } from "./InstructionDetailPage"
import { motion } from "framer-motion"
import { InstructionList } from "../components/lists/InstructionList"
import { IoMdColorWand } from "react-icons/io"
import cx from "classnames"

export interface InstructionListPageProps {
    onLoadGroup: (groupId: string | null) => void
    simpleGraph: SimpleGraph | null
}

export function InstructionListPage(props: InstructionListPageProps): React.ReactElement {
    const { methodId, groupId } = useParams<"methodId" | "groupId">()

    const [instructionId, setInstructionId] = useState<string | null>(null)
    const [instructions, setInstructions] = useState<InstructionModel[]>([])
    const [useColors, setUseColors] = useState(false)

    const { simpleGraph, onLoadGroup } = props

    const navigate = useNavigate()

    useEffect(() => {
        if (groupId != null) {
            setInstructions(simpleGraph?.simpleNodeHash.get(groupId) ?? [])
            onLoadGroup(groupId)
        }
    }, [onLoadGroup, groupId, simpleGraph, setInstructions])

    return (
        <motion.div
            layout="position"
            transition={{ staggerChildren: 0.5 }}
            className="relative h-full flex-shrink-0 flex flex-row"
        >
            <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                className="w-60 overflow-y-scroll border-l-2 border-zinc-200"
                style={{ scrollbarWidth: "none" }}
            >
                <div className="p-2 bg-zinc-100 sticky top-0 shadow-md w-full flex flex-row justify-between">
                    <button
                        className="text-sm bg-transparent text-slate-600 p-2 hover:bg-slate-200 rounded-md transition-colors"
                        onClick={() => {
                            if (methodId != null) {
                                navigate(`/method/${methodId}`)
                                onLoadGroup(null)
                            }
                        }}
                    >
                        Close
                    </button>
                    <button
                        className={cx(
                            "text-sm bg-transparent text-slate-600 p-2 hover:bg-slate-200 rounded-md transition-colors",
                            { "bg-slate-200": useColors },
                        )}
                        onClick={() => {
                            setUseColors((c) => !c)
                        }}
                    >
                        <IoMdColorWand />
                    </button>
                </div>
                <InstructionList
                    useColors={useColors}
                    instructions={instructions}
                    selectedInstructionId={instructionId}
                    onSelectInstruction={(id) => {
                        if (methodId != null && groupId != null) {
                            navigate(`/method/${methodId}/group/${groupId}/instruction/${id}`)
                        }
                    }}
                />
            </motion.div>

            <Routes>
                <Route
                    path="instruction/:instructionId"
                    element={
                        <InstructionDetailPage
                            instructions={instructions}
                            onLoadInstruction={setInstructionId}
                        />
                    }
                />
            </Routes>
        </motion.div>
    )
}
