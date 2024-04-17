import React from 'react';
import './PokemonFilter.style.css';
import { usePokemonTypeQuery } from '../../../../hook/usePokemonInfoQuery';

const PokemonFilter = () => {
  const { data:types } = usePokemonTypeQuery();

  return (
    <ul className="type_list">
    {
      types?.results.map((type, index) => (
        <li className="type_item" key={index}>
        {
          type.name.includes('unknown') !== true && type.name.includes('shadow') !== true
          ?
          <span className={`type ${type.name}`}>
            { type.name }
          </span>
          :
          <span>{null}</span>
        }
        </li>
      ))
    }
    </ul>
  )
}

export default PokemonFilter;
