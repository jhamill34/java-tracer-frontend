import { createInterface } from "readline"
import { createReadStream } from "fs"

const CALL_KEY = "<CALL>"
const METHOD_KEY = "<METHOD>"
const INHERIT_KEY = "<INHERIT>"

interface CallEntry {
    caller: MethodEntry
    called: MethodEntry
}

interface MethodEntry {
    name: string
    descriptor: string
    className: string
    modifiers: string[]
    lineNumber: number
}

interface InheritEntry {
    className: string
    superClass: string
    interfaces: string[]
}

interface CompileLog {
    calls: CallEntry[]
    methods: MethodEntry[]
    inheritance: InheritEntry[]
}

async function load(filename: string, handler: (line: string) => void): Promise<CompileLog> {
    return await new Promise((resolve, reject) => {
        createInterface({
            input: createReadStream(filename),
        })
            .on("line", (line) => {})
            .on("close", resolve)
    })
}
