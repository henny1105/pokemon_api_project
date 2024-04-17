import { useQuery } from '@tanstack/react-query'
import api from './api'

const fetchPokemonInfo=()=>{
    return api.get(`/`)
}

export const usePokemonInfoQuery=()=>{
    return useQuery({
        queryKey:["pokemon-info",1],
        queryFn:fetchPokemonInfo,
        select:(data)=>data.data,
    })
}