import { InMemoryCache, makeVar } from "@apollo/client"
import { relayStylePagination } from "@apollo/client/utilities"

export const selectedClassIdVar = makeVar("")

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                selectedClassId: {
                    read() {
                        return selectedClassIdVar()
                    },
                },
                classes: relayStylePagination(),
            },
        },
    },
})
