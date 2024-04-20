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
    CatchPokemon: [
      // {
        // id: "",
        // name: "",
        // imgUrl: "",
        // catching: false,
      // },
    ],
}

const putCatchPokemonFn = (state, action) => { 
  const newItem = action.payload;
  state.CatchPokemon = state.CatchPokemon.filter((item) => item.id !== newItem.id);
  state.CatchPokemon.push({
    id: newItem.id,
    name: newItem.name,
    imgUrl: newItem.imgUrl,
    catching: newItem.catching
  });
}

const deleteCatchPookemonFn = (state, action) => {
  const newItem = action.payload;
  state.CatchPokemon = state.CatchPokemon.filter((item) => item.id !== newItem.id);
  // const todo = state.CatchPokemon.find(todo => todo.id === action.payload)
  // todo.catching = !todo.catching
}

const myInfoSlice = createSlice({
  name: "myInfo",
  initialState,
  reducers: {
    putCatchPokemon: putCatchPokemonFn,
    deleteCatchPokemon: deleteCatchPookemonFn,
  }
})

export const myInfoActions = myInfoSlice.actions
export default myInfoSlice.reducer