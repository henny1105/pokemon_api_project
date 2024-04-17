import axios from "axios";

const api = axios.create({
    baseURL:"https://pokeapi.co/api/v2/pokemon",
    headers:{
        Accept:'application/json',
        Authorization:`Bearer `
    }
})

export default api