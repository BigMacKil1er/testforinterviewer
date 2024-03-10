import { apiSlice } from "../../app/api/apiSlice"

export const getApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getData: builder.mutation({
            query: (credentials) => {
                return {
                url: '',
                method: 'POST',
                body: credentials
            }}
        }),
        
    })
})

export const getApiAllDataSlice = apiSlice.useGetAllDataQuery

export const {useGetDataMutation} = getApiSlice