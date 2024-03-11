import { createSlice } from "@reduxjs/toolkit"

type idsState = {
    result: string[] | null;
  };

const initialState: idsState = {
    result: null,
}

const dataSlice = createSlice({
    name: 'ids',
    initialState,
    reducers: {
        setIds: (state, action)=>{
            const {result} = action.payload
            state.result = result
        }
    },
})

export const { setIds} = dataSlice.actions

export default dataSlice.reducer

export const selectDataToken = (state: {rootReducer: { someData: { data: string; }; }}) => state.rootReducer.someData.data