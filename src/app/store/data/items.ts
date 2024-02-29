import { createSlice } from "@reduxjs/toolkit"
import { itemObj } from "../../types";

type ItemsState = {
    result: itemObj[];
  };
  
const initialState: ItemsState = {
    result: [],
}

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setItems: (state, action)=>{
            const {result} = action.payload
            state.result = result
        }
    },
})

export const { setItems } = itemsSlice.actions

export default itemsSlice.reducer