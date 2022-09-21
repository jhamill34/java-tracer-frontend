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

interface ClassModel {
    id: string
    name: string
    packageName: string
    modifiers: string[]
    methods: Connector<MethodModel>
}

interface MethodModel {
    name: string
    owner: ClassModel
    descriptor: string
    modifiers: string[]
    instructions: Connector<InstructionModel>
}

interface InstructionModel {
    id: string
    opCode: string
    lineNumber: number
    next: string[]
    previous: string[]
    stack: string[]
    enteringVariables: Connector<VariableModel>
    exitingVariables: Connector<VariableModel>
}

interface VariableModel {
    name: string
    descriptor: string
    signature: string
}
