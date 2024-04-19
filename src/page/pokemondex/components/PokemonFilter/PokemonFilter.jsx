import React from 'react';
import './PokemonFilter.style.css';
import { usePokemonTypeQuery } from '../../../../hook/usePokemonInfoQuery';

const PokemonFilter = ({ getTypeValue, setClicked }) => {
  const { data:types } = usePokemonTypeQuery();

  const translateType = (englishType) => {
    switch (englishType) {
      case "normal":
        return "노멀";
      case "fire":
        return "불";
      case "water":
        return "물";
      case "electric":
        return "전기";
      case "grass":
        return "풀";
      case "ice":
        return "얼음";
      case "fighting":
        return "격투";
      case "poison":
        return "독";
      case "ground":
        return "땅";
      case "flying":
        return "비행";
      case "psychic":
        return "에스퍼";
      case "bug":
        return "벌레";
      case "rock":
        return "바위";
      case "ghost":
        return "고스트";
      case "dragon":
        return "드래곤";
      case "dark":
        return "악";
      case "steel":
        return "강철";
      case "fairy":
        return "페어리";
      default:
        return "알 수 없음";
    }
  };

  return (
    <ul className="type_list">
    <span onClick={ () => setClicked("") }>초기화</span>
    {
      types?.results.map((type, index) => (
        <li className="type_item" key={index}>
        {
          type.name.includes('unknown') !== true && type.name.includes('shadow') !== true
          ?
          <span className={`${type.name}`} onClick={ (e) => getTypeValue(e) }>
            { translateType(type.name ) }
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
