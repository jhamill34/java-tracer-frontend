import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"

export interface RelationsListPageProps {
    relations: ClassModel[]
}

export function RelationsListPage(props: RelationsListPageProps): React.ReactElement {
    const { relations } = props
    const { classId } = useParams<"classId">()
    const navigate = useNavigate()

    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            className="flex-shrink-0 overflow-y-scroll border-l-2 border-zinc-200"
            style={{ scrollbarWidth: "none" }}
        >
            <div className="p-2 bg-zinc-100 sticky top-0 shadow-md w-full">
                <button
                    className="text-sm bg-transparent text-slate-600 p-2 hover:bg-slate-200 rounded-md transition-colors"
                    onClick={() => {
                        if (classId != null) {
                            navigate(`/class/${classId}/relations`)
                        }
                    }}
                >
                    Close
                </button>
            </div>
            <div>
                {relations.map((r) => (
                    <button
                        key={r.id}
                        className="w-full text-slate-500 p-2 hover:bg-slate-200 transition-colors cursor-pointer border-b-2 border-slate-200 flex flex-row justify-between"
                        onClick={() => {
                            navigate(`/class/${r.id}`)
                        }}
                    >
                        <span>{r.name}</span>
                        <span className="text-xs italic text-slate-400">{r.packageName}</span>
                    </button>
                ))}
            </div>
        </motion.div>
    )
}
