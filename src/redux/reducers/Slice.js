import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    MyPokeMons: [
        {
            data: {
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/"
            },
            Lv: 1,
            Exp: 0,
        },
        {
            data: {
                name: "charmander",
                url: "https://pokeapi.co/api/v2/pokemon/4/"
            },
            Lv: 1,
            Exp: 0,
        },
        {
            data: {
                name: "squirtle",
                url: "https://pokeapi.co/api/v2/pokemon/7/"
            },
            Lv: 1,
            Exp: 0,
        },

    ],
    Ticket: 1,
    RareCandy: 0,
}

const myInfoSlice = createSlice({
    name: "myInfo",
    initialState,
    reducers: {
        playPoke(state, action) {
            const { name } = action.payload;
            const pokemonIndex = state.MyPokeMons.findIndex(pokemon => pokemon.data.name === name);
            if (pokemonIndex !== -1) {
                state.MyPokeMons[pokemonIndex].Exp += 1;
            }
        },
        levelUp(state, action) {
            const { name } = action.payload;
            const pokemonIndex = state.MyPokeMons.findIndex(pokemon => pokemon.data.name === name);
            if (pokemonIndex !== -1) {
                state.MyPokeMons[pokemonIndex].Lv += 1;
            }
        },
        eat(state, action) {
            const { name } = action.payload;
            const pokemonIndex = state.MyPokeMons.findIndex(pokemon => pokemon.data.name === name);
            if (pokemonIndex !== -1) {
                state.MyPokeMons[pokemonIndex].Exp += 5;
            }
        },
        addTicket: (state, action) => {
            state.Ticket = state.Ticket + 1;
            console.log("now ticket : ", state.Ticket);
        }
    }
})

export const myInfoActions = myInfoSlice.actions
export default myInfoSlice.reducer