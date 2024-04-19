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
            hp: 70,
            attack: 100,
        },
        {
            data: {
                name: "charmander",
                url: "https://pokeapi.co/api/v2/pokemon/4/"
            },
            Lv: 1,
            Exp: 0,
            hp: 20,
            attack: 60,
        },
        {
            data: {
                name: "squirtle",
                url: "https://pokeapi.co/api/v2/pokemon/7/"
            },
            Lv: 1,
            Exp: 0,
            hp: 20,
            attack: 10,
        },

    ],
    Ticket: 1,
    RareCandy: 10,
}

const myInfoSlice = createSlice({
    name: "myInfo",
    initialState,
    reducers: {
        playPoke(state, action) {
            const { name,evolveName } = action.payload;
            const pokemonIndex = state.MyPokeMons.findIndex(pokemon => pokemon.data.name === name|| pokemon.data.name === evolveName);
            if (pokemonIndex !== -1) {
                state.MyPokeMons[pokemonIndex].Exp += 1;
            }
        },
        levelUpCandy(state, action) {
            const { name,evolveName } = action.payload;
            const pokemonIndex = state.MyPokeMons.findIndex(pokemon => pokemon.data.name === name|| pokemon.data.name === evolveName);
            if (pokemonIndex !== -1) {
                state.MyPokeMons[pokemonIndex].Lv += 1;
                state.RareCandy -=1;
            }
        },
        cheats(state, action) {
            state.RareCandy +=10;
        },
        levelUp(state, action) {
            const { name,evolveName } = action.payload;
            const pokemonIndex = state.MyPokeMons.findIndex(pokemon => pokemon.data.name === name|| pokemon.data.name === evolveName);
            if (pokemonIndex !== -1) {
                state.MyPokeMons[pokemonIndex].Lv += 1;
            }
        },
        eat(state, action) {
            const { name,evolveName } = action.payload;
            const pokemonIndex = state.MyPokeMons.findIndex(pokemon => pokemon.data.name === name|| pokemon.data.name === evolveName);
            if (pokemonIndex !== -1) {
                state.MyPokeMons[pokemonIndex].Exp += 5;
            }
        },
        addTicket: (state, action) => {
            state.Ticket = state.Ticket + 1;
            console.log("now ticket : ", state.Ticket);
        },
        evolve(state, action) {
            const { name,evolveName,evolveUrl } = action.payload;
            const pokemonIndex = state.MyPokeMons.findIndex(pokemon => pokemon.data.name === name|| pokemon.data.name === evolveName);
            if (pokemonIndex !== -1) {
                state.MyPokeMons[pokemonIndex].data.name = evolveName;
                state.MyPokeMons[pokemonIndex].data.url = evolveUrl;
            }
        }
    }
})

export const myInfoActions = myInfoSlice.actions
export default myInfoSlice.reducer