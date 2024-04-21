import { createSlice } from '@reduxjs/toolkit';

let initialState = {
	MyPokeMons: [
		{
			data: {
				name: 'bulbasaur',
				url: 'https://pokeapi.co/api/v2/pokemon/1/',
			},
			Lv: 1,
			Exp: 0,
		},
		{
			data: {
				name: 'charmander',
				url: 'https://pokeapi.co/api/v2/pokemon/4/',
			},
			Lv: 1,
			Exp: 0,
		},
		{
			data: {
				name: 'squirtle',
				url: 'https://pokeapi.co/api/v2/pokemon/7/',
			},
			Lv: 1,
			Exp: 0,
		},
	],
	Ticket: 1,
	RareCandy: 10,
	CatchPokemon: [
		{
			data: {
				id: 1,
				name: 'bulbasaur',
				url: 'https://pokeapi.co/api/v2/pokemon/1/',
				imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
				catching: true,
			},
		},
		{
			data: {
				id: 4,
				name: 'charmander',
				url: 'https://pokeapi.co/api/v2/pokemon/4/',
				imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
				catching: true,
			},
		},
		{
			data: {
				id: 7,
				name: 'squirtle',
				url: 'https://pokeapi.co/api/v2/pokemon/7/',
				imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
				catching: true,
			},
		},
	],
};

const putCatchPokemonFn = (state, action) => {
	const newItem = action.payload;
	// state.CatchPokemon = state.CatchPokemon.filter((item) => item.id !== newItem.id);
	// state.CatchPokemon.push({
	// id: newItem.id,
	// name: newItem.name,
	// imgUrl: newItem.imgUrl,
	// catching: newItem.catching
	// });
	state.CatchPokemon = state.CatchPokemon.filter((item) => item.data.id !== newItem.id);
	state.CatchPokemon.push({
		data: {
			id: newItem.id,
			name: newItem.name,
			url: `https://pokeapi.co/api/v2/pokemon/${newItem.id}/`,
			imgUrl: newItem.imgUrl,
			catching: newItem.catching,
		},
		Lv: 1,
		Exp: 0,
	});
};
const deleteCatchPookemonFn = (state, action) => {
    const newItem = action.payload;
    // state.CatchPokemon = state.CatchPokemon.filter((item) => item.id !== newItem.id);
    state.CatchPokemon = state.CatchPokemon.filter((item) => Number(item?.data?.id) !== Number(newItem.id));
}

const myInfoSlice = createSlice({
	name: 'myInfo',
	initialState,
	reducers: {
		playPoke(state, action) {
			const { name, evolveName } = action.payload;
			const pokemonIndex = state.MyPokeMons.findIndex((pokemon) => pokemon.data.name === name || pokemon.data.name === evolveName);
			if (pokemonIndex !== -1) {
				state.MyPokeMons[pokemonIndex].Exp += 1;
			}
		},
		levelUpCandy(state, action) {
			const { name, evolveName } = action.payload;
			const pokemonIndex = state.MyPokeMons.findIndex((pokemon) => pokemon.data.name === name || pokemon.data.name === evolveName);
			if (pokemonIndex !== -1) {
				state.MyPokeMons[pokemonIndex].Lv += 1;
				state.RareCandy -= 1;
			}
		},
		cheats(state, action) {
			state.RareCandy += 10;
		},
		levelUp(state, action) {
			const { name, evolveName } = action.payload;
			const pokemonIndex = state.MyPokeMons.findIndex((pokemon) => pokemon.data.name === name || pokemon.data.name === evolveName);
			if (pokemonIndex !== -1) {
				state.MyPokeMons[pokemonIndex].Lv += 1;
				state.MyPokeMons[pokemonIndex].Exp = 0;
			}
		},
		eat(state, action) {
			const { name, evolveName } = action.payload;
			const pokemonIndex = state.MyPokeMons.findIndex((pokemon) => pokemon.data.name === name || pokemon.data.name === evolveName);
			if (pokemonIndex !== -1) {
				state.MyPokeMons[pokemonIndex].Exp += 5;
			}
		},
		addTicket: (state, action) => {
			state.Ticket = state.Ticket + 1;
			console.log('now ticket : ', state.Ticket);
		},
		removeTicket: (state) => {
			if (state.Ticket > 1) {
				state.Ticket -= 1;
			}
		},
        addRareCandy: (state, action) => {
            state.RareCandy = state.RareCandy + 1;
            console.log('now RareCandy : ', state.RareCandy);
        },
		evolve(state, action) {
			const { name, evolveName, evolveUrl } = action.payload;
			const pokemonIndex = state.MyPokeMons.findIndex((pokemon) => pokemon.data.name === name || pokemon.data.name === evolveName);
			if (pokemonIndex !== -1) {
				state.MyPokeMons[pokemonIndex].data.name = evolveName;
				state.MyPokeMons[pokemonIndex].data.url = evolveUrl;
			}
		},
		addPokemon: (state, action) => {
			state.MyPokeMons.push({
				data: {
					name: action.payload.name,
					url: `https://pokeapi.co/api/v2/pokemon/${action.payload.id}/`,
				},
				Lv: 1,
				Exp: 0,
			});
		},
		putCatchPokemon: putCatchPokemonFn,
		deleteCatchPokemon: deleteCatchPookemonFn,
	},
});

export const myInfoActions = myInfoSlice.actions;
export default myInfoSlice.reducer;
