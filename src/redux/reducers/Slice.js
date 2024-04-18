import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    MyPokeMons: [{
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/"
    },{
        name: "ivysaur",
        url: "https://pokeapi.co/api/v2/pokemon/2/"
      }],
    Ticket: 1,
    RareCandy: 0,
}

const myInfoSlice = createSlice({
    name: "myInfo",
    initialState,
    reducers: {

    }
})

export const myInfoActions = myInfoSlice.actions
export default myInfoSlice.reducer