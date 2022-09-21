import { gql, useQuery } from "@apollo/client"
import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClassDetail } from "../components/details/ClassDetail"
import { ErrorComponent } from "../components/errors/Error"
import { PageLayout } from "../components/layout/PageLayout"
import { Loading } from "../components/loading/Loading"
import { TabNavigation } from "../components/tab/TabNavigation"

interface ClassResponse {
    class: ClassModel
}

interface GetClassInput {
    id: string
}

export function ClassPage(): React.ReactElement {
    const navigate = useNavigate()
    const { classId } = useParams<"classId">()

    const { data, loading, error } = useQuery<ClassResponse, GetClassInput>(CLASS_PAGE_QUERY, {
        variables: { id: classId ?? "" },
    })

    if (loading) return <Loading />
    if (error != null) return <ErrorComponent />

    if (data != null && classId != null) {
        return (
            <PageLayout
                heading={
                    <div>
                        <ClassDetail
                            classModel={data.class}
                            onClick={() => {
                                if (classId != null) {
                                    navigate(`/class/${classId}`)
                                }
                            }}
                        />
                        <TabNavigation
                            locations={[
                                { name: "Methods", url: `/class/${classId}/methods` },
                                { name: "Relations", url: `/class/${classId}/relations` },
                            ]}
                        />
                    </div>
                }
            >
                <div></div>
            </PageLayout>
        )
    } else {
        return <ErrorComponent />
    }
}

export const CLASS_PAGE_QUERY = gql`
    query GetClass($id: String!) {
        class(id: $id) {
            name
            packageName
            modifiers
            methods {
                edges {
                    node {
                        id
                        name
                        descriptor
                    }
                }
            }
        }
    }
`
