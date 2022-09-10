import { gql, useQuery } from "@apollo/client"
import React from "react"
import { ErrorComponent } from "../../components/errors/Error"
import { Loading } from "../../components/loading/Loading"

interface ChartContainerProps {
    selected: string
}

interface ClassAttributes {
    name: string
    packageName: string
    modifiers: string[]
}

interface GetClassData {
    getClass: ClassAttributes
}

interface GetClassVariables {
    name: string
}

export const GET_CLASS = gql`
    query GetClass($name: String!) {
        getClass(name: $name) {
            name
            packageName
            modifiers
        }
    }
`

export function ChartContainer(props: ChartContainerProps): React.ReactElement {
    const { selected } = props

    const { data, loading, error } = useQuery<GetClassData, GetClassVariables>(GET_CLASS, {
        variables: { name: selected },
    })

    if (loading) return <Loading />
    if (error != null) return <ErrorComponent />

    return (
        <div>
            {data != null ? (
                <div>
                    {data.getClass.packageName} {data.getClass.modifiers.join(" ")}
                </div>
            ) : (
                "No Data"
            )}
        </div>
    )
}
