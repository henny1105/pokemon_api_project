import React, { useState } from 'react';
import './PokemonCard.style.css';
const PokemonCard = ({ pokemonData, movePokemonInfo, filtered, search }) => {
  const [catchPokemon] = useState(false); 
  return (
    <>
    {
      search === ""
      ?
      pokemonData?.map((item, index) => (
        <div className="card drop_shadow_2" key={index} onClick={ () => movePokemonInfo(index+1) }>
          <div className="card_number">
            <span>#{ item.id }</span>
          </div>
          <div className="card_img is_exist">
            {
              catchPokemon === true
              ?
              <img src={ item.image } alt="" className="catch" />
              :
              <img src={ item.image } alt="" className="non_catch" />
            }
          </div>
          <div className="card_name">{ item.korean_name }</div>
        </div>
      ))
      :
      filtered?.map((item, index) => (
        <div className="card drop_shadow_2" key={index} onClick={ () => movePokemonInfo(index+1) }>
          <div className="card_number">
            <span>#{ item.id }</span>
          </div>
          <div className="card_img is_exist">
            {
              catchPokemon === true
              ?
              <img src={ item.image } alt="" className="catch" />
              :
              <img src={ item.image } alt="" className="non_catch" />
            }
          </div>
          <div className="card_name">{ item.korean_name }</div>
        </div>
      ))
    }
    </>
  )
}

export default PokemonCard;
