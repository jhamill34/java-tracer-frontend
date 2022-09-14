interface Action<T> {
    type: string
    payload: T
}

interface Position {
    x: number
    y: number
}

interface Spacing {
    vertical: number
    horizontal: number
}

interface Dimension {
    width: number
    height: number
}

type ResourceId = string

interface PageInfo {
    hasNextPage: boolean
    endCursor: string
}

interface Connector<T> {
    edges: Array<Edge<T>>
    pageInfo: PageInfo
}

interface Edge<T> {
    node: T
    cursor?: string
}

interface MinimalClassInfo {
    id: string
    name: string
    packageName: string
}
