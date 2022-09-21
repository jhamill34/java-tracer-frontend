import { gql, useQuery } from "@apollo/client"
import React from "react"
import { ErrorComponent } from "../../components/errors/Error"
import { Loading } from "../../components/loading/Loading"
import { ClassInfoPanel, FullClassModel } from "../../components/side-panel/ClassInfoPanel"

interface ClassInfoArgs {
    id: string
}

interface MethodInfo {
    id: string
    name: string
    descriptor: string
    modifiers: string[]
}

export interface ClassInfoReponse {
    class: {
        name: string
        signature: string
        packageName: string
        modifiers: string[]
        subClasses: Connector<MinimalClassInfo>
        superClass: MinimalClassInfo
        implementedBy: Connector<MinimalClassInfo>
        implements: Connector<MinimalClassInfo>
        methods: Connector<MethodInfo>
    }
}

interface ClassInfoPanelContainerProps {
    id: string
    onSelectClass: (id: string) => void
    onSelectMethod: (id: string) => void
}

export function ClassInfoPanelContainer(props: ClassInfoPanelContainerProps): React.ReactElement {
    const { data, loading, error } = useQuery<ClassInfoReponse, ClassInfoArgs>(CLASS_INFO_QUERY, {
        variables: props,
    })

    if (loading) return <Loading />
    if (error != null) return <ErrorComponent />

    let result = <div>No data</div>

    if (data != null) {
        const {
            subClasses,
            superClass,
            implementedBy,
            implements: implementedInterfaces,
            methods,
            ...rest
        } = data.class

        const model: FullClassModel = {
            ...rest,
            subClasses: subClasses.edges.map((e) => e.node),
            superClasses: [superClass],
            implementors: implementedBy.edges.map((e) => e.node),
            implemented: implementedInterfaces.edges.map((e) => e.node),
            methods: methods.edges.map((e) => e.node),
        }

        result = (
            <ClassInfoPanel
                classModel={model}
                onSelectClass={(ref) => props.onSelectClass(ref.id)}
                onSelectMethod={(ref) => props.onSelectMethod(ref.id)}
            />
        )
    }

    return result
}

export const CLASS_INFO_QUERY = gql`
    query ClassInfoQuery($id: String!) {
        class(id: $id) {
            name
            packageName
            signature
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
            subClasses {
                edges {
                    node {
                        id
                        name
                        packageName
                    }
                }
            }
            superClass {
                id
                name
                packageName
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
            implements {
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
