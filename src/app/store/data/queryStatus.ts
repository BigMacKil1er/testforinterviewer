import { createSlice } from "@reduxjs/toolkit"

type queryStatusState = {
    isGetItemsInProgress: boolean;
  };
  
const initialState: queryStatusState = {
    isGetItemsInProgress: false,
}

const queryStatusSlice = createSlice({
    name: 'queryStatus',
    initialState,
    reducers: {
        setQueryStatus: (state, action)=>{
            const result = action.payload
            console.log(result);
            
            state.isGetItemsInProgress = result
        }
    },
})

export const { setQueryStatus } = queryStatusSlice.actions

export default queryStatusSlice.reducer