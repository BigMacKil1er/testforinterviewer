import { apiSlice } from "../../app/api/apiSlice"

export const getApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getData: builder.mutation({
            query: (credentials) => ({
                url: '',
                method: 'POST',
                body: credentials
            })
        }),
        
    })
})

export const {useGetDataMutation} = getApiSlice