import React from "react"
import { Route, Routes, useNavigate, useParams } from "react-router-dom"
import { EdgeData, NodeData } from "reaflow"
import { Flow } from "../components/flow/Flow"
import { RelationsListPage } from "./RelationsListPage"

interface ClassRelationsPageProps {
    classModel: ClassModel
}

function populateGraph(
    connection: Connector<ClassModel>,
    nodes: NodeData[],
    edges: EdgeData[],
    type: string,
    source?: string,
    sink?: string,
): void {
    if (connection.edges.length > 5) {
        nodes.push({
            id: type,
            text: `${connection.edges.length} ${type}`,
        })
        if (source != null) {
            edges.push({
                from: source,
                to: type,
                id: `${source}-${type}`,
            })
        } else if (sink != null) {
            edges.push({
                from: type,
                to: sink,
                id: `${type}-${sink}`,
            })
        }
    } else {
        connection.edges.forEach((e) => {
            nodes.push({
                id: e.node.id,
                text: e.node.name,
            })
            if (source != null) {
                edges.push({
                    from: source,
                    to: e.node.id,
                    id: `${source}-${e.node.id}`,
                })
            } else if (sink != null) {
                edges.push({
                    from: e.node.id,
                    to: sink,
                    id: `${e.node.id}-${sink}`,
                })
            }
        })
    }
}

export function ClassRelationsPage(props: ClassRelationsPageProps): React.ReactElement {
    const { classModel } = props
    const { classId } = useParams<"classId">()
    const navigate = useNavigate()

    const nodes: NodeData[] = [
        {
            id: classModel.id,
            text: classModel.name,
        },
    ]
    const edges: EdgeData[] = []
    const lookup: Map<string, ClassModel> = new Map()
    lookup.set(classModel.id, classModel)

    if (classModel.superClass != null) {
        lookup.set(classModel.superClass.id, classModel.superClass)
        nodes.push({
            id: classModel.superClass.id,
            text: classModel.superClass.name,
        })
        edges.push({
            from: classModel.id,
            to: classModel.superClass.id,
            id: `${classModel.id}-${classModel.superClass.id}`,
        })
    }

    populateGraph(classModel.implements, nodes, edges, "Implements", classModel.id, undefined)
    populateGraph(classModel.implementedBy, nodes, edges, "Implementors", undefined, classModel.id)
    populateGraph(classModel.subClasses, nodes, edges, "Sub Classes", undefined, classModel.id)

    return (
        <div className="w-full h-full flex flex-row">
            <Flow
                nodes={nodes}
                edges={edges}
                onNodeSelect={(id) => {
                    switch (id) {
                        case "Implements":
                            navigate(`/class/${classId ?? ""}/relations/implements`)
                            break
                        case "Implementors":
                            navigate(`/class/${classId ?? ""}/relations/implementedBy`)
                            break
                        case "Sub Classes":
                            navigate(`/class/${classId ?? ""}/relations/subClasses`)
                            break
                        default:
                            navigate(`/class/${id}`)
                    }
                }}
            />

            <Routes>
                <Route
                    path="implements"
                    element={
                        <RelationsListPage
                            relations={classModel.implements.edges.map((e) => e.node)}
                        />
                    }
                />
                <Route
                    path="implementedBy"
                    element={
                        <RelationsListPage
                            relations={classModel.implementedBy.edges.map((e) => e.node)}
                        />
                    }
                />
                <Route
                    path="subClasses"
                    element={
                        <RelationsListPage
                            relations={classModel.subClasses.edges.map((e) => e.node)}
                        />
                    }
                />
            </Routes>
        </div>
    )
}
