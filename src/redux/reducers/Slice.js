import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    MyPokeMons: [
        {
            data: {
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/"
            },
            Lv: 1,
            Exp: 1,
        },
        {
            data: {
                name: "ivysaur",
                url: "https://pokeapi.co/api/v2/pokemon/2/"
            },
            Lv: 1,
            Exp: 1,
        }
    ],
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