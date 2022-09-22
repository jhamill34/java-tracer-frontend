import { gql, useQuery } from "@apollo/client"
import React from "react"
import { Route, Routes, useNavigate, useParams } from "react-router-dom"
import { ClassDetail } from "../components/details/ClassDetail"
import { ErrorComponent } from "../components/errors/Error"
import { PageLayout } from "../components/layout/PageLayout"
import { Loading } from "../components/loading/Loading"
import { TabNavigation } from "../components/tab/TabNavigation"
import { ClassFieldsListPage } from "./ClassFieldsListPage"
import { ClassMethodsListPage } from "./ClassMethodsListPage"
import { ClassRelationsPage } from "./ClassRelationsPage"

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
                                { name: "Fields", url: `/class/${classId}/fields` },
                                { name: "Methods", url: `/class/${classId}/methods` },
                                { name: "Relations", url: `/class/${classId}/relations` },
                            ]}
                        />
                    </div>
                }
            >
                <Routes>
                    <Route
                        path="fields"
                        element={
                            <ClassFieldsListPage
                                fields={data.class.fields.edges.map((n) => n.node)}
                            />
                        }
                    />
                    <Route
                        path="methods"
                        element={
                            <ClassMethodsListPage
                                methods={data.class.methods.edges.map((n) => n.node)}
                            />
                        }
                    />
                    <Route
                        path="relations*"
                        element={<ClassRelationsPage classModel={data.class} />}
                    />
                </Routes>
            </PageLayout>
        )
    } else {
        return <ErrorComponent />
    }
}

export const CLASS_PAGE_QUERY = gql`
    query GetClass($id: String!) {
        class(id: $id) {
            id
            name
            packageName
            modifiers
            methods {
                edges {
                    node {
                        id
                        name
                        descriptor
                        modifiers
                    }
                }
            }
            fields {
                edges {
                    node {
                        id
                        name
                        descriptor
                        modifiers
                    }
                }
            }
            superClass {
                id
                name
                packageName
            }
            subClasses {
                edges {
                    node {
                        id
                        name
                        packageName
                    }
                }
            }
            implements {
                edges {
                    node {
                        id
                        name
                        packageName
                    }
                }
            }
            implementedBy {
                edges {
                    node {
                        id
                        name
                        packageName
                    }
                }
            }
        }
    }
`
