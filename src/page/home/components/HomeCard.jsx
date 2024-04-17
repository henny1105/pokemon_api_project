import React from "react";
import "./HomeCard.style.css";
import { usePokemonInfoQuery } from "./hooks/usePokemonInfo";


const HomeCard = () => {

    const {data, isLoading, isError, error } = usePokemonInfoQuery()
    console.log("data",data)
    if(isLoading){
       return <h1>Loading...</h1>
    }
    if(isError){
       return <h1>{error.message}</h1>
    }
  return (
    <div className="pokemon gmd-1">
      <div className="pokomon-info">
        <div># 1</div>
        <div>이상해씨</div>
        <div>풀</div>
      </div>
      
      <img className="pokemon-img"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/1.gif"
        width={80}
      />
    </div>
  );
};

export default HomeCard;
