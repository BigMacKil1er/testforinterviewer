import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { TOKEN } from './lib/auth'

const BASE_URL = 'http://api.valantis.store:40000/'

interface IResponseId {
    result: string[]
}

type field = 'price' | 'id' | 'brand' | 'product'

type actions = 'get_ids' | 'get_items' | 'get_fields' | 'filter'

interface IParamsField {
    field: field, 
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


export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: builder => ({
        respondent: builder.mutation<IResponseId | IResponseItems, Credentials<actions>>({
            query: (credentials) => ({
                url: '',
                method: 'POST',
                body: credentials,
            }),
        })
    }),
})