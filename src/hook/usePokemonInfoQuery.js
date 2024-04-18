import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  method: 'GET',
  baseURL: `https://pokeapi.co/api/v2`,
});

const fetchPokemonInfoAll = () => {
  return api.get(`/pokemon/?limit=251`);
}

const fetchPokemonInfo = ({ id }) => {
  return api.get(`/pokemon/${id}`) 
}

const fetchPokemonInfoSpecies = ({ id  }) => {
  return api.get(`/pokemon-species/${id}`);
}

const fetchPokemonEvolution = () => {
  return api.get(`/evolution-chain/1`);
}

const fetchPokemonType = () => {
  return api.get(`/type`)
}

const usePokemonInfoAllQuery = () => {
  return useQuery({
    queryKey: ['pokemon_all'],
    queryFn: fetchPokemonInfoAll,
    select: (result) => result.data,
  });
}

const usePokemonInfoQuery = ({ id }) => {
  return useQuery({
    queryKey: ['pokemon', { id }],
    queryFn: () => fetchPokemonInfo({ id }),
    // queryFn: fetchPokemonInfo,
    select: (result) => result.data,
  });
}

const usePokemonSpeciesQuery = ({ id, url }) => {
  return useQuery({
    queryKey: ['pokemon_species', { id, url }],
    queryFn: () => fetchPokemonInfoSpecies({ id, url }),
    select: (result) => result.data,
  });
}

const usePokemonEvolutionQuery = () => {
  return useQuery({
    queryKey: ['pokemon_evolution'],
    queryFn: fetchPokemonEvolution,
    select: (result) => result.data,
  });
}

const usePokemonTypeQuery = () => {
  return useQuery({
    queryKey: ['pokemon_type'],
    queryFn: fetchPokemonType,
    select: (result) => result.data,
  });
}

export { usePokemonInfoAllQuery, usePokemonInfoQuery, usePokemonSpeciesQuery, usePokemonEvolutionQuery, usePokemonTypeQuery };