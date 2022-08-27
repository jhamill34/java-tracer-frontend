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
