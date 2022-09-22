import React from "react"

interface ClassFieldsListPageProps {
    fields: FieldModel[]
}

export function ClassFieldsListPage(props: ClassFieldsListPageProps): React.ReactElement {
    const { fields } = props

    return (
        <div className="w-full h-full overflow-y-scroll">
            <div className="max-w-screen-lg mx-auto">
                <h2 className="my-4 text-xl font-semibold">Fields</h2>
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-slate-200">
                            <th>Name</th>
                            <th>Type</th>
                            <th>Modifiers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map((f) => (
                            <tr key={`${f.id}`} className="border-b-2 border-slate-200">
                                <td className="p-2">{f.name}</td>
                                <td className="p-2">{f.descriptor}</td>
                                <td className="p-2">
                                    {f.modifiers.map((i) => i.toLowerCase()).join(", ")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
