import React, { useState, useEffect } from 'react';
// > style
import './PokemonCard.style.css';

const PokemonCard = ({ pokemon }) => {
  const [catchPokemon] = useState(false); // redux 처리
  const [speciesData, setSpeciesData] = useState({});
  useEffect(() => {
    fetch(`${pokemon.url}`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        setSpeciesData(data);
      });
      
      // eslint-disable-next-line
  }, []);

  console.log(speciesData);

  return (
    <div className="card drop_shadow_2">
      <div className="card_number">
        <span>#{ speciesData?.id }</span>
      </div>
      <div className="card_img is_exist">
        {
          catchPokemon === true
          ?
          <img src={ speciesData?.sprites?.other["official-artwork"].front_default } alt="" className="catch" />
          :
          <img src={ speciesData?.sprites?.other["official-artwork"].front_default } alt="" className="non_catch" />
        }
      </div>
      <div className="card_name">
          {
            pokemon?.name === speciesData?.name
            ?
            <span>{ speciesData?.name }</span>
            :
            null
          }
      </div>
    </div>
  )
}

export default PokemonCard;
