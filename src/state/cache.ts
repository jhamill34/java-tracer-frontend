import { InMemoryCache, makeVar } from "@apollo/client"

export const selectedVar = makeVar("")

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                selected: {
                    read() {
                        return selectedVar()
                    },
                },
            },
        },
    },
})
