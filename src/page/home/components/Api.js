import React, { useEffect, useState } from 'react'

const Api = () => {
    const [pokeList,setPokeList] = useState([])
    const getApi = async()=>{
        let url = `https://pokeapi.co/api/v2/pokemon/`
        let response = await fetch(url)
        let data = await response.json()
        setPokeList(data)
    }

    useEffect(()=>{
        getApi()
    },[])
  return (
    <div>{Api()}</div>
  )
}

export default Api