import { gql, useQuery } from "@apollo/client"
import React, { useState } from "react"
import { Item, Search } from "../../components/search/Search"
import { selectedClassIdVar } from "../../state/cache"

interface ListClassesResult {
    classes: Connector<MinimalClassInfo>
}

interface ListClassesArgs {
    first: number
    after: string
    nameFilter: string
}

interface ClassSearchProps {
    onSelect: (id: string) => void
}

export function ClassSearch(props: ClassSearchProps): React.ReactElement {
    const [input, setInput] = useState<string>("")
    const { data, fetchMore, refetch } = useQuery<ListClassesResult, ListClassesArgs>(
        LIST_CLASSES_QUERY,
        { variables: { first: 100, after: "", nameFilter: input } },
    )

    const items: Item[] =
        data?.classes?.edges?.map((e) => ({
            id: e.node.id,
            title: e.node.name,
            subtitle: e.node?.packageName ?? "<Unknown>",
        })) ?? []

    const pageInfo = data?.classes?.pageInfo

    const changeHandler = async (inputValue: string): Promise<void> => {
        setInput(inputValue)
        await refetch({
            first: 100,
            after: "",
            nameFilter: inputValue,
        })
    }

    const fetchMoreHandler = async (): Promise<void> => {
        await fetchMore({
            variables: {
                first: 100,
                after: pageInfo?.endCursor ?? "",
                nameFilter: input,
            },
        })
    }

    return (
        <Search
            items={items}
            placeholder="e.g. tech/jhamill34/Application"
            hasMore={pageInfo?.hasNextPage ?? false}
            onFetchMore={fetchMoreHandler}
            onInputChange={changeHandler}
            onSelect={(id: string) => {
                selectedClassIdVar(id)
                props.onSelect(id)
            }}
        />
    )
}

const LIST_CLASSES_QUERY = gql`
    query ListClasses($first: Int!, $after: String!, $nameFilter: String!) {
        classes(first: $first, after: $after, filter: { name: $nameFilter }) {
            edges {
                node {
                    id
                    name
                    packageName
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`
