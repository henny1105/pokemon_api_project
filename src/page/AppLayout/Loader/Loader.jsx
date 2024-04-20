import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Loader = () => {
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const pokemonList = response.data.results;
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        const randomPokemonUrl = pokemonList[randomIndex].url;
        const pokemonResponse = await axios.get(randomPokemonUrl);
        setRandomPokemon(pokemonResponse.data);
      } catch (error) {
        console.error('Error fetching random pokemon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomPokemon();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!randomPokemon) {
    return <div>No random pokemon found</div>;
  }

  return (
    <div>
      <h2>Random Pokemon</h2>
      <img src={randomPokemon.sprites.front_default} alt={randomPokemon.name} />
      <h3>Name: {randomPokemon.name}</h3>
    </div>
  );
};

export default Loader;
