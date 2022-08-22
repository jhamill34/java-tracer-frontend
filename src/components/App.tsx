import JSZip from "jszip"
import React from "react"
import Dropzone, { IFileWithMeta } from "react-dropzone-uploader"

function handleSubmit(files: IFileWithMeta[], allFiles: IFileWithMeta[]): void {
    Promise.all(
        files.map(async (file) => {
            const text = await file.file.text()
            const data = await JSZip.loadAsync(text)
            console.log(data)
        }),
    ).catch((e) => console.error(e))
}

export function App(): React.ReactElement {
    return <Dropzone onSubmit={handleSubmit} />
}
