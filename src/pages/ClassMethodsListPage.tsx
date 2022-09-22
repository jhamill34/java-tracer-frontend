import React from "react"
import { useNavigate } from "react-router-dom"

interface ClassMethodsListPageProps {
    methods: MethodModel[]
}

export function ClassMethodsListPage(props: ClassMethodsListPageProps): React.ReactElement {
    const { methods } = props

    const navigate = useNavigate()

    return (
        <div className="w-full h-full overflow-y-scroll">
            <div className="max-w-screen-lg mx-auto">
                <h2 className="my-4 text-xl font-semibold">Methods</h2>
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-slate-200">
                            <th>Name</th>
                            <th>Parameters</th>
                            <th>Return</th>
                            <th>Modifiers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {methods.map((m) => (
                            <tr
                                key={`${m.id}`}
                                className="border-b-2 border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
                                onClick={() => {
                                    navigate(`/method/${m.id}`)
                                }}
                            >
                                <td className="p-2">{m.name}</td>
                                <td className="p-2">{m.descriptor}</td>
                                <td className="p-2">-</td>
                                <td className="p-2">
                                    {m.modifiers.map((i) => i.toLowerCase()).join(", ")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
