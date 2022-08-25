import { apiCall, Edge, Response } from "./common"

const CLASS_TYPE = "classes"
const RELATIONSHIP_TYPE = "relationship"
const PACKAGE_TYPE = "package"

export interface GetClassData {
    methods: string[]
}

export type GetClassResponse = Response<GetClassData>

export async function getClass(className: string): Promise<GetClassResponse> {
    return await apiCall(CLASS_TYPE, className)
}

export interface GetClassRelationshipsMetadata {
    relationship: string
}

export type GetClassRelationshipsData = Edge<GetClassRelationshipsMetadata>
export type GetClassRelationshipsResponse = Response<GetClassRelationshipsData[]>

export async function getClassRelationships(
    className: string,
): Promise<GetClassRelationshipsResponse> {
    return await apiCall(CLASS_TYPE, className, RELATIONSHIP_TYPE)
}

export interface GetClassPackageData {
    package: string
}

export type GetClassPackageResource = Response<GetClassPackageData>

export async function getClassPackage(className: string): Promise<GetClassPackageResource> {
    return await apiCall(CLASS_TYPE, className, PACKAGE_TYPE)
}
