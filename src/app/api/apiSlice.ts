import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { TOKEN } from './lib/auth'
const BASE_URL = 'http://api.valantis.store:40000/'

const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: (headers) => {
        headers.set("X-Auth", TOKEN)
        return headers
    }
})

export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: builder => ({
        respondent: builder.mutation({
            query: (credentials) => ({
                url: '',
                method: 'POST',
                body: credentials,
            })
        })
    })
})