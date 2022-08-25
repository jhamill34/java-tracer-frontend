import CryptoJS from "crypto-js"

export const ENDPOINT = "http://localhost:3000"

export interface Response<T> {
    resourceId: string
    data: T | null
}

export interface Edge<T> {
    id: string
    metadata: T
}

export function encodeResource(name: string): string {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(name))
}

export async function apiCall<T>(
    resourceType: string,
    resourceId: string,
    subResourceType?: string,
    options?: { [key: string]: string },
): Promise<Response<T>> {
    const encodedResourceId = encodeResource(resourceId)

    let endpoint = `${ENDPOINT}/${resourceType}/${encodedResourceId}`

    if (subResourceType != null) {
        endpoint += "/" + subResourceType
    }

    if (options != null && Object.keys(options).length > 0) {
        endpoint +=
            "?" +
            Object.keys(options)
                .map((key) => `${key}=${options[key]}`)
                .join("&")
    }

    const response = await fetch(endpoint)

    if (response.status === 404) {
        return {
            resourceId,
            data: null,
        }
    } else if (response.status !== 200) {
        const text = await response.text()
        throw new Error(text)
    }

    const data = await response.json()
    return {
        resourceId,
        data,
    }
}
