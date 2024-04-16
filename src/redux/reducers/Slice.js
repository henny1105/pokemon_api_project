import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    MyPokeMons:{},
    Ticket:1,
    RareCandy:0,
}

const myInfoSlice = createSlice({
    name:"myInfo",
    initialState,
    reducers:{

    }
})

export const myInfoActions = myInfoSlice.actions
export default myInfoSlice.reducer