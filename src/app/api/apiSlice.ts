import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { TOKEN } from './lib/auth'

const BASE_URL = 'http://api.valantis.store:40000/'

interface IResponseId {
    result: string[]
}

type field = 'price' | 'id' | 'brand' | 'product'

type actions = 'get_ids' | 'get_items' | 'get_fields' | 'filter'

interface IParamsField {
    field?: field, 
    offset: number, 
    limit: number
}
interface IParamsIds extends Omit<IParamsField, field> {}

type paramsItems = {
    ids: string[]
}

type paramsFilter = {
    [Key in field]: number | string
}

type ParamsByAction<T extends actions> = T extends 'filter' ? paramsFilter : T extends 'get_fields' ? IParamsField : T extends 'get_ids' ? IParamsIds : paramsItems

interface Credentials<T extends actions> {
    action: T,
    params: ParamsByAction<T>
}

type itemData = {
    brand: string | null,
    id: string,
    price: number,
    product: string
}

interface IResponseItems {
    result: itemData[]
}

const baseQuery = retry(fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: (headers) => {
        headers.set("X-Auth", TOKEN)
        return headers
    }
}), {maxRetries: 5})


// export const apiSlice = createApi({ 
//     reducerPath: 'dataApi',
//     baseQuery: baseQuery,
//     endpoints: builder => ({
//         getData: builder.mutation<IResponseId | IResponseItems, Credentials<actions>>({
//             query: (credentials) => ({
//                 url: '',
//                 method: 'POST',
//                 body: credentials,
//             }),
//         })
//     }),
// })

export const apiSlice = createApi({ 
    reducerPath: 'dataApi',
    baseQuery: baseQuery,
    endpoints: builder => ({
        getData: builder.mutation<IResponseId | IResponseItems, Credentials<actions>>({
            query: (credentials) => ({
                url: '',
                method: 'POST',
                body: credentials,
            })
        }),
        getAllData: builder.query<IResponseId | IResponseItems, Credentials<actions>>({
            async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ){
                const offset = arg.params.offset
                const limit = arg.params.limit
                const fullData = []
                for (let ofset = offset; ofset < 1000; ofset + limit) {
                    const data = fetchWithBQ({
                        url: '',
                        method: 'POST',
                        body: {...arg, params: {
                            offset: ofset,
                            limit: limit
                        }},
                    })
                    if (data) {
                        console.log(data);
                        fullData.push(...data.result)
                    }
                    return Promise.resolve({result: data.result})
                }
            }
        }

        ) 
    }),
})

// export const apiSlice = createApi({ 
//     reducerPath: 'dataApi',
//     baseQuery: baseQuery,
//     endpoints: builder => ({
//         getData: builder.mutation({
//                         query: (credentials) => ({
//                             url: '',
//                             method: 'POST',
//                             body: credentials,
//                         }),
//         getAllData: builder.query<IResponseId | IResponseItems, Credentials<actions>>(
//             {queryFn: (credentials) => {
//                 let list = []
//                 let offset = credentials.params.offset
//                 let limit = credentials.params.limit
//                 for (let ofset = 0; ofset < offset; ofset + limit) {
//                     const {data} = getData.select({
//                         ...credentials, params: {
//                             offset: ofset,
//                             limit: limit
//                         }
//                     })
//                     if (data) {
                        
//                     }
//                 }
//             }}
//         ) 
//     }),
// })