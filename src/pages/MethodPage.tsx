import React, { useState } from "react"
import { MethodDetail } from "../components/details/MethodDetail"
import { PageLayout } from "../components/layout/PageLayout"
import { gql, useQuery } from "@apollo/client"
import { Loading } from "../components/loading/Loading"
import { ErrorComponent } from "../components/errors/Error"
import { Flow } from "../components/flow/Flow"
import { useSimplifiedGraph } from "../utils/useSimplifiedGraph"
import { Route, Routes, useNavigate, useParams } from "react-router-dom"
import { InstructionListPage } from "./InstructionListPage"
import { ClassDetail } from "../components/details/ClassDetail"

interface MethodResponse {
    method: MethodModel
}

interface GetMethodInput {
    id: string
}

export function MethodPage(): React.ReactElement {
    const { methodId } = useParams<"methodId">()
    const [groupId, setGroupId] = useState<string | null>(null)

    const navigate = useNavigate()

    const { data, loading, error } = useQuery<MethodResponse, GetMethodInput>(
        GET_METHOD_GRAPH_QUERY,
        {
            variables: { id: methodId ?? "" },
        },
    )

    const [nodes, edges, simpleGraph] = useSimplifiedGraph(data?.method)

    if (loading) return <Loading />
    if (error != null) return <ErrorComponent />

    if (data != null) {
        return (
            <PageLayout
                heading={
                    <div className="flex flex-row justify-start">
                        <ClassDetail
                            classModel={data.method.owner}
                            onClick={() => {
                                navigate(`/class/${data.method.owner.id}`)
                            }}
                        />
                        <MethodDetail
                            method={data.method}
                            onClick={() => {
                                if (methodId != null) {
                                    navigate(`/method/${methodId}`)
                                }
                            }}
                        />
                    </div>
                }
            >
                <Flow
                    nodes={nodes}
                    edges={edges}
                    selectedNode={groupId}
                    onNodeSelect={(id: string) => {
                        if (methodId != null) {
                            navigate(`/method/${methodId}/group/${id}`)
                        }
                    }}
                />

                <Routes>
                    <Route
                        path="group/:groupId/*"
                        element={
                            <InstructionListPage
                                simpleGraph={simpleGraph}
                                onLoadGroup={setGroupId}
                            />
                        }
                    />
                </Routes>
            </PageLayout>
        )
    } else {
        return <ErrorComponent />
    }
}

export const GET_METHOD_GRAPH_QUERY = gql`
    query GetMethodGraph($id: String!) {
        method(id: $id) {
            name
            descriptor
            modifiers
            owner {
                id
                name
                packageName
            }
            instructions {
                edges {
                    node {
                        id
                        opCode
                        lineNumber
                        next
                        previous
                        stack
                        reference {
                            __typename
                            ... on FieldModel {
                                id
                                name
                                descriptor
                                owner {
                                    id
                                    name
                                }
                            }
                            ... on MethodModel {
                                id
                                name
                                descriptor
                                owner {
                                    id
                                    name
                                }
                            }
                        }
                        enteringVariables {
                            edges {
                                node {
                                    name
                                    descriptor
                                    signature
                                }
                            }
                        }
                        exitingVariables {
                            edges {
                                node {
                                    name
                                    descriptor
                                    signature
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`
