import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { TOKEN } from './lib/auth'
import { itemObj } from '../types'
import { RootState } from '../store'
import { setItems } from '../store/data/items'

const BASE_URL = 'http://api.valantis.store:40000/'

interface IResponseId {
    result: string[]
}

type field = 'price' | 'id' | 'brand' | 'product'

type actions = 'get_ids' | 'get_items' | 'get_fields' | 'filter'

type paramsFilter = {
    [Key in field]: number | string
}

interface IParamsField {
    field?: field, 
    offset: number, 
    limit: number
}

interface IParamsIds extends Omit<IParamsField, field> {}

interface IParamsItems extends Partial<IParamsIds> {
    ids: string[]
}

interface IParamsFilter extends paramsFilter {
    offset?: never;
    limit?: never;
}

type ParamsByAction<T extends actions> = T extends 'filter' ? IParamsFilter : T extends 'get_fields' ? IParamsField : T extends 'get_ids' ? IParamsIds : IParamsItems

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

function deleteDouble(items:itemObj[]) {
    const map = new Map()
    for (const item of items) {
        map.set(item.id, item)
    }
    // const uniqueItems = {
    //     result: Array.from(map.values())
    // }
    return Array.from(map.values())
}

export const apiSlice = createApi({ 
    reducerPath: 'dataApi',
    baseQuery: baseQuery,
    endpoints: builder => ({
        getDataItemsIds: builder.mutation<IResponseId | IResponseItems, Credentials<actions>>({
            query: (credentials) => ({
                url: '',
                method: 'POST',
                body: credentials,
            })
        }),
        getAllData: builder.mutation<IResponseId | IResponseItems, Credentials<actions>>({
            async queryFn(arg, queryApi, _extraOptions, fetchWithBQ){
                const state = queryApi.getState() as RootState
                const dispatch = queryApi.dispatch
                
                const offset = arg.params.offset ? arg.params.offset : 0
                const limit = arg.params.limit ? arg.params.limit : 50
                const fullData = []
                const result = await fetchWithBQ({
                    url: '',
                    method: 'POST',
                    body: {...arg, params: {
                        offset: offset,
                        limit: limit
                    }},
                })
                const data = result.data as {result: string[]}
                for (let loopOffset = 0; loopOffset < data.result.length; loopOffset += 100) {
                        const itemResult = await fetchWithBQ({
                            url: '',
                            method: 'POST',
                            body: 
                                {
                                    "action": "get_items",
                                    "params": {"ids": data.result.slice(loopOffset, loopOffset + 100)}
                                }
                        })
                        if (itemResult.data instanceof Object && 'result' in itemResult.data) {
                            const data = itemResult.data as { result: itemObj[] };
                            const filteredResult = deleteDouble(data.result)
                            dispatch(setItems({result: [...state.items.result, ...fullData]}))
                            fullData.push(...filteredResult)
                        }
                    
                }
                dispatch(setItems({result: fullData}))
                return { data: { result: fullData } }
            }
        }

        ) 
    }),
})
